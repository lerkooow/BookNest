import { Star } from "lucide-react";

interface RatingProps {
  rating: number;
  setRating: (value: number) => void;
  hoverRating: number;
  setHoverRating: (value: number) => void;
}

export const Rating = ({
  rating,
  setRating,
  hoverRating,
  setHoverRating,
}: RatingProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
        Rating <span className="text-slate-400 font-normal">(optional)</span>
      </label>
      <div className="flex items-center gap-1 mt-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="p-0.5 focus:outline-none transition-transform hover:scale-110"
          >
            <Star
              className={`w-6 h-6 transition-colors ${
                star <= (hoverRating || rating)
                  ? "fill-amber-400 text-amber-400"
                  : "text-slate-200 fill-slate-50"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
