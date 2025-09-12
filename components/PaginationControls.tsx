type PaginationControlsProps = {
  onPrev: () => void;
  onNext: () => void;
};

export const PaginationControls = ({
  onPrev,
  onNext,
}: PaginationControlsProps) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <button
        className="bg-stone-400 p-2 cursor-pointer rounded-md text-white"
        onClick={onPrev}
      >
        Anterior
      </button>
      <button
        className="bg-stone-400 p-2 cursor-pointer rounded-md text-white"
        onClick={onNext}
      >
        Próximo
      </button>
    </div>
  );
};
