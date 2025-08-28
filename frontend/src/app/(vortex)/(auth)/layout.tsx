import { Card, CardContent } from '@/components/ui/card';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="my-20 flex w-full flex-1 flex-col items-center gap-6">
      <article className="space-y-2 text-center">
        <h1 className="font-semibold text-xl">Selamat Datang</h1>
        <p className="text-muted-foreground">
          Silahkan Sign In untuk melanjutkan
        </p>
      </article>
      <Card className="w-full max-w-sm">
        <CardContent>{children}</CardContent>
      </Card>
    </main>
  );
}
