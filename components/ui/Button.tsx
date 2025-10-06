type ButtonProps = React.ComponentProps<"button"> & {
  label: string;
  customClass?: string;
};

export function Button({ label, customClass, ...props }: ButtonProps) {
  return (
    <button
      className={`p-2 border rounded-lg hover:bg-stone-100 transition-colors cursor-pointer ${customClass}`}
      {...props}
    >
      {label}
    </button>
  );
}
