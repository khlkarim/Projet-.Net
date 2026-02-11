export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`
      flex min-h-screen w-full items-center justify-center bg-gradient-to-br
      from-indigo-50/50 via-white to-sky-50/50 px-4 py-12
      dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950
    `}>
      <div className="mx-auto w-full max-w-6xl">
        {children}
      </div>
    </div>
  );
}
