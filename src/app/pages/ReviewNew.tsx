import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Star, Upload } from 'lucide-react';
import { motion } from 'motion/react';

const tagOptions = [
  '#혼밥가능',
  '#웨이팅있음',
  '#뷰맛집',
  '#가성비',
  '#데이트',
  '#주차가능',
  '#분위기좋음',
  '#재방문의사100%',
];

export function ReviewNew() {
  const { spotId } = useParams<{ spotId: string }>();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit review logic here
    alert('리뷰가 작성되었습니다!');
    navigate(`/spot/${spotId}`);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen pt-16 pb-8">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold mb-2">리뷰 작성</h1>
          <p className="text-muted-foreground mb-8">
            방문하신 경험을 다른 분들과 공유해주세요
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Rating */}
            <div>
              <label className="block mb-4">
                <span className="font-medium">별점</span>
                <span className="text-destructive ml-1">*</span>
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-10 h-10 ${
                        star <= (hoverRating || rating)
                          ? 'fill-accent text-accent'
                          : 'text-muted'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block mb-4">
                <span className="font-medium">리뷰 내용</span>
                <span className="text-destructive ml-1">*</span>
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="맛, 서비스, 분위기 등 자유롭게 작성해주세요 (최소 10자)"
                rows={6}
                className="w-full bg-card border border-border rounded-xl p-4 outline-none focus:ring-2 focus:ring-primary resize-none"
                minLength={10}
                maxLength={500}
                required
              />
              <div className="text-sm text-muted-foreground mt-2">
                {content.length}/500
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block mb-4">
                <span className="font-medium">태그</span>
                <span className="text-muted-foreground text-sm ml-2">
                  (최대 5개)
                </span>
              </label>
              <div className="flex flex-wrap gap-2">
                {tagOptions.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    disabled={
                      !selectedTags.includes(tag) && selectedTags.length >= 5
                    }
                    className={`px-4 py-2 rounded-full border transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-primary border-primary text-white'
                        : 'bg-muted border-border hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Photos */}
            <div>
              <label className="block mb-4">
                <span className="font-medium">사진</span>
                <span className="text-muted-foreground text-sm ml-2">
                  (최대 3장, 선택사항)
                </span>
              </label>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-2">
                  클릭하여 사진을 업로드하세요
                </p>
                <p className="text-sm text-muted-foreground">
                  JPG, PNG (최대 5MB)
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate(`/spot/${spotId}`)}
                className="flex-1 bg-muted hover:bg-muted/80 text-foreground px-6 py-3 rounded-full transition-colors"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={!rating || content.length < 10}
                className="flex-1 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-full transition-colors"
              >
                리뷰 작성
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
