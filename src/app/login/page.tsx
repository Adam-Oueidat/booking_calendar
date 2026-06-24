import LoginForm from "@/src/components/authorization/Login";

export default async function LoginPage() {
  return (
    <section className="bg-cph-navy min-h-screen pt-20">
      <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
        <div className="md:w-8/12 lg:w-5/12 rounded-lg overflow-hidden bg-white/5 backdrop-blur-lg border border-cph-sky/15">
          <div className="flex h-1.5 w-full" aria-hidden="true">
            {["#E6A23C", "#C25342", "#2F6E69", "#4A6FA5", "#E8C766", "#B94B3C"].map((c) => (
              <span key={c} className="flex-1" style={{ backgroundColor: c }} />
            ))}
          </div>
          <div className="px-8 py-10">
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl font-bold text-cph-ochre mb-2">
                Välkommen
              </h1>
              <p className="text-cph-sky">Logga in för att boka tid</p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </section>
  );
}
