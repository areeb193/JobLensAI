interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let badgeColor = '';
  let badgeText = '';
  let textColor = '';

  if (score > 70) {
    badgeColor = 'bg-[var(--color-success)]/20';
    badgeText = 'Strong';
    textColor = 'text-[var(--color-success)]';
  } else if (score > 49) {
    badgeColor = 'bg-[var(--color-warning)]/20';
    badgeText = 'Good Start';
    textColor = 'text-[var(--color-warning)]';
  } else {
    badgeColor = 'bg-[var(--color-danger)]/20';
    badgeText = 'Needs Work';
    textColor = 'text-[var(--color-danger)]';
  }

  return (
    <div className={`score-badge ${badgeColor} ${textColor} shadow-sm`}> 
      <p className="text-sm font-semibold">{badgeText}</p>
    </div>
  );
};

export default ScoreBadge;
