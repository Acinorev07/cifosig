// src/components/ui/Form/FormActions.tsx

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function FormActions({
  children,
}: Props) {
  return (
    <div className="flex justify-around bg-[--earth-900] gap-4 pt-1">
      {children}
    </div>
  );
}