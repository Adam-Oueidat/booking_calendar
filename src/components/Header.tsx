export default function Header() {
  return (
    <>
      <header className="bg-gray-500 opacity-50">
        <nav className="mx-auto flex items-left justify-center p-6 lg:px-8 max-w-7xl">
          <div className="flex lg:flex-1">
            <a href="/">Home</a>
          </div>
          {/* <div className="flex lg:flex-1">
            <a href="/about">About</a>
          </div>
          <div className="flex lg:flex-1">
            <a href="/contact">Contact</a>
          </div> */}
        </nav>
      </header>
    </>
  );
}
