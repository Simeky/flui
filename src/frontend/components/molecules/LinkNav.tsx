import Link from "next/link";

interface LinkNavProps {
  href: string;
  children: React.ReactNode;
  externo?: boolean;
}

export function LinkNav({ href, children, externo = false }: LinkNavProps) {
  const classes =
    "text-sm font-medium text-zinc-600 transition-colors hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400";

  if (externo) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
