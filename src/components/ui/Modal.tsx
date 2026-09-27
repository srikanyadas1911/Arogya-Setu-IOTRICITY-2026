import { type ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export default function Modal({ title, onClose, children, footer, size = 'md' }: ModalProps) {
  const maxWidths = { sm: '400px', md: '560px', lg: '720px' };

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" style={{ maxWidth: maxWidths[size] }}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}
