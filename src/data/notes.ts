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
    },
    {
        id: '3',
        title: 'Design YouTube',
        description: 'A comprehensive system design for building a scalable video streaming platform like YouTube, covering video upload, transcoding, adaptive bitrate streaming, and CDN distribution to handle 100M uploads and 10B views per day.',
        date: '2025-12-14',
        slug: 'youtube',
        tags: ['Video Upload', 'Video Streaming', 'Blob Storage', 'CDN']
    },
    {
        id: '4',
        title: 'Distributed Job Scheduler',
        description: 'A comprehensive system design for building a scalable distributed job scheduler to handle 100M jobs daily with high availability and low latency execution.',
        date: '2026-01-04',
        slug: 'distributed-job-scheduler',
        tags: ['Job Scheduler', 'Distributed Systems', 'Queue', 'Replication']
    },
    {
        id: '5',
        title: 'Ticket Booking System like Ticketmaster/StubHub',
        description: 'A comprehensive system design for building a scalable ticket booking system to handle 10M DAU with high availability, ACID consistency for bookings, and low latency for event viewing and search.',
        date: '2026-01-06',
        slug: 'ticket-booking-system',
        tags: ['Ticket Booking', 'ACID', 'Distributed Lock', 'Full-text Search']
    },
    {
        id: '6',
        title: 'Rate Limiter',
        description: 'A comprehensive system design for building a scalable rate limiter to handle high volume requests with high availability, eventual consistency, and low latency (< 10ms per request).',
        date: '2026-01-08',
        slug: 'rate-limiter',
        tags: ['Rate Limiting', 'Token Bucket', 'Configuration Management', 'Sharding']
    }
];
