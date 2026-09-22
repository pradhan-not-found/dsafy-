import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppShell } from './components/ui/AppShell';
import Toast from './components/Toast';
import Home from './pages/Home';
import Tracks from './pages/Tracks';
import TrackDetail from './pages/TrackDetail';
import Problems from './pages/Problems';
import Problem from './pages/Problem';
import Progress from './pages/Progress';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<AppShell><Home /></AppShell>} />
          <Route path="/tracks" element={<AppShell><Tracks /></AppShell>} />
          <Route path="/tracks/:trackId" element={<AppShell><TrackDetail /></AppShell>} />
          <Route path="/problems" element={<AppShell><Problems /></AppShell>} />
          <Route path="/progress" element={<AppShell showSidebar={false}><Progress /></AppShell>} />
          <Route path="/problem/:problemId" element={<AppShell showSidebar={false}><Problem /></AppShell>} />
          <Route path="*" element={
            <AppShell showSidebar={false}>
              <div className="text-center py-24 flex-1 flex flex-col items-center justify-center">
                <div className="text-8xl font-black mb-4 tracking-tighter">404</div>
                <h1 className="text-gray-500 mb-8 font-medium">Page not found</h1>
                <a href="/" className="btn btn-primary">Return Home</a>
              </div>
            </AppShell>
          } />
        </Routes>
        <Toast />
      </AppProvider>
    </BrowserRouter>
  );
}
