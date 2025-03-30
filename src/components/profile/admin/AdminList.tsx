import { getAdmins } from "@/src/app/api/admin/admin_actions";

export default async function AdminList() {
  const admins = await getAdmins();
  return (
    <div className="space-y-4">
      <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
        <ul className="divide-y divide-slate-700">
          {admins.map((admin) => (
            <li
              key={admin.id}
              className="px-6 py-4 flex items-center justify-between hover:bg-slate-700/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white font-medium">
                    {admin.email.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-slate-200">{admin.email}</span>
              </div>
              <span className="text-sm text-slate-400">Admin</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
