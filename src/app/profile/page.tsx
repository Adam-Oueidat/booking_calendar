import { auth } from "@/auth";
import Image from "next/image";
import RequestedEventList from "@/src/components/profile/RequestedEventList";
export default async function Profile() {
  const session = await auth();
  const user = session?.user;

  return (
    <>
      <section className="bg-ct-blue-600  min-h-screen pt-20">
        <div className="max-w-4xl mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex justify-start items-start">
          <div>
            <p className="mb-3 text-5xl text-center font-semibold">
              Profile Page
            </p>
            {!user ? (
              <p>Loading...</p>
            ) : (
              <>
                <div className="flex items-center gap-24">
                  <div>
                    <Image
                      src={user.image ? user.image : "/images/default.png"}
                      className="max-h-36"
                      width={144}
                      height={144}
                      alt={`profile photo of ${user.name}`}
                    />
                    <div className="mt-8">
                      <p className="mb-3">Name: {user.name}</p>
                      <p className="mb-3">Email: {user.email}</p>
                    </div>
                  </div>

                  <RequestedEventList userEmail={user.email ?? "Default"} />
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
