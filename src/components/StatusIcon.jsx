import { useApp } from '../context/AppContext';
import { CheckCircle2, Circle, MinusCircle } from 'lucide-react';

export default function StatusIcon({ problemId }) {
  const { getStatus } = useApp();
  const status = getStatus(problemId);
  if (status === 'solved') return (
    <span className="problem-status-icon solved">
      <CheckCircle2 size={16} />
    </span>
  );
  if (status === 'attempted') return (
    <span className="problem-status-icon attempted">
      <MinusCircle size={16} />
    </span>
  );
  return <span className="problem-status-icon unsolved"><Circle size={16} /></span>;
}
