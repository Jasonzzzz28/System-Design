import { useParams, Link } from 'react-router-dom';
import { notes } from '../data/notes';
import ImageViewer from '../components/ImageViewer';
import twitterNewsFeedImage from '../assets/twitter-news-feed.svg';
import urlShortenerImage from '../assets/url-shortener.svg';
import youtubeImage from '../assets/youtube.svg';
import jobSchedulerImage from '../assets/job-scheduler.svg';
import ticketBookingImage from '../assets/ticket-booking.svg';
import rateLimiterImage from '../assets/rate-limiter.svg';
import './NoteDetail.css';

const NoteDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const note = notes.find((n) => n.slug === slug);

    if (!note) {
        return (
            <div className="note-detail-container fade-in">
                <div className="container">
                    <div className="not-found">
                        <h2>Note Not Found</h2>
                        <p>The note you're looking for doesn't exist.</p>
                        <Link to="/" className="btn btn-primary">
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="note-detail-container fade-in">
            <div className="container">
                <Link to="/" className="back-link">
                    ← Back to all notes
                </Link>

                <article className="note-detail">
                    <header className="note-detail-header">
                        <h1 className="note-detail-title">{note.title}</h1>
                        <div className="note-detail-meta">
                            <time className="note-detail-date" dateTime={note.date}>
                                {new Date(note.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </time>
                            {note.tags && note.tags.length > 0 && (
                                <div className="note-detail-tags">
                                    {note.tags.map((tag) => (
                                        <span key={tag} className="note-tag">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </header>

                    <div className="note-detail-content">
                        {note.slug === 'twitter-news-feed' ? (
                            <>
                                <section className="content-section">
                                    <h2>Functional Requirements</h2>
                                    <ol>
                                        <li>Users should be able to follow/unfollow other users</li>
                                        <li>Users should be able to create posts</li>
                                        <li>Users should be able to view a feed of posts from the users they are following</li>
                                        <li>Users should be able to page through of the news feed</li>
                                    </ol>
                                </section>

                                <section className="content-section">
                                    <h2>Nonfunctional Requirements</h2>
                                    <ol>
                                        <li>Highly available (prefer availability over consistency)</li>
                                        <li>Low latency for creating and view posts (&lt; 500 ms)</li>
                                    </ol>
                                </section>

                                <section className="content-section">
                                    <h2>Core Entities</h2>
                                    <ol>
                                        <li>Users</li>
                                        <li>Posts</li>
                                        <li>Follow relationship (uni-directional)</li>
                                    </ol>
                                </section>

                                <section className="content-section">
                                    <h2>API</h2>

                                    <div className="api-endpoint">
                                        <h3>1. Create Post</h3>
                                        <div className="code-block">
                                            <div className="code-line"><span className="method">POST</span> /posts</div>
                                            <div className="code-line">Authorization: &lt;auth-token&gt;</div>
                                            <div className="code-line">{`{`}</div>
                                            <div className="code-line indent">  "contents": {`{}`}</div>
                                            <div className="code-line">{`}`}</div>
                                            <div className="code-line response">⇒ 201 CREATED</div>
                                            <div className="code-line">{`{`}</div>
                                            <div className="code-line indent">  "postId": ...</div>
                                            <div className="code-line">{`}`}</div>
                                        </div>
                                    </div>

                                    <div className="api-endpoint">
                                        <h3>2. Follow User</h3>
                                        <div className="code-block">
                                            <div className="code-line"><span className="method">PUT</span> /users/{`{id}`}/followers</div>
                                            <div className="code-line">{`{}`}</div>
                                            <div className="code-line response">⇒ 200 OK</div>
                                        </div>
                                    </div>

                                    <div className="api-endpoint">
                                        <h3>3. Get Feed</h3>
                                        <div className="code-block">
                                            <div className="code-line"><span className="method">GET</span> /feed?page-size={`{size}`}&cursor={`{timestamp}`}</div>
                                            <div className="code-line response">⇒ 200 OK</div>
                                            <div className="code-line">{`{`}</div>
                                            <div className="code-line indent">  "items": Post[],</div>
                                            <div className="code-line indent">  "nextCursor": timestamp</div>
                                            <div className="code-line">{`}`}</div>
                                        </div>
                                    </div>
                                </section>

                                <section className="content-section">
                                    <h2>High Level Design and Deep Dives</h2>
                                    <ImageViewer
                                        src={twitterNewsFeedImage}
                                        alt="Twitter News Feed - High Level System Design"
                                        useLightbox={true}
                                    />
                                </section>
                            </>
                        ) : note.slug === 'url-shortener' ? (
                            <>
                                <section className="content-section">
                                    <h2>Clarification</h2>
                                    <ol>
                                        <li><strong>Traffic/volume?</strong> Generate 100M tiny URLs per day</li>
                                        <li><strong>Tiny URL length requirements?</strong> As short as possible.</li>
                                        <li><strong>What characters allowed for tiny URLs?</strong> (0-9)(a-z)(A-Z)</li>
                                        <li><strong>Can shortened URLs be deleted or updated?</strong> Not considered</li>
                                    </ol>
                                </section>

                                <section className="content-section">
                                    <h2>Functional Requirements</h2>
                                    <ol>
                                        <li>Users should be able to create a shortened URL with a long URL</li>
                                        <li>Users should be able to access the original URL with the shortened URL</li>
                                    </ol>
                                </section>

                                <section className="content-section">
                                    <h2>Non-Functional Requirements</h2>
                                    <ol>
                                        <li>CAP → Availability over Consistency</li>
                                        <li>Low latency redirection (&lt; 100ms)</li>
                                        <li>Uniqueness of generated URLs.</li>
                                        <li>Scalability → Handle 100M DAU</li>
                                    </ol>
                                </section>

                                <section className="content-section">
                                    <h2>Core Entities</h2>
                                    <ol>
                                        <li>Users</li>
                                        <li>Long URLs</li>
                                        <li>Short URLs</li>
                                    </ol>
                                </section>

                                <section className="content-section">
                                    <h2>API</h2>

                                    <div className="api-endpoint">
                                        <h3>1. POST /urls</h3>
                                        <div className="code-block">
                                            <div className="code-line">{`{`}</div>
                                            <div className="code-line indent">  "long_url": "long_url"</div>
                                            <div className="code-line indent">  "expiration_date": "optional_expiration_date"</div>
                                            <div className="code-line">{`}`}</div>
                                            <div className="code-line response">⇒ 201 CREATED</div>
                                            <div className="code-line">{`{`}</div>
                                            <div className="code-line indent">  "short_url": "short_url"</div>
                                            <div className="code-line">{`}`}</div>
                                        </div>
                                    </div>

                                    <div className="api-endpoint">
                                        <h3>2. GET /{`{short_url_code}`}</h3>
                                        <div className="code-block">
                                            <div className="code-line response">⇒ 302 Temporary redirection to the long URL</div>
                                        </div>
                                    </div>
                                </section>

                                <section className="content-section">
                                    <h2>High Level Design</h2>
                                    <ImageViewer
                                        src={urlShortenerImage}
                                        alt="URL Shortener - High Level System Design"
                                        useLightbox={true}
                                    />
                                </section>

                                <section className="content-section">
                                    <h2>Deep Dives</h2>
                                    
                                    <div className="api-endpoint">
                                        <h3>1. How to reduce the latency of redirects?</h3>
                                        <p>Use cache (Redis) for redirection service.</p>
                                        <div className="code-block">
                                            <div className="code-line">key: short_url</div>
                                            <div className="code-line">val: long_url</div>
                                        </div>
                                    </div>

                                    <div className="api-endpoint">
                                        <h3>2. How to ensure uniqueness of the short URL?</h3>
                                        <p>Use a global counter (Redis). Increment the counter for every URL created.</p>
                                        <p>Use base62 hash [a-z, A-Z, 0-9] to encode the latest count into the code for short url. ([+, /] is reserved for URL encoding)</p>
                                        <p>To reduce the length of the short URL, we can use the first N (eg. 7) characters.</p>
                                        <div className="explanation-block">
                                            <p><strong>Why 7 characters?</strong></p>
                                            <ul style={{ marginLeft: 'var(--spacing-md)', marginTop: 'var(--spacing-xs)' }}>
                                                <li>100M DAU;</li>
                                                <li>Assume avg 1 URLs per user per day → 100M URLs per day → 36.5B URLs per year</li>
                                                <li>Assume support for 10 years → 365B URLs</li>
                                                <li>log[base62](365B) = 6.451</li>
                                                <li>So 7 character satisfies our needs.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </section>
                            </>
                        ) : note.slug === 'youtube' ? (
                            <>
                                <section className="content-section">
                                    <h2>Prerequisite Concepts</h2>
                                    <ol>
                                        <li><strong>Video Codec</strong> – The method that compresses and decompresses video. It affects quality, speed, and file size. (e.g., H.264, H.265, AV1)</li>
                                        <li><strong>Video Container</strong> – The file format that packages video, audio, and subtitles together. (e.g., MP4, MKV)</li>
                                        <li><strong>Bitrate</strong> – The amount of data per second in a video. Higher bitrate = better quality, larger size.</li>
                                        <li><strong>Manifest Files</strong> – Streaming instruction files that list video qualities and the small segments the player should download.</li>
                                        <li><strong>Transcoder</strong> – A tool that converts a video into different formats, resolutions, or bitrates.</li>
                                        <li><strong>Adaptive Bitrate Streaming</strong> – A streaming method where the player automatically switches between different video quality levels based on your current internet speed.</li>
                                    </ol>
                                </section>

                                <section className="content-section">
                                    <h2>Functional Requirements</h2>
                                    <ol>
                                        <li>User should be able to upload videos</li>
                                        <li>User should be able to watch videos</li>
                                    </ol>
                                </section>

                                <section className="content-section">
                                    <h2>Non-Functional Requirements</h2>
                                    <ol>
                                        <li>Highly available (prefer availability over consistency)</li>
                                        <li>Low latency for uploading and streaming videos</li>
                                        <li>Scale to high volume of user activities. (100M uploads per day, 10B views per day)</li>
                                    </ol>
                                </section>

                                <section className="content-section">
                                    <h2>Core Entities</h2>
                                    <ol>
                                        <li>Users</li>
                                        <li>Videos</li>
                                        <li>Video Metadata</li>
                                    </ol>
                                </section>

                                <section className="content-section">
                                    <h2>API</h2>

                                    <div className="api-endpoint">
                                        <h3>1. POST /videos</h3>
                                        <div className="code-block">
                                            <div className="code-line">{`{`}</div>
                                            <div className="code-line indent">  "video",</div>
                                            <div className="code-line indent">  "video_metadata"</div>
                                            <div className="code-line">{`}`}</div>
                                            <div className="code-line response">⇒ 201 CREATED</div>
                                        </div>
                                    </div>

                                    <div className="api-endpoint">
                                        <h3>2. GET /videos/{`{video-id}`}</h3>
                                        <div className="code-block">
                                            <div className="code-line response">⇒ 200 OK</div>
                                            <div className="code-line">{`{`}</div>
                                            <div className="code-line indent">  "video",</div>
                                            <div className="code-line indent">  "video_metadata"</div>
                                            <div className="code-line">{`}`}</div>
                                        </div>
                                    </div>
                                </section>

                                <section className="content-section">
                                    <h2>High Level Design + Deep Dives</h2>
                                    
                                    <div className="api-endpoint">
                                        <h3>Upload videos?</h3>
                                        <p>Store videos in BLOB storage like AWS S3.</p>
                                        <p>Use presigned url to upload directly to the BLOB storage.</p>
                                        <p>Video chunking. This can happen on client side or server side. Most common practice is on the client side. (browser)</p>
                                        
                                        <p><strong>Resumable upload?</strong></p>
                                        <div className="explanation-block">
                                            <p>The client splits the video into small hashed chunks and uploads them to BLOB store.</p>
                                            <p>Each successful chunk upload is verified by the backend and marked as uploaded.</p>
                                            <p>After completion, BLOB store emits a single event to trigger processing.</p>
                                            <p>Uploads can be resumed by skipping already uploaded chunks.</p>
                                        </div>
                                    </div>

                                    <div className="api-endpoint">
                                        <h3>Stream videos?</h3>
                                        <ol style={{ marginLeft: 'var(--spacing-lg)', marginTop: 'var(--spacing-xs)' }}>
                                            <li>Video chunker breaks video into small segments (2-10s). The transcoder converts uploaded videos into different formats, resolutions, or bitrates.</li>
                                            <li>The client fetches the video metadata.</li>
                                            <li>It downloads the manifest, picks a quality based on network conditions.</li>
                                            <li>It starts downloading and playing the first segment, automatically switches the quality based on internet speed.</li>
                                        </ol>
                                    </div>

                                    <div className="api-endpoint">
                                        <h3>Improve streaming latency?</h3>
                                        <p><strong>CDN (Content Delivery Network)</strong> - a global network of servers that stores copies (caches) of website content (images, videos, scripts) on "edge" servers closer to users.</p>
                                    </div>
                                </section>

                                <section className="content-section">
                                    <h2>High Level Design</h2>
                                    <ImageViewer
                                        src={youtubeImage}
                                        alt="YouTube - High Level System Design"
                                        useLightbox={true}
                                    />
                                </section>
                            </>
                        ) : note.slug === 'distributed-job-scheduler' ? (
                            <>
                                <section className="content-section">
                                    <h2>Functional Requirements</h2>
                                    <ol>
                                        <li>Users can submit ad-hoc/scheduled jobs</li>
                                        <li>Users can cancel jobs</li>
                                        <li>Users can view job schedules, execution status, and etc.</li>
                                        <li>The system should execute the jobs in distributed method</li>
                                    </ol>
                                </section>

                                <section className="content-section">
                                    <h2>Non-Functional Requirements</h2>
                                    <ol>
                                        <li><strong>Scalability:</strong> support large volume of users and jobs. (e.g. 100M jobs daily)</li>
                                        <li><strong>High availability</strong></li>
                                        <li><strong>Low latency:</strong> Job should run less than couple of seconds after the scheduled time. (ideally &lt; 100ms)</li>
                                        <li><strong>Consistency:</strong> Consistent job status. Ideally, jobs should be executed only once.</li>
                                    </ol>
                                </section>

                                <section className="content-section">
                                    <h2>Core Entities</h2>
                                    <ol>
                                        <li>Users</li>
                                        <li>Jobs (job_id, execution_datetime, frequency, created_at, user_id, status, last_executed_at, next_execution_time, ...)</li>
                                    </ol>
                                </section>

                                <section className="content-section">
                                    <h2>API</h2>

                                    <div className="api-endpoint">
                                        <h3>1. POST /jobs</h3>
                                        <div className="code-block">
                                            <div className="code-line">{`{`}</div>
                                            <div className="code-line indent">  "job_id",</div>
                                            <div className="code-line indent">  "start_datetime",</div>
                                            <div className="code-line indent">  "frequency",</div>
                                            <div className="code-line indent">  "created_at",</div>
                                            <div className="code-line indent">  "user_id"</div>
                                            <div className="code-line">{`}`}</div>
                                            <div className="code-line response">⇒ 201 CREATED</div>
                                        </div>
                                    </div>

                                    <div className="api-endpoint">
                                        <h3>2. DELETE /jobs/{`{job-id}`}</h3>
                                        <div className="code-block">
                                            <div className="code-line response">⇒ 204 NO CONTENT</div>
                                        </div>
                                    </div>

                                    <div className="api-endpoint">
                                        <h3>3. GET /jobs/{`{job-id}`}</h3>
                                        <div className="code-block">
                                            <div className="code-line indent">/jobs?status=failed&user_id=user1</div>
                                            <div className="code-line indent">/jobs/execution?worker_id=w1&status=completed</div>
                                        </div>
                                    </div>
                                </section>

                                <section className="content-section">
                                    <h2>High Level Design</h2>
                                    <ImageViewer
                                        src={jobSchedulerImage}
                                        alt="Distributed Job Scheduler - High Level System Design"
                                        useLightbox={true}
                                    />
                                </section>

                                <section className="content-section">
                                    <h2>Deep Dives</h2>
                                    
                                    <div className="api-endpoint">
                                        <h3>1. How to ensure jobs are not processed by multiple workers at the same time?</h3>
                                        <p>Partition the job schedule table into segments based on job_id. The coordinator can assign segments to specific worker nodes.</p>
                                    </div>

                                    <div className="api-endpoint">
                                        <h3>2. How to handle job failure?</h3>
                                        <p>Retry with exponential backoff. If exceed the max_retries, update the Job status to failed.</p>
                                    </div>

                                    <div className="api-endpoint">
                                        <h3>3. How to handle worker failure?</h3>
                                        <p>The coordinator monitors the heartbeats sent by worker nodes and performs periodic health checks on worker nodes (CPU, Memory, Disk, Network Connectivity).</p>
                                    </div>

                                    <div className="api-endpoint">
                                        <h3>4. Rate limiting?</h3>
                                        <p>At job submission level, job queue level, work node level.</p>
                                    </div>
                                </section>
                            </>
                        ) : note.slug === 'ticket-booking-system' ? (
                            <>
                                <section className="content-section">
                                    <h2>Functional Requirements</h2>
                                    <ol>
                                        <li>Users can view events</li>
                                        <li>Users can search events</li>
                                        <li>Users can book available tickets</li>
                                        <li>[Out of scope] Users can view booked tickets</li>
                                        <li>[Out of scope] Users can sell/transfer tickets</li>
                                        <li>[Out of scope] Admins can add/edit events</li>
                                    </ol>
                                </section>

                                <section className="content-section">
                                    <h2>Non-Functional Requirements</h2>
                                    <ol>
                                        <li><strong>Availability:</strong> events viewing needs to be highly available</li>
                                        <li><strong>Consistency:</strong> consistent for ticket booking. ACID.</li>
                                        <li><strong>Scalability:</strong> scale to 10M DAU. Heavy reads.</li>
                                        <li><strong>Low latency</strong> for event viewing and search</li>
                                    </ol>
                                </section>

                                <section className="content-section">
                                    <h2>Core Entities</h2>
                                    <ol>
                                        <li>User</li>
                                        <li>Event</li>
                                        <li>Ticket</li>
                                        <li>Booking</li>
                                    </ol>
                                </section>

                                <section className="content-section">
                                    <h2>API</h2>

                                    <div className="api-endpoint">
                                        <h3>1. Event Viewing</h3>
                                        <div className="code-block">
                                            <div className="code-line"><span className="method">GET</span> /events/{`{event-id}`}</div>
                                            <div className="code-line response">⇒ 200 OK</div>
                                            <div className="code-line">{`{`}</div>
                                            <div className="code-line indent">  "event_id", "datetime", "venue", "performer", "ticket[]"</div>
                                            <div className="code-line">{`}`}</div>
                                        </div>
                                    </div>

                                    <div className="api-endpoint">
                                        <h3>2. Event Search</h3>
                                        <div className="code-block">
                                            <div className="code-line"><span className="method">GET</span> /events?category=concert&date-from=2026-01-10&date-to=2026-01-12&page=5&page-size=10</div>
                                            <div className="code-line response">⇒ 200 OK</div>
                                            <div className="code-line">{`{`}</div>
                                            <div className="code-line indent">  "events": [("event_id", "datetime", "venue", "performer"), ...]</div>
                                            <div className="code-line">{`}`}</div>
                                        </div>
                                    </div>

                                    <div className="api-endpoint">
                                        <h3>3. POST /booking/reserve</h3>
                                        <div className="code-block">
                                            <div className="code-line">Authorization: JWT | session_token</div>
                                            <div className="code-line">{`{`}</div>
                                            <div className="code-line indent">  "ticket_id"</div>
                                            <div className="code-line">{`}`}</div>
                                        </div>
                                    </div>

                                    <div className="api-endpoint">
                                        <h3>4. POST /booking/confirm</h3>
                                        <div className="code-block">
                                            <div className="code-line">Authorization: JWT | session_token</div>
                                            <div className="code-line">{`{`}</div>
                                            <div className="code-line indent">  "ticket_id"</div>
                                            <div className="code-line">{`}`}</div>
                                        </div>
                                    </div>

                                    <div className="api-endpoint">
                                        <h3>5. GET /booking/{`{booking-id}`}</h3>
                                        <div className="code-block">
                                            <div className="code-line">Authorization: JWT | session_token</div>
                                            <div className="code-line response">⇒ 200 OK</div>
                                            <div className="code-line">{`{`}</div>
                                            <div className="code-line indent">  "ticket_id[]"</div>
                                            <div className="code-line">{`}`}</div>
                                        </div>
                                    </div>
                                </section>

                                <section className="content-section">
                                    <h2>High Level Design</h2>
                                    <ImageViewer
                                        src={ticketBookingImage}
                                        alt="Ticket Booking System - High Level System Design"
                                        useLightbox={true}
                                    />
                                </section>

                                <section className="content-section">
                                    <h2>Deep Dives</h2>
                                    
                                    <div className="api-endpoint">
                                        <h3>1. How to improve the booking experience?</h3>
                                        <p>Distributed lock with TTL (Redis)</p>
                                        <p><strong>Alternative:</strong> Short transactions on Ticket Table.</p>
                                        <div className="code-block">
                                            <div className="code-line">BEGIN TRANSACTION</div>
                                            <div className="code-line"></div>
                                            <div className="code-line">rows_updated = UPDATE tickets</div>
                                            <div className="code-line indent">               SET status = RESERVED,</div>
                                            <div className="code-line indent">                   expires_at = now + 10 minutes</div>
                                            <div className="code-line indent">               WHERE ticket_id = id</div>
                                            <div className="code-line indent">                 AND (</div>
                                            <div className="code-line indent">                      status == AVAILABLE</div>
                                            <div className="code-line indent">                      OR (status == RESERVED AND expires_at &lt; now)</div>
                                            <div className="code-line indent">                     )</div>
                                            <div className="code-line"></div>
                                            <div className="code-line">IF rows_updated == 0:</div>
                                            <div className="code-line indent">    ROLLBACK</div>
                                            <div className="code-line indent">    RETURN "Not available / retry"</div>
                                            <div className="code-line"></div>
                                            <div className="code-line">COMMIT</div>
                                            <div className="code-line">RETURN "Reserved"</div>
                                        </div>
                                    </div>

                                    <div className="api-endpoint">
                                        <h3>2. How to scale to concurrent requests during popular events?</h3>
                                        <p>Caching, load balancing, horizontal scaling.</p>
                                    </div>

                                    <div className="api-endpoint">
                                        <h3>3. How to improve user experience during high-demand events?</h3>
                                        <p>For very popular events, add a virtual waiting queue with WebSocket connection for updates on user's eligibility to enter the ticket purchasing stage. Also update the User Table on the eligibility.</p>
                                    </div>

                                    <div className="api-endpoint">
                                        <h3>4. How to improve search latency?</h3>
                                        <p>Full-text search engine like ElasticSearch with change data capture (CDC) for real-time or near-real-time data sync between search engine and DB.</p>
                                        <p><strong>Extensions:</strong></p>
                                        <p>Leverage Elasticsearch query and request caches, optionally backed by a CDN for non-personalized searches, to reduce load and latency. Challenges include cache invalidation on data changes and added infrastructure complexity.</p>
                                    </div>
                                </section>
                            </>
                        ) : note.slug === 'rate-limiter' ? (
                            <>
                                <section className="content-section">
                                    <h2>Functional Requirements</h2>
                                    <ol>
                                        <li>The system should identify the clients by client_id, ip_address or API key</li>
                                        <li>The system should limit HTTP requests based on configurable rules</li>
                                        <li>If the requests exceed the limit, the system should return HTTP 429 with reset time and other related info</li>
                                        <li>[Out of Scope] Complex query or analytics on data</li>
                                        <li>[Out of Scope] Long term persistence</li>
                                    </ol>
                                </section>

                                <section className="content-section">
                                    <h2>Non-Functional Requirements</h2>
                                    <ol>
                                        <li><strong>High availability</strong></li>
                                        <li><strong>Eventual consistency</strong> for rate limiting across nodes</li>
                                        <li><strong>Low latency</strong> (&lt; 10ms per request)</li>
                                        <li><strong>Scale:</strong> Handle high volume and throughput of requests</li>
                                    </ol>
                                </section>

                                <section className="content-section">
                                    <h2>Core Entities</h2>
                                    <ol>
                                        <li>Client</li>
                                        <li>Request</li>
                                        <li>Rules</li>
                                    </ol>
                                </section>

                                <section className="content-section">
                                    <h2>API</h2>

                                    <div className="api-endpoint">
                                        <h3>1. is_request_allowed(client_id, rule_id)</h3>
                                        <div className="code-block">
                                            <div className="code-line">⇒ {`{`}</div>
                                            <div className="code-line indent">  "is_allowed": boolean,</div>
                                            <div className="code-line indent">  "remaining": number,</div>
                                            <div className="code-line indent">  "reset_time": time_stamp</div>
                                            <div className="code-line">{`}`}</div>
                                        </div>
                                    </div>
                                </section>

                                <section className="content-section">
                                    <h2>High Level Design</h2>
                                    <ImageViewer
                                        src={rateLimiterImage}
                                        alt="Rate Limiter - High Level System Design"
                                        useLightbox={true}
                                    />
                                </section>

                                <section className="content-section">
                                    <h2>Deep Dives</h2>
                                    
                                    <div className="api-endpoint">
                                        <h3>1. Scaling?</h3>
                                        <p>Sharding: stateless services, sharding on Redis with potentially User ID or IP as the sharding key with consistent hashing.</p>
                                    </div>

                                    <div className="api-endpoint">
                                        <h3>2. High availability and fault tolerance</h3>
                                        <p>Replication: master-slave replication with async replication. (Redis Cluster) (High availability but increased cost and replica synchronization lag.)</p>
                                        <p>If all replicas of that shard fail → Fail Closed (Reject all requests for that shard) | Fail Open (Allow requests without rate limiter)</p>
                                    </div>

                                    <div className="api-endpoint">
                                        <h3>3. Minimize latency?</h3>
                                        <p>Connection pooling: Use persistent Redis connections instead of creating a new TCP connection per rate-limit check. This avoids TCP handshake overhead (20–50ms) and allows reuse across requests. Most Redis clients pool connections automatically; tune pool size based on traffic and Redis latency.</p>
                                    </div>

                                    <div className="api-endpoint">
                                        <h3>4. Hot keys?</h3>
                                        <p><strong>Legitimate clients:</strong> encourage client-side rate limiting, support request batching, and offer higher limits via tiers.</p>
                                        <p><strong>Abusive traffic:</strong> auto-block repeat offenders and rely on upstream DDoS protection (e.g., Cloudflare or AWS Shield).</p>
                                    </div>

                                    <div className="api-endpoint">
                                        <h3>5. Dynamic config?</h3>
                                        <p>ZooKeeper or etcd.</p>
                                        <p>poll-based vs push-based? Use push-based for changes since config changes are not often.</p>
                                    </div>
                                </section>
                            </>
                        ) : null}
                    </div>
                </article>
            </div>
        </div>
    );
};

export default NoteDetail;
