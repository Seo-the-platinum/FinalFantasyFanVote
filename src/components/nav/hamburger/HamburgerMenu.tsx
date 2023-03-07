import React from 'react'
import Link from 'next/link'

type HandleShow = {
  handleShow: ()=> void;
}
const HamburgerMenu = ({ handleShow }: HandleShow) => {
  return (
    <div className='bg-gradient-to-br from-[#001657] to-[#000a29] min-h-screen w-4/5 sm:3/4 p-2'>
      <div className="flex flex-col gap-y-4 pl-2">
        <Link className='text-xl md:text-4xl text-slate-300 font-serif' onClick={handleShow} href='/'> Home </Link>
        <Link className='text-xl md:text-4xl text-slate-300 font-serif' onClick={handleShow} href='/characters'> Characters </Link>
        <Link className='text-xl md:text-4xl text-slate-300 font-serif' onClick={handleShow} href='/games'> Games </Link>
        <Link className='text-xl md:text-4xl text-slate-300 font-serif' onClick={handleShow} href='/results/characters'> Character Results </Link>
        <Link className='text-xl md:text-4xl text-slate-300 font-serif' onClick={handleShow} href='/results/games'> Game Results </Link>
      </div>
    </div>
  )
}

export default HamburgerMenu