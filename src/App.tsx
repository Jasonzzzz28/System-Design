import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NotesList from './components/NotesList';
import NoteDetail from './pages/NoteDetail';

function App() {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<NotesList />} />
        <Route path="/notes/:slug" element={<NoteDetail />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
