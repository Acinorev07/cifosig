// src/components/ui/Form/Form.tsx

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  className?: string;
};

export default function UiForm({
  children,
  onSubmit,
  className = "",
}: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className={`
        w-full max-w-2xl
        bg-[var(--violet-400)]
        rounded-3xl
        shadow-2xl
        p-8
        space-y-6
        ${className}
      `}
    >
      {children}
    </form>
  );
}