# System Design Notes

It's just me practicing system design problems [:D] 
It's not very rewarding just practicing, so I'm going to share it here.

## 📚 Current Notes

- **URL Shortener**: Design for a scalable URL shortener service handling 100M daily active users
- **Twitter News Feed**: Design for a Twitter-like news feed system with fan-out/fan-in patterns

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing (HashRouter for GitHub Pages compatibility)
- **CSS** - Custom styling with CSS variables

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd System-Design
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Header.tsx      # Site header component
│   ├── NotesList.tsx   # List view of all notes
│   ├── NoteCard.tsx    # Individual note card component
│   └── ImageViewer.tsx # SVG diagram viewer component
├── pages/              # Page components
│   └── NoteDetail.tsx  # Individual note detail page
├── data/               # Data files
│   └── notes.ts        # Notes data structure
├── assets/             # Static assets
│   ├── *.svg          # System design diagrams
└── types.ts           # TypeScript type definitions
```

## 📝 Adding New Notes

To add a new system design note:

1. Add a new entry to `src/data/notes.ts`:
```typescript
{
    id: '3',
    title: 'Your Note Title',
    description: 'Brief description',
    date: 'YYYY-MM-DD', // UTC time
    slug: 'your-note-slug',
    tags: ['Tag1', 'Tag2']
}
```

2. Add the note content in `src/pages/NoteDetail.tsx` by adding a new condition in the conditional rendering.

3. Add your diagram SVG to `src/assets/` and import it in `NoteDetail.tsx`.

## 🌐 Deployment

This project is configured for GitHub Pages deployment:

1. Build the project:
```bash
npm run build
```

2. The `dist/` folder contains the production-ready files.

3. Deploy the `dist/` folder to GitHub Pages (or your preferred hosting service).

The project uses HashRouter, which is compatible with GitHub Pages static hosting.

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

---
