import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CategoryCardProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  onClick: () => void;
  icon?: React.ReactNode;
}

export function CategoryCard({ title, subtitle, imageUrl, onClick, icon }: CategoryCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-border bg-card group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {/* Background Image */}
      <ImageWithFallback
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      
      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="flex items-center gap-2 mb-1">
          {icon && <span className="text-accent">{icon}</span>}
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        {subtitle && (
          <p className="text-sm text-white/80">{subtitle}</p>
        )}
      </div>
      
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 ring-2 ring-primary rounded-2xl" />
      </div>
    </motion.button>
  );
}
