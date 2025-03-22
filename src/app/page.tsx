import Card from "@/src/components/Card";
import { getCardInformation } from "@/src/app/api/server_actions/actions";
import Link from "next/link";
import { auth } from "@/auth";

export default async function HomePage() {
  const cardInformation = await getCardInformation();
  const session = await auth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="absolute inset-0">
          <img
            src="/hero-bg.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 container mx-auto px-4 py-24 sm:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Boka din tid
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Enkelt och smidigt sätt att boka tid för dina aktiviteter
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={session ? "/calendar" : "/login"}
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                {session ? "Gå till bokning" : "Logga in för att boka"}
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center justify-center px-8 py-3 border border-gray-600 text-base font-medium rounded-md text-gray-300 hover:bg-gray-800 transition-colors duration-200"
              >
                Läs mer
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="container mx-auto px-4 py-16 sm:py-24">
        <div className="flex flex-col items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {Object.entries(cardInformation).map((cardInfo, index) => (
              <Card key={index} cardInfo={cardInfo[1]} />
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section - Temporarily Commented Out
      <div className="bg-gray-800/50 py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Vad folk som besökt har sagt
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <div className="ml-4">
                    <h4 className="text-white font-semibold">
                      Kund {index + 1}
                    </h4>
                    <p className="text-gray-400 text-sm">Verifierad kund</p>
                  </div>
                </div>
                <p className="text-gray-300">
                  "Enkelt och smidigt sätt att boka tid. Rekommenderar starkt!"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      */}
    </div>
  );
}
