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
        className="bg-stone-500 hover:bg-stone-600 duration-300 p-2 cursor-pointer rounded-md text-white"
        onClick={onPrev}
      >
        Anterior
      </button>
      <button
        className="bg-stone-500 hover:bg-stone-600 duration-300 p-2 cursor-pointer rounded-md text-white"
        onClick={onNext}
      >
        Próximo
      </button>
    </div>
  );
};
