import { Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ReviewCardProps {
  userName: string;
  userAvatar?: string;
  rating: number;
  content: string;
  tags?: string[];
  images?: string[];
  date: string;
}

export function ReviewCard({
  userName,
  userAvatar,
  rating,
  content,
  tags = [],
  images = [],
  date,
}: ReviewCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      {/* User Info */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
          {userAvatar ? (
            <ImageWithFallback src={userAvatar} alt={userName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              {userName[0]}
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="font-medium">{userName}</div>
          <div className="text-sm text-muted-foreground">{date}</div>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? 'fill-accent text-accent' : 'text-muted'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <p className="mb-3 leading-relaxed">{content}</p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-muted text-accent px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Images */}
      {images.length > 0 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <div key={index} className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
              <ImageWithFallback
                src={image}
                alt={`리뷰 이미지 ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
