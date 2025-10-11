import { useState } from "react";

type PopupType = "success" | "error";

export function usePopup() {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupType, setPopupType] = useState<PopupType>("success");

    function notifyPopup(message: string, type:PopupType = "success") {
        setIsPopupVisible(true);

        setPopupMessage(message);
        setPopupType(type);

        setTimeout(() => {
            setIsPopupVisible(false);
        }, 10000);
    }

    return {
        isPopupVisible,
        popupMessage,
        popupType,
        notifyPopup
    }
}