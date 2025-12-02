import NoteCard from './NoteCard';
import { notes } from '../data/notes';
import './NotesList.css';

const NotesList = () => {
    return (
        <main className="notes-list fade-in">
            <div className="container">
                {notes.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">
                            <svg
                                width="120"
                                height="120"
                                viewBox="0 0 120 120"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle
                                    cx="60"
                                    cy="60"
                                    r="50"
                                    stroke="url(#gradient)"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeDasharray="8 8"
                                    className="rotating-circle"
                                />
                                <path
                                    d="M40 50h40M40 60h40M40 70h25"
                                    stroke="url(#gradient)"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                />
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="hsl(250, 84%, 54%)" />
                                        <stop offset="100%" stopColor="hsl(210, 100%, 56%)" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <h2 className="empty-state-title">No Notes Yet</h2>
                        <p className="empty-state-description">
                            This is where your system design solutions will appear. Start adding notes to build your collection of technical insights and problem-solving approaches.
                        </p>
                        <div className="empty-state-hint">
                            <p className="hint-text">
                                💡 Each note will showcase a unique system design problem and your solution
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="notes-grid">
                        {notes.map((note) => (
                            <NoteCard key={note.id} note={note} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default NotesList;
