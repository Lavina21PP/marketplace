import { getIncomeHistory } from "../lib/db/book";

// Define the type correctly/
type BookType = {
  b_id: number;
  b_name: string | null;
  b_type: string | null;
  b_quantity: string | null;
  b_fine: string | null;
};

export default async function Page() {
  const incomeHistory: BookType[] = await getIncomeHistory();

  return (
    <div>
      <h1>Book List</h1>
      <ul>
        {incomeHistory.map((book) => (
          <li key={book.b_id}>{book.b_name}</li>
        ))}
      </ul>
    </div>
  );
}
