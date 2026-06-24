import { getAdmins } from "@/src/app/api/admin/admin_actions";

export default async function AdminList() {
  const admins = await getAdmins();
  return (
    <div className="space-y-4">
      <div className="bg-white/5 rounded-lg shadow-lg overflow-hidden">
        <ul className="divide-y divide-cph-sky/15">
          {admins.map((admin) => (
            <li
              key={admin.id}
              className="px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-cph-ochre flex items-center justify-center">
                  <span className="text-cph-navy font-medium">
                    {admin.email.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-cph-paper">{admin.email}</span>
              </div>
              <span className="text-sm text-cph-sky/70">Admin</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
