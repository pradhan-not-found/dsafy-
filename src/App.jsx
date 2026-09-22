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
import './index.css';

function Layout({ children, showSidebar = true }) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black font-sans">
      <Navbar />
      <div className="flex flex-1 pt-14">
        {showSidebar && <Sidebar />}
        <main className={`flex-1 p-6 md:p-10 transition-all ${showSidebar ? 'ml-64' : ''}`}>
          <div className="max-w-6xl mx-auto w-full">
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
    <div className="flex flex-col min-h-screen bg-white text-black font-sans">
      <Navbar />
      <div className="pt-14 h-screen flex flex-col">
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
              <div className="text-center py-24">
                <div className="text-8xl font-black mb-4 tracking-tighter">404</div>
                <h1 className="text-gray-500 mb-8 font-medium">Page not found</h1>
                <a href="/" className="btn btn-primary">Return Home</a>
              </div>
            </Layout>
          } />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}
