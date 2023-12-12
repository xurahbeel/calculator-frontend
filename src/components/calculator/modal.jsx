import React from "react";

function Modal({ isOpen, onClose, name, children }) {
  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white p-6 rounded-lg z-10">
          <h2 className="text-2xl font-bold mb-4 text-black">{name}</h2>
          {children}
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
