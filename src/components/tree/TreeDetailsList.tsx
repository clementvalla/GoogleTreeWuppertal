interface TreeDetailsListProps {
  family?: string;
  nativeCountry?: string;
  maxHeight?: number;
  maxAge?: number;
  className?: string;
}

function TreeDetailsList({ 
  family, 
  nativeCountry, 
  maxHeight, 
  maxAge, 
  className = '' 
}: TreeDetailsListProps) {
  const treeDetails = [
    { label: 'Familie', value: family },
    { label: 'Herkunft', value: nativeCountry },
    { label: 'Maximale Höhe', value: maxHeight ? `${maxHeight}m` : undefined },
    { label: 'Maximales Alter', value: maxAge ? `${maxAge} Jahre` : undefined }
  ].filter(detail => detail.value !== null && detail.value !== undefined && detail.value !== '');

  if (treeDetails.length === 0) return null;

  return (
    <div className={`grid grid-cols-2 gap-2 text-xs ${className}`}>
      {treeDetails.map(({ label, value }) => (
        <div key={label}>
          <dt className="text-gray-500">{label}</dt>
          <dd className="font-medium text-gray-900">{value}</dd>
        </div>
      ))}
    </div>
  );
}

export default TreeDetailsList;
