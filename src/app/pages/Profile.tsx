import { useState } from 'react';
import { User, Heart, MessageSquare, Settings } from 'lucide-react';
import { ReviewCard } from '../components/ReviewCard';
import { SpotCard } from '../components/SpotCard';
import { motion } from 'motion/react';

// Mock data
const mockUser = {
  name: '김지원',
  email: 'jiwon@example.com',
  reviewCount: 12,
  savedCount: 8,
};

const mockUserReviews = [
  {
    id: '1',
    userName: '김지원',
    rating: 5,
    content: '진짜 맛있어요! 패티가 육즙이 넘치고 빵도 신선해요.',
    tags: ['#완전맛있음', '#재방문의사100%'],
    date: '2026-04-01',
  },
  {
    id: '2',
    userName: '김지원',
    rating: 4,
    content: '분위기 좋고 맛도 훌륭합니다. 다만 웨이팅이 좀 길어요.',
    tags: ['#분위기좋음', '#웨이팅있음'],
    date: '2026-03-28',
  },
];

const mockSavedSpots = [
  {
    id: '1',
    name: '더 버거 하우스',
    category: '햄버거',
    address: '서울 강남구 테헤란로 123',
    rating: 4.8,
    reviewCount: 342,
    imageUrl: 'https://images.unsplash.com/photo-1627378378955-a3f4e406c5de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyJTIwZm9vZHxlbnwxfHx8fDE3NzUwOTU5OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function Profile() {
  const [activeTab, setActiveTab] = useState<'reviews' | 'saved'>('reviews');

  return (
    <div className="min-h-screen pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-card border border-border rounded-2xl p-8 mb-8"
        >
          <div className="flex items-start gap-6 mb-6">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{mockUser.name}</h1>
              <p className="text-muted-foreground mb-4">{mockUser.email}</p>
              <div className="flex gap-6">
                <div>
                  <div className="text-2xl font-display font-bold text-primary">
                    {mockUser.reviewCount}
                  </div>
                  <div className="text-sm text-muted-foreground">리뷰</div>
                </div>
                <div>
                  <div className="text-2xl font-display font-bold text-primary">
                    {mockUser.savedCount}
                  </div>
                  <div className="text-sm text-muted-foreground">저장</div>
                </div>
              </div>
            </div>
            <button
              className="p-3 bg-muted hover:bg-muted/80 rounded-full transition-colors"
              aria-label="설정"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {/* Login/Social Buttons */}
          <div className="flex gap-4">
            <button className="flex-1 bg-[#FEE500] hover:bg-[#FEE500]/90 text-[#000000] px-6 py-3 rounded-full font-medium transition-colors">
              카카오로 로그인
            </button>
            <button className="flex-1 bg-white hover:bg-white/90 text-[#000000] px-6 py-3 rounded-full font-medium transition-colors border border-border">
              구글로 로그인
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="border-b border-border mb-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 relative flex items-center gap-2 ${
                activeTab === 'reviews'
                  ? 'text-primary font-bold'
                  : 'text-muted-foreground'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              내 리뷰
              {activeTab === 'reviews' && (
                <motion.div
                  layoutId="activeTabProfile"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`pb-4 relative flex items-center gap-2 ${
                activeTab === 'saved'
                  ? 'text-primary font-bold'
                  : 'text-muted-foreground'
              }`}
            >
              <Heart className="w-5 h-5" />
              저장한 맛집
              {activeTab === 'saved' && (
                <motion.div
                  layoutId="activeTabProfile"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">
              내가 작성한 리뷰 {mockUser.reviewCount}개
            </h2>
            {mockUserReviews.map((review) => (
              <ReviewCard
                key={review.id}
                userName={review.userName}
                rating={review.rating}
                content={review.content}
                tags={review.tags}
                date={review.date}
              />
            ))}
          </div>
        )}

        {activeTab === 'saved' && (
          <div>
            <h2 className="text-xl font-bold mb-4">
              저장한 맛집 {mockUser.savedCount}개
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockSavedSpots.map((spot) => (
                <SpotCard
                  key={spot.id}
                  name={spot.name}
                  category={spot.category}
                  address={spot.address}
                  rating={spot.rating}
                  reviewCount={spot.reviewCount}
                  imageUrl={spot.imageUrl}
                  onClick={() => {
                    window.location.href = `/spot/${spot.id}`;
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
