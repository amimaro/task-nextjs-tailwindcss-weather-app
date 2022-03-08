import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export const AppModal: React.FC<{ isOpen: boolean }> = ({
  isOpen,
  children,
}) => {
  const [container] = useState(() => {
    return document.createElement("div");
  });

  useEffect(() => {
    if (isOpen) {
      document.body.appendChild(container);
    } else {
      document.body.removeChild(container);
    }
  });

  const closeModal = (e: Event) => {
    e.stopPropagation();
    document.body.removeChild(container);
  };

  const Modal = (
    <div
      className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
      onClick={(e: any) => closeModal(e)}
    >
      <div className="fixed flex flex-col overflow-hidden bg-white rounded-lg">
        <button
          className="absolute top-2 right-2"
          onClick={(e: any) => closeModal(e)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="flex flex-col px-10 py-8 bg-white">{children}</div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(Modal, container);
};
