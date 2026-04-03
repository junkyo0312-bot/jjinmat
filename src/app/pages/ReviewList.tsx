import { ReviewCard } from '../components/ReviewCard';

const MOCK_REVIEWS = [
  {
    userName: '김맛집',
    rating: 5,
    content: '줄 서서 먹은 보람이 있었어요. 재방문의사 100%입니다!',
    tags: ['재방문 의사 있음', '친절한 서비스', '가성비 굿'],
    images: [
      'https://images.unsplash.com/photo-1550507992-eb63ffee0847?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1604908176997-1251884b08a2?auto=format&fit=crop&w=400&q=80',
    ],
    date: '방금 전',
  },
  {
    userName: '맛탐험가',
    rating: 4,
    content: '전체적으로 맛있었고 분위기도 좋아요. 다만 웨이팅이 조금 길었어요.',
    tags: ['웨이팅 있음', '분위기 좋은', '단체 모임'],
    images: [],
    date: '1시간 전',
  },
  {
    userName: '한끼요정',
    rating: 5,
    content: '점심 타임에 가볍게 먹기 딱 좋아요. 메뉴 구성이 알차요.',
    tags: ['점심 추천', '혼밥 가능'],
    images: [],
    date: '어제',
  },
] as const;

export function ReviewList() {
  return (
    <div className="min-h-screen pt-16">
      <section className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="text-2xl font-bold mb-1">실시간 리뷰</h1>
          <p className="text-sm text-muted-foreground">
            지금 막 등록된 생생한 리뷰들을 한눈에 모아봤어요.
          </p>
        </header>

        <div className="space-y-4">
          {MOCK_REVIEWS.map((review, index) => (
            <ReviewCard
              key={index}
              userName={review.userName}
              rating={review.rating}
              content={review.content}
              tags={review.tags}
              images={review.images}
              date={review.date}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

