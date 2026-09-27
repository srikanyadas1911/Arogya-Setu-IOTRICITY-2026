import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  addToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const remove = (id: string) => setToasts(prev => prev.filter(t => t.id !== id));

  const iconMap: Record<ToastType, ReactNode> = {
    success: <CheckCircle size={18} color="var(--secondary)" />,
    error: <AlertCircle size={18} color="var(--danger)" />,
    warning: <AlertCircle size={18} color="var(--warning)" />,
    info: <Info size={18} color="var(--primary)" />,
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.type}`}>
            {iconMap[t.type]}
            <span className="toast-message">{t.message}</span>
            <button
              onClick={() => remove(t.id)}
              style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-400)', display: 'flex' }}
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
