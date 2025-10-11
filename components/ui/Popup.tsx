interface Props {
  isPopupVisible: boolean;
  type: "success" | "error";
  message: string;
}

export const Popup = ({ isPopupVisible, type, message }: Props) => {
  return (
    <div
      className={`border-2 ${
        type === "success" ? "border-green-500 text-green-500" : "border-red-500 text-red-500"
      } p-2 text-center rounded-md absolute left-1/2 bottom-4 transform -translate-x-1/2 transition-opacity duration-500 min-w-40 ${
        isPopupVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {message}
    </div>
  );
};
