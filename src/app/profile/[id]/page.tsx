import AppNavBar from "@/components/ui/navbar/app-navbar";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = await params;
  const numericId = Number(id);
  return (
    <main className="flex flex-col gap-6">
      <AppNavBar overlay />
      <section>
        <h1>Profile</h1>
      </section>
    </main>
  );
}
