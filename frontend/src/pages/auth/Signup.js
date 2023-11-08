import React from 'react'

function Signup() {
  return (

    <section>
    <div className="py-10 mx-5">
        <div className="mx-auto max-w-xl bg-[#f2f2f7] px-5 py-12 text-center md:px-10">
        <h2 className="text-3xl font-bold md:text-5xl">Sign up</h2>
        <p className="mx-auto mb-5 mt-4 max-w-xl text-[#647084] md:mb-8">Lorem ipsum dolor sit amet consectetur adipiscing elit ut aliquam,purus sit amet luctus magna fringilla urna</p>
        <a href="#" className="mx-auto flex max-w-sm justify-center bg-[#276ef1] px-8 py-4 text-center font-semibold text-white transition [box-shadow:rgb(171,_196,_245)_-8px_8px] hover:[box-shadow:rgb(171,_196,_245)_0px_0px]">
            <img src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6357722e2a5f19d23637f876_GoogleLogo.svg" alt="" className="mr-4" />
            <p className="font-bold">Sign up with Google</p>
        </a>
        <div className="flex justify-around max-w-sm mx-auto mb-14 mt-14">
            <img src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6358f3d7490d1b3d86cf9442_Line%203.svg" alt="" className="inline-block" />
            <p className="text-sm text-[#647084]">or sign up with email</p>
            <img src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6358f3d7490d1b3d86cf9442_Line%203.svg" alt="" className="inline-block" />
        </div>
        <form className="max-w-sm pb-4 mx-auto mb-4" name="wf-form-password" method="get">
            <div className="relative">
            <img alt="" src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6357722e2a5f190b7e37f878_EnvelopeSimple.svg" className="absolute bottom-0 left-[5%] right-auto top-[26%] inline-block" />
            <input type="email" className="mb-4 block h-9 w-full border border-black bg-white px-3 py-6 pl-14 text-sm text-[#333333]" maxlength="256" name="name" placeholder="Email Address" required="" />
            </div>
            <div className="relative pb-2 mb-4">
            <img alt="" src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6357722e2a5f19601037f879_Lock-2.svg" className="absolute bottom-0 left-[5%] right-auto top-[26%] inline-block" />
            <input type="password" className="mb-4 block h-9 w-full border border-black bg-white px-3 py-6 pl-14 text-sm text-[#333333]" placeholder="Password (min 8 characters)" required="" />
            </div>
            <a href="#" className="flex max-w-full grid-cols-2 flex-row items-center justify-center bg-[#276ef1] px-8 py-4 text-center font-semibold text-white transition [box-shadow:rgb(171,_196,_245)_-8px_8px] hover:[box-shadow:rgb(171,_196,_245)_0px_0px]">
            <p className="mr-6 font-bold">Join Flowspark</p>
            <div className="flex-none w-4 h-4">
                <svg fill="currentColor" viewBox="0 0 20 21" xmlns="http://www.w3.org/2000/svg">
                <title>Arrow Right</title>
                <polygon points="16.172 9 10.101 2.929 11.515 1.515 20 10 19.293 10.707 11.515 18.485 10.101 17.071 16.172 11 0 11 0 9"></polygon>
                </svg>
            </div>
            </a>
        </form>
        <p className="text-sm text-[#636262]">Already have an account? <a href="/login" className="font-[Montserrat,_sans-serif] text-sm font-bold text-black">Login now</a>
        </p>
        </div>
    </div>
    </section>
  )
}

export default Signup