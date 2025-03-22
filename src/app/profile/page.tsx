import { auth } from "@/auth";
import RequestedEventList from "@/src/components/profile/RequestedEventList";

export default async function Profile() {
  const session = await auth();
  const user = session?.user;

  return (
    <section className="bg-slate-900 min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg shadow-xl p-6 mb-8 border border-slate-700/50">
          <h1 className="text-3xl font-bold text-indigo-400 mb-2">Profile</h1>
          <p className="text-slate-300">
            Manage your account and view your events
          </p>
        </div>

        {!user ? (
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg shadow-xl p-6 border border-slate-700/50">
            <p className="text-slate-300">Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* User Info Card */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg shadow-xl p-6 border border-slate-700/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-indigo-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-200">
                      {user.name}
                    </h2>
                    <p className="text-slate-400">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Events List */}
            <div className="lg:col-span-2">
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg shadow-xl p-6 border border-slate-700/50">
                <h2 className="text-2xl font-semibold text-slate-200 mb-4">
                  Your Events
                </h2>
                <RequestedEventList userEmail={user.email ?? "Default"} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
