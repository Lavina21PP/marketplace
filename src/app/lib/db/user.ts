// db/income.ts
import { prisma } from "./index";

// export async function getTotalIncome() {
//   return await prisma.book.aggregate({
//     _sum: { amount: true },
//   });
// }

export async function getusers1() {
  return await prisma.users1.findMany({
    orderBy: { u_id: "desc" },
  });
}
