import { Routes, Route } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import PageTransition from './components/PageTransition';
import ScrollProgress from './components/ScrollProgress';
import BackgroundAnimation from './components/BackgroundAnimation';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';

import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.4 }}>
      <Analytics />
      <BackgroundAnimation />
      <Preloader />
      <PageTransition />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
        </Routes>
      </main>
    </ReactLenis>
  );
}

export default App;
