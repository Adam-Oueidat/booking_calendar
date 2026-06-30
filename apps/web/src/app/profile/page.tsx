import { auth } from "@/auth";
import RequestedEventList from "@/src/components/profile/RequestedEventList";

export default async function Profile() {
  const session = await auth();
  const user = session?.user;

  return (
    <section className="bg-cph-navy min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white/5 backdrop-blur-lg rounded-lg shadow-xl mb-8 border border-cph-sky/15 overflow-hidden">
          <div className="flex h-1.5 w-full" aria-hidden="true">
            {["#E6A23C","#C25342","#2F6E69","#4A6FA5","#E8C766","#B94B3C"].map((c) => (
              <span key={c} className="flex-1" style={{ backgroundColor: c }} />
            ))}
          </div>
          <div className="p-6">
            <h1 className="font-display text-3xl font-bold text-cph-ochre mb-2">Profile</h1>
            <p className="text-cph-sky">
              Manage your account and view your events
            </p>
          </div>
        </div>

        {!user ? (
          <div className="bg-white/5 backdrop-blur-lg rounded-lg shadow-xl p-6 border border-cph-sky/15">
            <p className="text-cph-sky">Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* User Info Card */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 backdrop-blur-lg rounded-lg shadow-xl p-6 border border-cph-sky/15">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-cph-ochre/15 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-cph-ochre"
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
                    <h2 className="font-display text-xl font-semibold text-cph-paper">
                      {user.name}
                    </h2>
                    <p className="text-cph-sky/70">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Events List */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-lg rounded-lg shadow-xl p-6 border border-cph-sky/15">
                <h2 className="font-display text-2xl font-semibold text-cph-paper mb-4">
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
