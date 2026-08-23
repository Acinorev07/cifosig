// src/components/ui/Form/FormTitle.tsx

type Props = {
  title: string;
  subtitle?: string;
};

export default function FormTitle({
  title,
  subtitle,
}: Props) {
  return (
    <div className="text-center space-y-2">
      <h2 className="text-3xl font-bold text-[--violet-800]">
        {title}
      </h2>

      {subtitle && (
        <p className="text-[--violet-600]">
          {subtitle}
        </p>
      )}
    </div>
  );
}