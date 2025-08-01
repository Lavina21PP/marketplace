// db/income.ts
import { prisma } from "./index";

// export async function getTotalIncome() {
//   return await prisma.book.aggregate({
//     _sum: { amount: true },
//   });
// }

export async function getIncomeHistory() {
  return await prisma.book.findMany({
    orderBy: { b_id: "desc" },
  });
}
