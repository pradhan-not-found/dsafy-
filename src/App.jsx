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
          <Route path="/"                 element={<AppShell><Home /></AppShell>} />
          <Route path="/tracks"           element={<AppShell><Tracks /></AppShell>} />
          <Route path="/tracks/:trackId"  element={<AppShell><TrackDetail /></AppShell>} />
          <Route path="/problems"         element={<AppShell><Problems /></AppShell>} />
          <Route path="/progress"         element={<AppShell><Progress /></AppShell>} />
          <Route path="/problem/:problemId" element={<AppShell showSidebar={false}><Problem /></AppShell>} />
          <Route path="*" element={
            <AppShell showSidebar={false}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', gap:12 }}>
                <div style={{ fontSize:'5rem', fontWeight:800, letterSpacing:'-0.05em', color:'var(--app-ink)' }}>404</div>
                <p style={{ color:'var(--app-muted)' }}>Page not found</p>
                <a href="/" style={{ marginTop:8, padding:'6px 16px', background:'var(--app-ink)', color:'#fff', borderRadius:8, fontSize:13, fontWeight:600 }}>Return Home</a>
              </div>
            </AppShell>
          } />
        </Routes>
        <Toast />
      </AppProvider>
    </BrowserRouter>
  );
}
