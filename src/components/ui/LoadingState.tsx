export default function LoadingState({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="loading-state" style={{ flexDirection: 'column', gap: '16px' }}>
      <div className="spinner" />
      <p style={{ color: 'var(--gray-500)', fontSize: '14px' }}>{text}</p>
    </div>
  );
}
