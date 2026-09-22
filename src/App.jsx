import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Toast from './components/Toast';
import Home from './pages/Home';
import Tracks from './pages/Tracks';
import TrackDetail from './pages/TrackDetail';
import Problems from './pages/Problems';
import Problem from './pages/Problem';
import Progress from './pages/Progress';
import './styles/index.css';

function Layout({ children, showSidebar = true }) {
  return (
    <div className="app-layout">
      <Navbar />
      <div className="main-layout">
        {showSidebar && <Sidebar />}
        <main className={`page-content ${showSidebar ? 'with-sidebar' : ''}`}>
          <div className="container">
            {children}
          </div>
        </main>
      </div>
      <Toast />
    </div>
  );
}

function FullLayout({ children }) {
  return (
    <div className="app-layout">
      <Navbar />
      <div style={{ paddingTop: 'var(--navbar-height)' }}>
        {children}
      </div>
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/tracks" element={<Layout><Tracks /></Layout>} />
          <Route path="/tracks/:trackId" element={<Layout><TrackDetail /></Layout>} />
          <Route path="/problems" element={<Layout><Problems /></Layout>} />
          <Route path="/progress" element={<Layout showSidebar={false}><Progress /></Layout>} />
          <Route path="/problem/:problemId" element={<FullLayout><Problem /></FullLayout>} />
          <Route path="*" element={
            <Layout showSidebar={false}>
              <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
                <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>404</div>
                <h1 style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Page not found</h1>
                <a href="/" className="btn btn-primary">Go Home</a>
              </div>
            </Layout>
          } />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}
