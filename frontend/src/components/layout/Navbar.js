import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const handleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <section>
      <div className="w-screen h-auto">
        <nav className="font-inter mx-auto h-auto w-full max-w-[1600px] lg:relative lg:top-0">
          <div className="flex flex-col px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-10 lg:py-4 xl:px-20">
            <a href="/">
              <svg
                class="relative left-5 lg:inset-0"
                width="75"
                height="24"
                viewBox="0 0 75 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.256 18C12.344 18 15.848 14.424 15.848 9.264C15.848 4.032 12.272 0.456 7.088 0.456H0.944V18H7.256ZM6.8 3.288C10.424 3.288 12.608 5.544 12.608 9.264C12.608 12.912 10.472 15.168 6.968 15.168H4.016V3.288H6.8ZM23.5816 18.312C26.6776 18.312 28.8376 16.752 29.3416 14.16H26.6296C26.2936 15.288 25.2376 15.912 23.6296 15.912C21.6856 15.912 20.5816 14.856 20.3656 12.768L29.2936 12.744V11.856C29.2936 8.16 27.0376 5.784 23.4856 5.784C20.0056 5.784 17.5816 8.352 17.5816 12.072C17.5816 15.744 20.0536 18.312 23.5816 18.312ZM23.5096 8.184C25.2616 8.184 26.3896 9.264 26.3896 10.896H20.4376C20.7256 9.12 21.7816 8.184 23.5096 8.184ZM34.4814 18H37.3614L42.3054 6.144H39.2814L37.1214 11.592C36.6174 12.888 36.1854 14.136 36.0174 14.88C35.8734 14.232 35.4654 13.008 34.9614 11.592L32.8974 6.144H29.7774L34.4814 18ZM45.4526 3.768C46.4126 3.768 47.2286 2.976 47.2286 1.992C47.2286 1.008 46.4126 0.24 45.4526 0.24C44.4686 0.24 43.6766 1.008 43.6766 1.992C43.6766 2.976 44.4686 3.768 45.4526 3.768ZM41.1566 23.568C41.9246 23.784 42.3566 23.832 42.9086 23.832C45.4766 23.832 46.9166 22.2 46.9166 19.68V6.144H43.9886V19.344C43.9886 20.544 43.6526 21.12 42.6446 21.12C42.2846 21.12 42.0446 21.096 41.6366 20.976L41.1566 23.568ZM49.2457 12.048C49.2457 15.744 51.9097 18.288 55.5817 18.288C59.2537 18.288 61.9177 15.744 61.9177 12.048C61.9177 8.352 59.2537 5.808 55.5817 5.808C51.9097 5.808 49.2457 8.352 49.2457 12.048ZM52.1737 12.048C52.1737 9.888 53.5657 8.424 55.5817 8.424C57.5977 8.424 58.9897 9.888 58.9897 12.048C58.9897 14.208 57.5977 15.672 55.5817 15.672C53.5657 15.672 52.1737 14.208 52.1737 12.048ZM62.7613 23.496C63.4093 23.664 64.1293 23.76 64.9453 23.76C66.8893 23.76 68.1373 22.848 69.0253 20.64L74.8333 6.144H71.8093L68.5933 14.784L65.5453 6.144H62.4493L67.2253 18.504L66.8893 19.392C66.3853 20.784 65.6653 21.048 64.5133 21.048H62.7613V23.496Z"
                  fill="black"
                ></path>
              </svg>
            </a>
            <div
              className={`mt-14 flex flex-col space-y-8 lg:mt-0 lg:flex lg:flex-row lg:space-x-1 lg:space-y-0 ${
                isOpen ? "show" : "hidden"
              }`}
            >
              <a
                href="/"
                className="rounded-lg font-inter lg:px-6 lg:py-4 lg:hover:bg-gray-50 lg:hover:text-gray-800"
              >
                Accueil
              </a>
              <a
                href="/"
                className="rounded-lg font-inter lg:px-6 lg:py-4 lg:hover:bg-gray-50 lg:hover:text-gray-800"
              >
                Accueil
              </a>
              <a
                href="/"
                className="pb-8 rounded-lg font-inter lg: lg:px-6 lg:py-4 lg:hover:bg-gray-50 lg:hover:text-gray-800"
              >
                Accueil
              </a>
            </div>
            <div
              className={`flex flex-col space-y-8 lg:flex lg:flex-row lg:space-x-3 lg:space-y-0 ${
                isOpen ? "show" : "hidden"
              }`}
            >
              <a
                href="/"
                className="rounded-lg font-inter lg:px-6 lg:py-4 lg:hover:bg-gray-50 lg:hover:text-gray-800"
              >
                Sign Up
              </a>
              <a
                href="/"
                className="px-8 py-4 text-center text-white bg-black rounded-lg font-inter hover:bg-gray-800"
              >
                Login
              </a>
            </div>
            <button className="absolute right-5 lg:hidden" onClick={handleMenu}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.75 12H20.25"
                  stroke="#160042"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M3.75 6H20.25"
                  stroke="#160042"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M3.75 18H20.25"
                  stroke="#160042"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </section>
  );
}

export default Navbar;
