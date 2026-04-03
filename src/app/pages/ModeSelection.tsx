import { useNavigate, useParams } from 'react-router';
import { CategoryCard } from '../components/CategoryCard';
import { motion } from 'motion/react';

const foodCategories = [
  {
    id: 'burger',
    title: '햄버거',
    subtitle: '육즙 터지는 패티의 향연',
    imageUrl: 'https://images.unsplash.com/photo-1627378378955-a3f4e406c5de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyJTIwZm9vZHxlbnwxfHx8fDE3NzUwOTU5OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'donkatsu',
    title: '돈가스',
    subtitle: '바삭하고 부드러운 일본식 돈가스',
    imageUrl: 'https://images.unsplash.com/photo-1770904984245-afbfaf46307d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0b25rYXRzdSUyMGZvb2R8ZW58MXx8fHwxNzc1MjAwMjk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'bread',
    title: '빵',
    subtitle: '갓 구운 장인의 베이커리',
    imageUrl: 'https://images.unsplash.com/photo-1627308593341-d886acdc06a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwYnJlYWQlMjBiYWtlcnl8ZW58MXx8fHwxNzc1MjAwMjk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'dessert_cafe',
    title: '디저트·카페',
    subtitle: '달콤한 행복이 있는 곳',
    imageUrl: 'https://images.unsplash.com/photo-1602526638273-1c16532650ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwY2FmZSUyMGFlc3RoZXRpY3xlbnwxfHx8fDE3NzUyMDAyOTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

const regionCategories = [
  {
    id: 'seoul',
    title: '서울',
    subtitle: '대한민국 맛집의 중심',
    imageUrl: 'https://images.unsplash.com/photo-1682090369590-c4c82f3cc065?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW91bCUyMGNpdHklMjBuaWdodHxlbnwxfHx8fDE3NzUyMDAyOTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'metropolitan',
    title: '수도권',
    subtitle: '경기·인천 숨은 맛집',
    imageUrl: 'https://images.unsplash.com/photo-1657593088889-5105c637f2a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3IlMjBkYXJrfGVufDF8fHx8MTc3NTIwMDI5NXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'gangwon_chungcheong',
    title: '강원·충청',
    subtitle: '자연이 키운 맛',
    imageUrl: 'https://images.unsplash.com/photo-1627378378955-a3f4e406c5de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyJTIwZm9vZHxlbnwxfHx8fDE3NzUwOTU5OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'gyeongsang_jeolla',
    title: '경상·전라',
    subtitle: '진정한 향토 맛집',
    imageUrl: 'https://images.unsplash.com/photo-1770904984245-afbfaf46307d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjB0b25rYXRzdSUyMGZvb2R8ZW58MXx8fHwxNzc1MjAwMjk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'jeju',
    title: '제주',
    subtitle: '섬의 신선한 맛',
    imageUrl: 'https://images.unsplash.com/photo-1602526638273-1c16532650ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNzZXJ0JTIwY2FmZSUyMGFlc3RoZXRpY3xlbnwxfHx8fDE3NzUyMDAyOTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function ModeSelection() {
  const { mode } = useParams<{ mode: 'food' | 'region' }>();
  const navigate = useNavigate();

  const categories = mode === 'food' ? foodCategories : regionCategories;
  const title = mode === 'food' ? '어떤 음식을 찾으세요?' : '어느 지역을 탐색할까요?';

  return (
    <div className="min-h-screen pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
          <p className="text-muted-foreground mb-8">
            카테고리를 선택하면 AI가 맞춤 맛집을 추천해드려요
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <CategoryCard
                  title={category.title}
                  subtitle={category.subtitle}
                  imageUrl={category.imageUrl}
                  onClick={() => navigate(`/explore/${mode}/${category.id}`)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
