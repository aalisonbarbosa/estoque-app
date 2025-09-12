type Props = {
  onToggle: () => void;
};

export const CreateProductModal = ({ onToggle }: Props) => {
  return (
    <>
      <div className="absolute inset-0 bg-black/50 z-10" onClick={onToggle} />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white rounded-xl z-20 transform -translate-x-1/2 -translate-y-1/2"></div>
    </>
  );
};
