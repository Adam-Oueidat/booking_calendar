import Card from "@/src/components/Card";
import { getCardInformation } from "@/src/app/api/server_actions/actions";
import Link from "next/link";
import { auth } from "@/auth";
import Image from "next/image";

export default async function HomePage() {
  const cardInfo = await getCardInformation();
  const session = await auth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.jpg"
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Boka din tid
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Enkelt och smidigt sätt att boka tid för ett besök!
          </p>
          <div className="flex gap-4 justify-center">
            {session ? (
              <Link href="/calendar">
                <button className="bg-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-400 transition-colors">
                  Gå till bokning
                </button>
              </Link>
            ) : (
              <Link href="/login">
                <button className="bg-blue-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-400 transition-colors">
                  Logga in
                </button>
              </Link>
            )}
            <Link href="#features">
              <button className="bg-white/10 text-white px-8 py-3 rounded-lg font-medium hover:bg-white/20 transition-colors backdrop-blur-sm">
                Läs mer
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Våra tjänster
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {Object.entries(cardInfo).map(([id, card]) => (
              <Card key={id} cardInfo={card} />
            ))}
          </div>
        </div>
      </section>

      {/* Developer Footer */}
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-blue-400 mb-2">
                Adam Oueidat
              </h3>
              <p className="text-gray-400">Software Engineer</p>
              <div className="flex gap-4 mt-4">
                <a
                  href="https://github.com/Adam-Oueidat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.91-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/adam-oueidat-29555215b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-.88-.06-1.601-1-1.601-1 0-1.16.781-1.16 1.601v5.604h-3v-11h3v1.765c.4-.8 1.1-1.1 1.9-1.1 1.4 0 2.5.9 2.5 2.8v6.535z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 mb-2">
                Built with Next.js & TypeScript
              </p>
              <p className="text-gray-400">
                © {new Date().getFullYear()} All rights reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
