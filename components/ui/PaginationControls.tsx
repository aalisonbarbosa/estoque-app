import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationControlsProps = {
  onPrev: () => void;
  onNext: () => void;
};

export const PaginationControls = ({
  onPrev,
  onNext,
}: PaginationControlsProps) => {
  return (
    <div className="flex justify-start gap-2">
      <button
        onClick={onPrev}
        className="p-2 border rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={onNext}
        className="p-2 border rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
