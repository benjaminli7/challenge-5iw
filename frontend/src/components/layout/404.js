import React from 'react'

function Page404() {
  return (
    <section>
      <div class="px-5 py-16 md:px-10 md:py-24 lg:py-32">
        <div class="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <img src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a945e53e6cf8f_Ellipse%2011%20(1).svg" alt="" class="mx-auto mb-8 inline-block h-56 w-56 flex-none object-cover" />
          <h1 class="mb-4 text-4xl font-bold md:text-6xl">404 Error</h1>
          <p class="mx-auto mb-5 max-w-lg text-sm text-[#636262] sm:text-base md:mb-6 lg:mb-8">Commodo, consequat turpis placerat ultrices sapien, tortor tincidunt. Sit quisque est metus auctor sed turpis lectus quis.</p>
          <a href="/" class="inline-block items-center bg-black px-8 py-4 text-center font-semibold text-white">Back Home</a>
        </div>
      </div>
    </section>
  )
}

export default Page404