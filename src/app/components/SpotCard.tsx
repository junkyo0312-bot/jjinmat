import { MapPin, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SpotCardProps {
  name: string;
  category: string;
  address: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  distance?: string;
  onClick: () => void;
}

export function SpotCard({
  name,
  category,
  address,
  rating,
  reviewCount,
  imageUrl,
  distance,
  onClick,
}: SpotCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className="w-full bg-card border border-border rounded-2xl overflow-hidden text-left group hover:border-primary/50 transition-colors"
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <ImageWithFallback
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {distance && (
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full">
            <span className="font-display">{distance}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1">
            <h3 className="font-bold mb-1">{name}</h3>
            <p className="text-sm text-muted-foreground">{category}</p>
          </div>
          <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-lg">
            <Star className="w-4 h-4 fill-accent text-accent" />
            <span className="font-display">{rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span className="line-clamp-1">{address}</span>
        </div>

        <div className="mt-2 text-sm text-muted-foreground">
          리뷰 <span className="font-display">{reviewCount}</span>개
        </div>
      </div>
    </motion.button>
  );
}
