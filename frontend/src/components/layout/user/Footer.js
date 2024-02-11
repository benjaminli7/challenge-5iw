import React from 'react'
import { Link } from 'react-router-dom';

function Footer() {

  let backgroundImage = "https://assets.website-files.com/63904f663019b0d8edf8d57c/6399731b4cdf484f42d3d80b_Mask%20group%20(2).svg"
  return (
    <footer
      className="text-white bg-black bg-center bg-cover"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="w-full px-5 py-16 mx-auto max-w-7xl md:px-10 md:py-24 lg:py-32">
        <div className="flex flex-col items-center">
          <Link to="/" className="inline-block max-w-full mb-8">
            <img
              src="https://assets.website-files.com/63904f663019b0d8edf8d57c/6399728d302d2471f18b229f_Group%2047874%20(2).svg"
              alt=""
              className="inline-block max-h-10"
            />
          </Link>
          {/* <div className="text-center font-semibold max-[991px]:ml-0 max-[991px]:mr-0 max-[991px]:py-1">
            <Link
              to="/"
              className="inline-block px-6 py-2 font-normal transition hover:text-[#d6a701]"
            >
              Accueil
            </Link>
            <Link
              to="/"
              className="inline-block px-6 py-2 font-normal transition hover:text-[#d6a701]"
            >
              Accueil
            </Link>
            <Link
              to="/"
              className="inline-block px-6 py-2 font-normal transition hover:text-[#d6a701]"
            >
              Accueil
            </Link>
            <Link
              to="/"
              className="inline-block px-6 py-2 font-normal transition hover:text-[#d6a701]"
            >
              Accueil
            </Link>
            <Link
              to="/"
              className="inline-block px-6 py-2 font-normal transition hover:text-[#d6a701]"
            >
              Accueil
            </Link>
          </div> */}
          <div className="w-48 mt-8 mb-8 border-b border-solid border-b-white"></div>
          <div className="mb-12 grid w-full max-w-[208px] grid-flow-col grid-cols-4 gap-3">
            <Link
              to="/"
              className="ifont-bold mx-auto flex max-w-[24px] flex-col"
            >
              <img
                src="https://assets.website-files.com/63904f663019b0d8edf8d57c/639972bc5e36f4a882999413_Frame%205479.svg"
                alt=""
                className="inline-block"
              />
            </Link>
            <Link
              to="/"
              className="mx-auto flex max-w-[24px] flex-col font-bold"
            >
              <img
                src="https://assets.website-files.com/63904f663019b0d8edf8d57c/639972bf093252f2b2114050_Frame%205480.svg"
                alt=""
                className="inline-block"
              />
            </Link>
            <Link
              to="/"
              className="ifont-bold mx-auto flex max-w-[24px] flex-col"
            >
              <img
                src="https://assets.website-files.com/63904f663019b0d8edf8d57c/639972bde1a389ee15d86fc6_Frame%205481-1.svg"
                alt=""
                className="inline-block"
              />
            </Link>
            <Link
              to="/"
              className="mx-auto flex max-w-[24px] flex-col font-bold"
            >
              <img
                src="https://assets.website-files.com/63904f663019b0d8edf8d57c/639972bf10337117b26b8e51_Frame%205481.svg"
                alt=""
                className="inline-block"
              />
            </Link>
          </div>
          <p className="max-[479px]:text-sm">
            © Copyright 2023. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer