import { useNavigate } from 'react-router';
import { Home } from 'lucide-react';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center">
      <div className="text-center px-4">
        <div className="text-9xl font-display font-bold text-primary mb-4">404</div>
        <h1 className="text-3xl font-bold mb-4">페이지를 찾을 수 없습니다</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full transition-colors"
        >
          <Home className="w-5 h-5" />
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}
