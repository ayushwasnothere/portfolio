import { useState } from 'react';
import './styles/index.css';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutBento } from './components/AboutBento';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { SkillsMarquee } from './components/SkillsMarquee';
import { ContactSection } from './components/ContactSection';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <div className={`min-h-screen bg-[#030304] text-white bg-noise selection:bg-purple-500/30 selection:text-white transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <CustomCursor />
        <Navbar />
        <main>
          <Hero />
          <AboutBento />
          <ProjectsShowcase />
          <ExperienceTimeline />
          <SkillsMarquee />
          <ContactSection />
        </main>
      </div>
    </>
  );
}

export default App;
