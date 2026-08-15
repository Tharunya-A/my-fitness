import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showError = useCallback((messages) => {
    // Accepts either a single string or an array of error strings
    const list = Array.isArray(messages) ? messages : [messages];
    const id = Date.now();

    setToasts((prev) => [...prev, { id, messages: list }]);

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  return (
    <ToastContext.Provider value={{ showError }}>
      {children}
      {/* Toast Notification Container */}
      <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999 }}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            style={{
              background: '#ff4d4f',
              color: '#fff',
              padding: '12px 16px',
              borderRadius: '6px',
              marginBottom: '10px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
          >
            {toast.messages.map((msg, idx) => (
              <div key={idx} style={{ fontSize: '14px' }}>
                • {msg}
              </div>
            ))}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);