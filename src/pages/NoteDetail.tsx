import { useParams, Link } from 'react-router-dom';
import { notes } from '../data/notes';
import ImageViewer from '../components/ImageViewer';
import twitterNewsFeedImage from '../assets/twitter-news-feed.svg';
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
                            <h2>High Level Design</h2>
                            <ImageViewer
                                src={twitterNewsFeedImage}
                                alt="Twitter News Feed - High Level System Design"
                            />
                        </section>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default NoteDetail;
