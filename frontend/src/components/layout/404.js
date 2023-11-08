import React from 'react'
import { Link } from 'react-router-dom'

function Page404() {
  return (
    <section>
      <div className="px-5 py-16 md:px-10 md:py-24 lg:py-32">
        <div className="flex flex-col items-center w-full max-w-3xl mx-auto text-center">
          <img
            src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a945e53e6cf8f_Ellipse%2011%20(1).svg"
            alt=""
            className="flex-none inline-block object-cover w-56 h-56 mx-auto mb-8"
          />
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">404 Error</h1>
          <p className="mx-auto mb-5 max-w-lg text-sm text-[#636262] sm:text-base md:mb-6 lg:mb-8">
            Commodo, consequat turpis placerat ultrices sapien, tortor
            tincidunt. Sit quisque est metus auctor sed turpis lectus quis.
          </p>
          <Link
            to="/"
            className="items-center inline-block px-8 py-4 font-semibold text-center text-white bg-black"
          >
            Back Home
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Page404