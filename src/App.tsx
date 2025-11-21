import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { NetworkGuard } from './components/NetworkGuard';
import { Home } from './pages/Home';
import { Game } from './pages/Game';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { Profile } from './pages/Profile';
import { HowToPlay } from './pages/HowToPlay';

export default function App() {
  return (
    <Router>
      <NetworkGuard>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/game" element={<Game />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/how-to-play" element={<HowToPlay />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </NetworkGuard>
    </Router>
  );
}
