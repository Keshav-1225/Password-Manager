import React from 'react'

const Navbar = () => {
  return (
    <nav className='w-full flex justify-between pl-6 text-white bg-blue-600 h-12.5 items-center'>
      <div className='font-extrabold text-2xl text-black'>Pass<span className='text-blue-300'>Guide</span></div>
      <div className='flex mr-6'>
        <ul className='flex gap-6 mr-6 items-center'>
            <li className='hover:cursor-pointer hover:font-bold transition-all'><a href="">Home</a></li>
            <li className='hover:cursor-pointer hover:font-bold transition-all'><a href="">Contact</a></li>
            <li className='hover:cursor-pointer hover:font-bold transition-all'><a href="">About us</a></li>
        </ul>
        <div className='bg-blue-950 p-1 rounded-full font-bold px-2 flex items-center hover:cursor-pointer hover:bg-black'>
          <span><img src="https://www.logo.wine/a/logo/GitHub/GitHub-Logo.wine.svg" alt="logo" width={50} className='invert'/></span>
          <span>Github</span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
