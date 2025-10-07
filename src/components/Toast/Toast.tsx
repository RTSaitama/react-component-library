import React, { useState } from 'react';
import Button from './Button';
import './Toast.css';

type ToastType = 'success' | 'danger' | 'info' | 'warning';

type ToastMessage = {
  id: number;
  type: ToastType;
  message: string;
  visible: boolean;
  duration?: number;
  closable?: boolean;
};

export const ToastContainer = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [idCounter, setIdCounter] = useState(0);

  const showToast = (
    type: ToastType,
    message: string,
    duration = 3000,
    closable = false
  ) => {
    const id = idCounter + 1;
    setIdCounter(id);

    const newToast: ToastMessage = { id, type, message, visible: true, duration, closable };
    setToasts([...toasts, newToast]);

    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, visible: false } : t))
      );
    }, duration - 300);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  const closeToast = (id: number) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, visible: false } : t)));
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 300);
  };

  return (
    <div>
      <div className="toast-buttons">
        <Button name="Success" onClick={() => showToast('success', 'Success!', 3000)} />
        <Button name="Danger" onClick={() => showToast('danger', 'Danger!', 3000)} />
        <Button name="Info" onClick={() => showToast('info', 'Info!', 3000)} />
        <Button name="Warning" onClick={() => showToast('warning', 'Warning!', 3000)} />
        <Button name="Manual" onClick={() => showToast('info', 'Closable toast', 5000, true)} />
          
      </div>

      <div className="toast-wrapper bottom-right">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`toast ${t.type} ${t.visible ? 'visible' : 'hidden'}`}
          >
            {t.message}
            {t.closable && (
              <button className="toast-close" onClick={() => closeToast(t.id)}>
                ×
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
