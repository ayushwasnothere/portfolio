import { Link, type LinkProps } from 'react-router-dom';

export default function TransitionLink({ to, children, className = '', onClick, ...props }: LinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only record scroll if we are on home page clicking away to a project or subpage
    if (window.location.pathname === '/') {
      const currentScrollY = window.lastRecordedScrollY ?? window.scrollY;
      sessionStorage.setItem('portfolio_project_scroll_y', String(currentScrollY));
      sessionStorage.setItem('portfolio_is_navigating', 'true');
    }
    if (onClick) onClick(e);
  };

  return (
    <Link to={to} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
}
