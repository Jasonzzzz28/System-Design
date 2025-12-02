import { useState, useRef, useEffect } from 'react';
import './ImageViewer.css';

interface ImageViewerProps {
    src: string;
    alt: string;
}

const ImageViewer = ({ src, alt }: ImageViewerProps) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [panX, setPanX] = useState(0);
    const [panY, setPanY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const dragStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
    const panXRef = useRef(0);
    const panYRef = useRef(0);
    const zoomRef = useRef(1);

    const MIN_ZOOM = 1;
    const MAX_ZOOM = 5;
    const ZOOM_STEP = 0.25;

    useEffect(() => {
        panXRef.current = panX;
    }, [panX]);

    useEffect(() => {
        panYRef.current = panY;
    }, [panY]);

    useEffect(() => {
        zoomRef.current = zoom;
    }, [zoom]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            const isCurrentlyFullscreen = !!document.fullscreenElement;
            setIsFullscreen(isCurrentlyFullscreen);
            
            // Reset zoom and pan when exiting fullscreen
            if (!isCurrentlyFullscreen) {
                setZoom(1);
                setPanX(0);
                setPanY(0);
                zoomRef.current = 1;
                panXRef.current = 0;
                panYRef.current = 0;
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
            document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
        };
    }, []);

    // Mouse wheel zoom (only in fullscreen)
    useEffect(() => {
        if (!isFullscreen || !imageContainerRef.current || !imageRef.current) return;

        const handleWheel = (e: WheelEvent) => {
            if (!isFullscreen) return;
            
            e.preventDefault();
            const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
            const currentZoom = zoomRef.current;
            const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, currentZoom + delta));
            
            if (imageContainerRef.current && imageRef.current) {
                const containerRect = imageContainerRef.current.getBoundingClientRect();
                
                // Mouse position relative to the container
                const mouseX = e.clientX - containerRect.left;
                const mouseY = e.clientY - containerRect.top;
                
                // Mouse position relative to the image (accounting for current pan and zoom)
                const imageX = (mouseX - containerRect.width / 2 - panXRef.current) / currentZoom;
                const imageY = (mouseY - containerRect.height / 2 - panYRef.current) / currentZoom;
                
                // Calculate new pan to keep the same point under the mouse
                const newPanX = mouseX - containerRect.width / 2 - imageX * newZoom;
                const newPanY = mouseY - containerRect.height / 2 - imageY * newZoom;
                
                setPanX(newPanX);
                setPanY(newPanY);
                panXRef.current = newPanX;
                panYRef.current = newPanY;
            }
            
            setZoom(newZoom);
        };

        const container = imageContainerRef.current;
        container.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            container.removeEventListener('wheel', handleWheel);
        };
    }, [isFullscreen]);

    // Drag to pan (only in fullscreen)
    useEffect(() => {
        if (!isFullscreen || !imageContainerRef.current) return;

        const handleMouseDown = (e: MouseEvent) => {
            // Only allow dragging if zoomed in and not clicking on buttons
            const target = e.target as HTMLElement;
            if (target.closest('button') || target.closest('.image-controls')) {
                return;
            }
            
            if (zoomRef.current > MIN_ZOOM) {
                setIsDragging(true);
                dragStartRef.current = {
                    x: e.clientX,
                    y: e.clientY,
                    panX: panXRef.current,
                    panY: panYRef.current,
                };
                e.preventDefault();
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging || zoomRef.current <= MIN_ZOOM) return;
            
            const deltaX = e.clientX - dragStartRef.current.x;
            const deltaY = e.clientY - dragStartRef.current.y;
            
            setPanX(dragStartRef.current.panX + deltaX);
            setPanY(dragStartRef.current.panY + deltaY);
            e.preventDefault();
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        const container = imageContainerRef.current;
        container.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            container.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isFullscreen, isDragging]);

    const toggleFullscreen = async () => {
        if (!containerRef.current) return;

        try {
            if (!isFullscreen) {
                if (containerRef.current.requestFullscreen) {
                    await containerRef.current.requestFullscreen();
                } else if ((containerRef.current as any).webkitRequestFullscreen) {
                    await (containerRef.current as any).webkitRequestFullscreen();
                } else if ((containerRef.current as any).mozRequestFullScreen) {
                    await (containerRef.current as any).mozRequestFullScreen();
                } else if ((containerRef.current as any).msRequestFullscreen) {
                    await (containerRef.current as any).msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                } else if ((document as any).webkitExitFullscreen) {
                    await (document as any).webkitExitFullscreen();
                } else if ((document as any).mozCancelFullScreen) {
                    await (document as any).mozCancelFullScreen();
                } else if ((document as any).msExitFullscreen) {
                    await (document as any).msExitFullscreen();
                }
            }
        } catch (error) {
            console.error('Error toggling fullscreen:', error);
        }
    };

    const handleZoomIn = () => {
        if (!isFullscreen || !imageContainerRef.current) return;
        
        const currentZoom = zoomRef.current;
        const newZoom = Math.min(MAX_ZOOM, currentZoom + ZOOM_STEP);
        
        // Zoom toward the center of the visible viewport
        const zoomFactor = newZoom / currentZoom;
        
        // Adjust pan to keep the center point fixed
        setPanX(prevPanX => prevPanX * zoomFactor);
        setPanY(prevPanY => prevPanY * zoomFactor);
        
        setZoom(newZoom);
    };

    const handleZoomOut = () => {
        if (!isFullscreen || !imageContainerRef.current) return;
        
        const currentZoom = zoomRef.current;
        const newZoom = Math.max(MIN_ZOOM, currentZoom - ZOOM_STEP);
        
        if (newZoom === MIN_ZOOM) {
            setPanX(0);
            setPanY(0);
            panXRef.current = 0;
            panYRef.current = 0;
        } else {
            // Zoom toward the center of the visible viewport
            const zoomFactor = newZoom / currentZoom;
            
            // Adjust pan to keep the center point fixed
            setPanX(prevPanX => prevPanX * zoomFactor);
            setPanY(prevPanY => prevPanY * zoomFactor);
        }
        
        setZoom(newZoom);
    };

    const handleResetZoom = () => {
        if (!isFullscreen) return;
        setZoom(1);
        setPanX(0);
        setPanY(0);
        zoomRef.current = 1;
        panXRef.current = 0;
        panYRef.current = 0;
    };

    const imageStyle = isFullscreen && zoom > MIN_ZOOM
        ? {
            transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
            cursor: isDragging ? 'grabbing' : 'grab',
            transition: isDragging ? 'none' : 'transform var(--transition-base)',
        }
        : {
            transform: 'scale(1)',
            cursor: 'default',
            transition: 'transform var(--transition-base)',
        };

    return (
        <div className="image-viewer" ref={containerRef}>
            <div className="image-controls">
                <span className="zoom-hint">
                    {isFullscreen 
                        ? 'Scroll to zoom • Click and drag to pan' 
                        : 'Enter fullscreen to zoom and pan'}
                </span>
                {isFullscreen && (
                    <>
                        <button
                            className="control-btn"
                            onClick={handleZoomOut}
                            disabled={zoom <= MIN_ZOOM}
                            aria-label="Zoom out"
                            title="Zoom out"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="4" y1="8" x2="12" y2="8"/>
                            </svg>
                        </button>
                        <span className="zoom-level">{Math.round(zoom * 100)}%</span>
                        <button
                            className="control-btn"
                            onClick={handleZoomIn}
                            disabled={zoom >= MAX_ZOOM}
                            aria-label="Zoom in"
                            title="Zoom in"
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="8" y1="4" x2="8" y2="12"/>
                                <line x1="4" y1="8" x2="12" y2="8"/>
                            </svg>
                        </button>
                        {zoom > MIN_ZOOM && (
                            <button
                                className="control-btn"
                                onClick={handleResetZoom}
                                aria-label="Reset zoom"
                                title="Reset zoom"
                            >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1 8a7 7 0 0 1 7-7M15 8a7 7 0 0 1-7 7M8 1v6M8 9v6"/>
                                </svg>
                            </button>
                        )}
                    </>
                )}
                <button
                    className="control-btn fullscreen-btn"
                    onClick={toggleFullscreen}
                    aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                    title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                >
                    {isFullscreen ? (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 2H4a2 2 0 0 0-2 2v2M10 2h2a2 2 0 0 1 2 2v2M6 14H4a2 2 0 0 1-2-2v-2M10 14h2a2 2 0 0 0 2-2v-2"/>
                        </svg>
                    ) : (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 6V4a2 2 0 0 1 2-2h2M14 6V4a2 2 0 0 0-2-2h-2M2 10v2a2 2 0 0 0 2 2h2M14 10v2a2 2 0 0 1-2 2h-2"/>
                        </svg>
                    )}
                </button>
            </div>
            <div className="image-container" ref={imageContainerRef}>
                <img 
                    ref={imageRef}
                    src={src} 
                    alt={alt} 
                    className="design-image" 
                    style={imageStyle}
                />
            </div>
        </div>
    );
};

export default ImageViewer;

