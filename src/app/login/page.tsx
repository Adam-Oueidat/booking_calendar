import LoginForm from "@/src/components/authorization/Login";

export default async function LoginPage() {
  return (
    <section className="bg-slate-900 min-h-screen pt-20">
      <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
        <div className="md:w-8/12 lg:w-5/12 rounded-lg bg-slate-800/50 backdrop-blur-lg px-8 py-10 border border-slate-700/50">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-indigo-400 mb-2">
              Välkommen
            </h1>
            <p className="text-slate-300">Logga in för att boka tid</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
