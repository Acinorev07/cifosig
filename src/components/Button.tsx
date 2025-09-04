"use client";

import Link from "next/link";
import React from "react";

const colors = {
  green: "bg-green-500/40 ",
  black: "bg-black text-white",
  blue: "bg-blue-500 text-white",
  white: "bg-white text-black",
};

const paddings = {
  none: "p-0",
  sm: "px-2 py-1.5",
  md: "px-4 py-2",
  lg: "px-6 py-3",
};

type ButtonProps = {
  padding?: keyof typeof paddings;
  color: keyof typeof colors;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
};

const Button = ({
  padding = "none",
  color,
  children,
  href,
  onClick,
}: ButtonProps) => {
  const classes = `${colors[color]} rounded-full ${paddings[padding]} font-sans text-sm/6 font-medium shadow`;

  // 🔹 Caso 1: Link interno (/ruta)
  if (href && href.startsWith("/")) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  // 🔹 Caso 2: Link externo (https://...)
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  // 🔹 Caso 3: Botón normal
  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

export default Button;
