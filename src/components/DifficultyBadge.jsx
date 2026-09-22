export default function DifficultyBadge({ difficulty }) {
  const cls = difficulty === 'Easy' ? 'badge-easy' : difficulty === 'Medium' ? 'badge-medium' : 'badge-hard';
  return <span className={`badge ${cls}`}>{difficulty}</span>;
}
