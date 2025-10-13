import React from "react";

type ModalProps = {
  children: React.ReactNode;
};

export const Modal = ({children}: ModalProps) => {
  return (
    <>
      <div className="absolute inset-0 bg-black/50 z-10 h-full" />
      <div className="absolute top-1/2 left-1/2 w-96 p-4 space-y-4 bg-white rounded-xl z-20 transform -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>
    </>
  );
};
