import { Link } from 'react-router-dom';
import type { Note } from '../types';
import './NoteCard.css';

interface NoteCardProps {
    note: Note;
}

const NoteCard = ({ note }: NoteCardProps) => {
    return (
        <Link to={`/notes/${note.slug}`} className="note-card-link">
            <article className="note-card glass-card">
                <div className="note-card-header">
                    <h3 className="note-card-title">{note.title}</h3>
                    <time className="note-card-date" dateTime={note.date}>
                        {new Date(note.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </time>
                </div>
                <p className="note-card-description">{note.description}</p>
                {note.tags && note.tags.length > 0 && (
                    <div className="note-card-tags">
                        {note.tags.map((tag) => (
                            <span key={tag} className="note-tag">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
                <div className="note-card-footer">
                    <span className="read-more">
                        Read more <span className="arrow">→</span>
                    </span>
                </div>
            </article>
        </Link>
    );
};

export default NoteCard;
