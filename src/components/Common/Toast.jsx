import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
  <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
    <div
      className={`px-4 py-2 rounded shadow text-white transition-all duration-300 ease-out
        ${toast.type === "success" ? "bg-green-600" : ""}
        ${toast.type === "error" ? "bg-red-600" : ""}
        ${toast.type === "info" ? "bg-blue-600" : ""}
      `}
    >
      {toast.message}
    </div>
  </div>
)}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
