import { useNavigate } from 'react-router';
import { CategoryCard } from '../components/CategoryCard';
import { Utensils, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
              <span className="text-primary">엄선된</span> 맛집만
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              AI가 추천하는 검증된 스팟. 오늘 뭐 먹지? 지금 바로 물어봐.
            </p>
          </motion.div>

          {/* Mode Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">어떻게 찾을까요?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <CategoryCard
                title="음식별로 찾기"
                subtitle="햄버거, 돈가스, 빵, 디저트·카페"
                imageUrl="https://images.unsplash.com/photo-1627378378955-a3f4e406c5de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyJTIwZm9vZHxlbnwxfHx8fDE3NzUwOTU5OTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                onClick={() => navigate('/mode/food')}
                icon={<Utensils className="w-5 h-5" />}
              />
              <CategoryCard
                title="지역별로 찾기"
                subtitle="서울, 수도권, 강원·충청, 경상·전라, 제주"
                imageUrl="https://images.unsplash.com/photo-1682090369590-c4c82f3cc065?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW91bCUyMGNpdHklMjBuaWdodHxlbnwxfHx8fDE3NzUyMDAyOTV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                onClick={() => navigate('/mode/region')}
                icon={<MapPin className="w-5 h-5" />}
              />
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 mt-16"
          >
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="font-bold mb-2">AI 맞춤 추천</h3>
              <p className="text-sm text-muted-foreground">
                위치와 취향 기반으로 완벽한 맛집을 찾아드려요
              </p>
            </div>
            <button
              onClick={() => navigate('/curation')}
              className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-all hover:scale-[1.02] group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">검증된 큐레이션</h3>
              <p className="text-sm text-muted-foreground">
                직접 방문하고 검증한 진짜 맛집만 소개해요
              </p>
            </button>
            <button
              onClick={() => navigate('/reviews')}
              className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/50 transition-all hover:scale-[1.02] group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">실시간 리뷰</h3>
              <p className="text-sm text-muted-foreground">
                다른 유저들의 생생한 리뷰를 확인하세요
              </p>
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}