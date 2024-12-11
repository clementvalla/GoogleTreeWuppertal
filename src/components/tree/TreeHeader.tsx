interface TreeHeaderProps {
  name: string;
  latinName: string;
}

function TreeHeader({ name, latinName }: TreeHeaderProps) {
  return (
    <div>
      <h3 className="text-base font-bold mb-0.5">{name}</h3>
      <p className="text-sm text-gray-900">{name}</p>
      <p className="text-sm text-gray-600 italic">{latinName}</p>
    </div>
  );
}

export default TreeHeader;
