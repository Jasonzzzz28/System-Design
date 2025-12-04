import { useParams, Link } from 'react-router-dom';
import { notes } from '../data/notes';
import ImageViewer from '../components/ImageViewer';
import twitterNewsFeedImage from '../assets/twitter-news-feed.svg';
import urlShortenerImage from '../assets/url-shortener.svg';
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
                        ) : null}
                    </div>
                </article>
            </div>
        </div>
    );
};

export default NoteDetail;
