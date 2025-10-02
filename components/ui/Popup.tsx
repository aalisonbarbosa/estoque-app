interface Props {
  isPopupVisible: boolean;
  type: "sucess" | "error";
  message: string;
}

export const Popup = ({ isPopupVisible, type, message }: Props) => {
  return (
    <div
      className={`${
        type === "sucess" ? "bg-green-400 w-40" : "bg-red-500"
      } p-2 text-center rounded-md absolute left-1/2 bottom-4 transform -translate-x-1/2 transition-opacity duration-500 ${
        isPopupVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {message}
    </div>
  );
};
