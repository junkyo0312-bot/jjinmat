import { useNavigate } from 'react-router';
import { SpotCard } from '../components/SpotCard';
import { motion } from 'motion/react';
import { Trophy, Star, TrendingUp } from 'lucide-react';

// Mock data - 실제로는 API에서 가져올 데이터
const topSpots = [
  {
    id: '1',
    name: '버거킹덤',
    category: '햄버거',
    address: '서울 강남구 압구정로 123',
    rating: 4.9,
    reviewCount: 287,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyJTIwcGxhdGluZ3xlbnwxfHx8fDE3NzUyMDAyOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '2',
    name: '돈까스 장인',
    category: '돈가스',
    address: '서울 송파구 올림픽로 456',
    rating: 4.8,
    reviewCount: 342,
    imageUrl: 'https://images.unsplash.com/photo-1631709497146-a6a0a6be5e92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXRzdSUyMGphcGFuZXNlfGVufDF8fHx8MTc3NTIwMDI5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '3',
    name: '빵집앤커피',
    category: '베이커리·카페',
    address: '서울 마포구 연남로 789',
    rating: 4.8,
    reviewCount: 421,
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBicmVhZCUyMGNhZmV8ZW58MXx8fHwxNzc1MjAwMjk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '4',
    name: '라멘 하우스',
    category: '라멘',
    address: '서울 용산구 이태원로 234',
    rating: 4.7,
    reviewCount: 198,
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW1lbiUyMGJvd2x8ZW58MXx8fHwxNzc1MjAwMjk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '5',
    name: '파스타 공방',
    category: '이탈리안',
    address: '서울 강남구 논현로 567',
    rating: 4.7,
    reviewCount: 275,
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGRpc2h8ZW58MXx8fHwxNzc1MjAwMjk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '6',
    name: '스시 다이닝',
    category: '일식',
    address: '서울 서초구 서초대로 890',
    rating: 4.6,
    reviewCount: 156,
    imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHBsYXR0ZXJ8ZW58MXx8fHwxNzc1MjAwMjk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '7',
    name: '타코 페스타',
    category: '멕시칸',
    address: '서울 중구 명동길 321',
    rating: 4.6,
    reviewCount: 213,
    imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWNvcyUyMG1leGljYW58ZW58MXx8fHwxNzc1MjAwMjk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '8',
    name: '바베큐 하우스',
    category: '고기·구이',
    address: '서울 광진구 능동로 654',
    rating: 4.5,
    reviewCount: 298,
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYmIlMjBncmlsbCUyMG1lYXR8ZW58MXx8fHwxNzc1MjAwMjk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '9',
    name: '디저트 가든',
    category: '디저트·카페',
    address: '서울 종로구 인사동길 147',
    rating: 4.5,
    reviewCount: 389,
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwcGxhdGV8ZW58MXx8fHwxNzc1MjAwMjk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '10',
    name: '브런치 클럽',
    category: '브런치',
    address: '서울 성동구 성수이로 258',
    rating: 4.4,
    reviewCount: 267,
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicnVuY2glMjBwbGF0ZXxlbnwxfHx8fDE3NzUyMDAyOTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

// 별점 그룹으로 나누기
const spotsByRating = {
  '4.8-5.0': topSpots.filter((spot) => spot.rating >= 4.8),
  '4.6-4.7': topSpots.filter((spot) => spot.rating >= 4.6 && spot.rating < 4.8),
  '4.4-4.5': topSpots.filter((spot) => spot.rating >= 4.4 && spot.rating < 4.6),
};

export function Curation() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              <span className="text-primary">검증된</span> 큐레이션
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              직접 방문하고 검증한 진짜 맛집만 소개합니다.
              <br />
              별점순으로 정렬된 찐맛집 TOP 랭킹을 확인하세요.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-8"
          >
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Star className="w-4 h-4 fill-accent text-accent" />
                <span className="text-2xl font-display font-bold">4.7+</span>
              </div>
              <p className="text-xs text-muted-foreground">평균 별점</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-2xl font-display font-bold">{topSpots.length}</span>
              </div>
              <p className="text-xs text-muted-foreground">검증된 스팟</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-2xl font-display font-bold">
                  {topSpots.reduce((sum, spot) => sum + spot.reviewCount, 0)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">총 리뷰 수</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rankings by Rating */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        {/* 4.8-5.0 Stars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-1 bg-gradient-to-r from-primary to-accent px-4 py-2 rounded-xl">
              <Star className="w-5 h-5 fill-white text-white" />
              <span className="font-display font-bold text-white">4.8 - 5.0</span>
            </div>
            <h2 className="text-2xl font-bold">최고 등급</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spotsByRating['4.8-5.0'].map((spot, index) => (
              <motion.div
                key={spot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="relative"
              >
                {index < 3 && (
                  <div className="absolute -top-3 -left-3 z-10 w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-lg font-display font-bold text-white">
                      {index + 1}
                    </span>
                  </div>
                )}
                <SpotCard
                  name={spot.name}
                  category={spot.category}
                  address={spot.address}
                  rating={spot.rating}
                  reviewCount={spot.reviewCount}
                  imageUrl={spot.imageUrl}
                  onClick={() => navigate(`/spot/${spot.id}`)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 4.6-4.7 Stars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-1 bg-primary/20 border border-primary px-4 py-2 rounded-xl">
              <Star className="w-5 h-5 fill-primary text-primary" />
              <span className="font-display font-bold text-primary">4.6 - 4.7</span>
            </div>
            <h2 className="text-2xl font-bold">고급 등급</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spotsByRating['4.6-4.7'].map((spot, index) => (
              <motion.div
                key={spot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              >
                <SpotCard
                  name={spot.name}
                  category={spot.category}
                  address={spot.address}
                  rating={spot.rating}
                  reviewCount={spot.reviewCount}
                  imageUrl={spot.imageUrl}
                  onClick={() => navigate(`/spot/${spot.id}`)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 4.4-4.5 Stars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-1 bg-muted border border-border px-4 py-2 rounded-xl">
              <Star className="w-5 h-5 fill-muted-foreground text-muted-foreground" />
              <span className="font-display font-bold">4.4 - 4.5</span>
            </div>
            <h2 className="text-2xl font-bold">우수 등급</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spotsByRating['4.4-4.5'].map((spot, index) => (
              <motion.div
                key={spot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              >
                <SpotCard
                  name={spot.name}
                  category={spot.category}
                  address={spot.address}
                  rating={spot.rating}
                  reviewCount={spot.reviewCount}
                  imageUrl={spot.imageUrl}
                  onClick={() => navigate(`/spot/${spot.id}`)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
