import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { MapPin, Star, Phone, Clock, Share2 } from 'lucide-react';
import { ReviewCard } from '../components/ReviewCard';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion } from 'motion/react';

// Mock data
const mockSpot = {
  id: '1',
  name: '더 버거 하우스',
  category: '햄버거',
  address: '서울 강남구 테헤란로 123',
  phone: '02-1234-5678',
  hours: '11:00 - 22:00',
  rating: 4.8,
  reviewCount: 342,
  imageUrl: 'https://images.unsplash.com/photo-1627378378955-a3f4e406c5de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyJTIwZm9vZHxlbnwxfHx8fDE3NzUwOTU5OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  description: '미국식 스매시 버거의 정석을 보여주는 곳. 신선한 재료와 완벽한 화력 조절로 육즙이 터지는 패티를 만들어냅니다.',
  tags: ['#스매시버거', '#웨이팅있음', '#주차가능', '#데이트'],
};

const mockReviews = [
  {
    id: '1',
    userName: '김지원',
    rating: 5,
    content: '진짜 맛있어요! 패티가 육즙이 넘치고 빵도 신선해요. 웨이팅이 있지만 기다릴 가치가 있습니다.',
    tags: ['#완전맛있음', '#재방문의사100%'],
    date: '2026-04-01',
  },
  {
    id: '2',
    userName: '박세훈',
    rating: 4,
    content: '스매시 버거 좋아하시는 분들에게 강추! 가격대가 조금 있지만 퀄리티를 생각하면 적당해요.',
    tags: ['#가성비굿', '#웨이팅있음'],
    date: '2026-03-28',
  },
  {
    id: '3',
    userName: '이서연',
    rating: 5,
    content: '분위기도 좋고 직원분들도 친절하세요. 주차도 편해서 가족 모임으로도 좋을 것 같아요.',
    tags: ['#분위기좋음', '#주차편함'],
    date: '2026-03-25',
  },
];

export function SpotDetail() {
  const { spotId } = useParams<{ spotId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'info' | 'reviews'>('info');

  return (
    <div className="min-h-screen pt-16 pb-8">
      {/* Hero Image */}
      <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
        <ImageWithFallback
          src={mockSpot.imageUrl}
          alt={mockSpot.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Share Button */}
        <button
          className="absolute top-4 right-4 p-3 bg-black/40 backdrop-blur-sm rounded-full hover:bg-black/60 transition-colors"
          aria-label="공유하기"
        >
          <Share2 className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{mockSpot.name}</h1>
              <p className="text-muted-foreground">{mockSpot.category}</p>
            </div>
            <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2">
              <Star className="w-5 h-5 fill-accent text-accent" />
              <span className="text-xl font-display font-bold">{mockSpot.rating}</span>
              <span className="text-muted-foreground">({mockSpot.reviewCount})</span>
            </div>
          </div>

          <p className="text-foreground/90 mb-4">{mockSpot.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {mockSpot.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-muted text-accent px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Contact Info */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl">
              <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium mb-1">주소</div>
                <div className="text-sm text-muted-foreground">{mockSpot.address}</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl">
              <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium mb-1">전화</div>
                <div className="text-sm text-muted-foreground">{mockSpot.phone}</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl">
              <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium mb-1">영업시간</div>
                <div className="text-sm text-muted-foreground">{mockSpot.hours}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border mb-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('info')}
              className={`pb-4 relative ${
                activeTab === 'info' ? 'text-primary font-bold' : 'text-muted-foreground'
              }`}
            >
              정보
              {activeTab === 'info' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 relative ${
                activeTab === 'reviews' ? 'text-primary font-bold' : 'text-muted-foreground'
              }`}
            >
              리뷰 ({mockSpot.reviewCount})
              {activeTab === 'reviews' && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'info' && (
          <div className="space-y-6">
            {/* Map Placeholder */}
            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">지도가 여기에 표시됩니다</p>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">리뷰 {mockSpot.reviewCount}개</h2>
              </div>
              <button
                onClick={() => navigate(`/spot/${spotId}/review/new`)}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full transition-colors"
              >
                리뷰 작성
              </button>
            </div>

            {mockReviews.map((review) => (
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
      </div>
    </div>
  );
}
