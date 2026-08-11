import { prisma } from "@/lib/prisma";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Admin", href: "/admin" }, { label: "Users" }]} />
      <h1 className="text-2xl font-black text-tw-ink">Users</h1>
      <div className="mt-6 overflow-x-auto rounded-xl border border-tw-border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-tw-bg text-left text-xs uppercase text-tw-muted">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Account Type</th>
              <th className="p-3">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-tw-border">
                <td className="p-3 font-semibold text-tw-ink">
                  {u.firstName} {u.lastName}
                </td>
                <td className="p-3 text-tw-muted">{u.email}</td>
                <td className="p-3 text-tw-muted">{u.role}</td>
                <td className="p-3 text-tw-muted">{u.accountType}</td>
                <td className="p-3 text-tw-muted">{u.createdAt.toLocaleDateString("en-ZA")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
