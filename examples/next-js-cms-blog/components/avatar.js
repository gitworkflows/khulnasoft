import KhulnasoftImage from './khulnasoft-image';

export default function Avatar({ name, picture }) {
  return (
    <div className="flex items-center">
      <div className="relative w-12 h-12 mr-4">
        <KhulnasoftImage src={picture} layout="fill" className="rounded-full" alt={name} />
      </div>
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
}
