import { getusers1 } from "../lib/db/user";

// Define the type correctly/
type UserType = {
  u_id: number;
  u_name: string | null;
  u_email: string | null;
};

export default async function Page() {
  const incomeHistory: UserType[] = await getusers1();

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {incomeHistory.map((user) => (
          <li key={user.u_id}>{user.u_name}</li>
        ))}
      </ul>
    </div>
  );
}
