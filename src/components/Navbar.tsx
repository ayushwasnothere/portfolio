import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { name: 'Home', id: 'home', color: 'bg-yellow-500' },
  { name: 'About Me', id: 'about', color: 'bg-blue-500' },
  { name: 'Experience', id: 'experience', color: 'bg-teal-500' },
  { name: 'Projects', id: 'projects', color: 'bg-indigo-500' },
  { name: 'Blog', id: 'blog', color: 'bg-purple-500' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavClick = (id: string) => {
    setIsOpen(false);

    if (id === 'blog') {
      navigate('/blog');
      return;
    }

    if (location.pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else if (id === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <>
      <button
        className={`hamburger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        <span />
        <span />
      </button>

      <div
        className={`nav-overlay ${isOpen ? 'visible' : ''}`}
        onClick={() => setIsOpen(false)}
      />

      <nav className={`nav-drawer ${isOpen ? 'open' : ''}`}>
        <div className="nav-drawer-bg" />

        <div className="flex flex-col gap-10">
          <div>
            <h3 className="text-muted-foreground text-sm font-semibold tracking-wider mb-6">MENU</h3>
            <ul className="flex flex-col gap-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className="nav-menu-item flex items-center gap-4 text-4xl sm:text-5xl font-anton text-foreground hover:text-primary transition-colors text-left"
                  >
                    <div className={`nav-menu-dot ${item.color}`}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-background">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-muted-foreground text-sm font-semibold tracking-wider mb-4">SOCIAL</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="https://github.com/ayushwasnothere"
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground hover:text-primary transition-colors font-medium text-lg"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/ayushwasnothere"
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground hover:text-primary transition-colors font-medium text-lg"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-muted-foreground text-sm font-semibold tracking-wider mb-4">GET IN TOUCH</h3>
            <a
              href="mailto:ayushwasnothere@gmail.com"
              className="text-foreground hover:text-primary transition-colors font-medium text-lg"
            >
              ayushwasnothere@gmail.com
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
