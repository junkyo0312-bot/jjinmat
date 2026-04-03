import { useState } from 'react';
import { useParams } from 'react-router';
import { ChatInput } from '../components/ChatInput';
import { SpotCard } from '../components/SpotCard';
import { Bot } from 'lucide-react';
import { motion } from 'motion/react';

// Mock data
const mockSpots = [
  {
    id: '1',
    name: '더 버거 하우스',
    category: '햄버거',
    address: '서울 강남구 테헤란로 123',
    rating: 4.8,
    reviewCount: 342,
    imageUrl: 'https://images.unsplash.com/photo-1627378378955-a3f4e406c5de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyJTIwZm9vZHxlbnwxfHx8fDE3NzUwOTU5OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    distance: '1.2km',
  },
  {
    id: '2',
    name: '스매시 앤 그릴',
    category: '햄버거',
    address: '서울 강남구 역삼동 456',
    rating: 4.6,
    reviewCount: 189,
    imageUrl: 'https://images.unsplash.com/photo-1627378378955-a3f4e406c5de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyJTIwZm9vZHxlbnwxfHx8fDE3NzUwOTU5OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    distance: '2.5km',
  },
  {
    id: '3',
    name: '프리미엄 버거 클럽',
    category: '햄버거',
    address: '서울 서초구 서초대로 789',
    rating: 4.9,
    reviewCount: 521,
    imageUrl: 'https://images.unsplash.com/photo-1627378378955-a3f4e406c5de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyJTIwZm9vZHxlbnwxfHx8fDE3NzUwOTU5OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    distance: '3.1km',
  },
];

export function Explore() {
  const { mode, category } = useParams<{ mode: string; category: string }>();
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const categoryNames: Record<string, string> = {
    burger: '햄버거',
    donkatsu: '돈가스',
    bread: '빵',
    dessert_cafe: '디저트·카페',
    seoul: '서울',
    metropolitan: '수도권',
    gangwon_chungcheong: '강원·충청',
    gyeongsang_jeolla: '경상·전라',
    jeju: '제주',
  };

  const handleSendMessage = async (message: string) => {
    setMessages((prev) => [...prev, { role: 'user', content: message }]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = `${categoryNames[category || '']} 카테고리에서 "${message}"에 대한 추천을 준비했어요! 위치 기반으로 가까운 맛집 3곳을 찾았습니다. 각 스팟의 리뷰와 평점을 확인해보세요.`;
      setMessages((prev) => [...prev, { role: 'assistant', content: aiResponse }]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-16 pb-32">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {categoryNames[category || '']} 맛집
          </h1>
          <p className="text-muted-foreground">
            AI 챗봇에게 원하는 맛집을 물어보세요
          </p>
        </div>

        {/* Chat Messages */}
        {messages.length > 0 && (
          <div className="mb-8 space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-card border border-border'
                  }`}
                >
                  {message.content}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3 justify-start"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-card border border-border rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-75" />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-150" />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Spots Grid */}
        <div>
          <h2 className="text-xl font-bold mb-4">추천 맛집</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockSpots.map((spot, index) => (
              <motion.div
                key={spot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <SpotCard
                  name={spot.name}
                  category={spot.category}
                  address={spot.address}
                  rating={spot.rating}
                  reviewCount={spot.reviewCount}
                  imageUrl={spot.imageUrl}
                  distance={spot.distance}
                  onClick={() => {
                    // Navigate to spot detail
                    window.location.href = `/spot/${spot.id}`;
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Input */}
      <ChatInput onSend={handleSendMessage} disabled={isLoading} />
    </div>
  );
}
