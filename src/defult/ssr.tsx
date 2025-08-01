// app/page.tsx
// import { getIncomeSummary } from "@/lib/api";

export default async function HomePage() {
//   const summary = await getIncomeSummary(); // SSR: รันบน server ตอน request

  return (
    <main>
      <h1>รายได้ของคุณ</h1>
      <p>รวมทั้งหมด: บาท</p>
    </main>
  );
}
