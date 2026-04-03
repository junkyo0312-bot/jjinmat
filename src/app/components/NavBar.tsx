import { ArrowLeft, Search, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';

export function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {!isHome && (
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="뒤로가기"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={() => navigate('/')}
            className="text-2xl font-extrabold tracking-tight"
          >
            <span className="text-primary">찐</span>맛집
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="검색"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate('/profile')}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="프로필"
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
