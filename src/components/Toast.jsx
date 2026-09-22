import { useApp } from '../context/AppContext';

export default function Toast() {
  const { toast } = useApp();
  if (!toast) return null;

  return (
    <div className={`toast ${toast.type === 'success' ? 'toast-success' : ''}`}>
      <span className="toast-icon">{toast.icon}</span>
      <div>
        <div className="toast-title">{toast.message}</div>
      </div>
    </div>
  );
}
