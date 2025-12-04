import type { Note } from '../types';

export const notes: Note[] = [
    {
        id: '1',
        title: 'URL Shortener',
        description: 'A comprehensive system design for building a scalable URL shortener service, covering functional requirements, data models, API design, and architecture with focus on handling 100M daily active users and low-latency redirections.',
        date: '2025-12-02',
        slug: 'url-shortener',
        tags: ['URL Shortener', 'Hashing', 'Caching']
    },
    {
        id: '2',
        title: 'Design Twitter News Feed',
        description: 'A comprehensive system design for building a scalable Twitter-like news feed, covering functional requirements, data models, API design, and architecture with focus on handling large-scale follower relationships and real-time updates.',
        date: '2025-12-03',
        slug: 'twitter-news-feed',
        tags: ['News Feed System', 'Fan-out', 'Fan-in']
    }
];
