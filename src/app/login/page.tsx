import LoginForm from "@/src/components/authorization/Login";

export default async function LoginPage() {
  return (
    <>
      <section className="bg-slate-900 min-h-screen pt-20">
        <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
          <div className="md:w-8/12 lg:w-5/12 rounded-lg bg-slate-800/50 backdrop-blur-lg px-8 py-10 border border-slate-700/50">
            <LoginForm />
          </div>
        </div>
      </section>
    </>
  );
}
