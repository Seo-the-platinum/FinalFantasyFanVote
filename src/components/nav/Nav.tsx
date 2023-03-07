import React, { useEffect, useState  } from 'react'
import Link from 'next/link'
import ResizeHook from '../../utils/hooks/ResizeHook'
import Hamburger from './hamburger/Hamburger'
import Search from './Search'
import { useRouter } from 'next/router'

const Navbar = () => {
  const [ isMounted, setMounted ] = useState(false)
  const windowWidth = ResizeHook()
  const { asPath } = useRouter()
  useEffect(()=> {
    setMounted(true)
    if (windowWidth > 767) {
      const allLinks = document.getElementsByTagName('a')
      for (let i = 0; i < allLinks.length; i++) {
        if (allLinks[i]?.id === asPath.split('#')[0]) {
          allLinks[i]?.classList.add('bg-[length:100%_2px]')
        } else {
          allLinks[i]?.classList.remove('bg-[length:100%_2px]')
        }
      }
    }
  },[windowWidth,asPath])

  if (!isMounted) return null
  return (
    <div className='
      drop-shadow-xl
      bg-gradient-to-tr from-[#010049] via-[#010049eb] to-[#040263]
      flex justify-center fixed h-10 w-full gap-2
      md:h-20 md:flex-col-reverse md:pr-2 md:max-w-7xl md:items-end
      lg:gap-4 lg:justify-evenly lg:items-center lg:flex-row lg:h-14
      xl:max-w-none l xl:justify-center'>
        <Search/>
        {
          windowWidth > 767 ?
          <div className='hidden md:flex justify-end gap-8 font-serif'>
            <Link className='
              bg-gradient-to-r from-emerald-500 to-sky-500 bg-left-bottom bg-[length:0%_2px]
              bg-no-repeat pb-2px transition-all delay-250 duration-300 ease-in-out hover:bg-[length:100%_2px]
              text-slate-300 text-sm decoration-teal-600
              md:text-xl' id='/' href='/'> 
              Home 
            </Link>
            <Link className='
              bg-gradient-to-r from-teal-500 to-cyan-500 bg-left-bottom bg-[length:0%_2px]
              bg-no-repeat pb-2px transition-all delay-250 duration-300 ease-in-out hover:bg-[length:100%_2px]
              text-slate-300 text-sm md:text-xl decoration-teal-600' 
              id='/results/characters' href='/results/characters'>
              Character Results </Link>
            <Link className='
              bg-gradient-to-r from-teal-500 to-cyan-500 bg-left-bottom bg-[length:0%_2px]
              bg-no-repeat pb-2px transition-all delay-250 duration-300 ease-in-out hover:bg-[length:100%_2px]
              text-slate-300 text-sm md:text-xl decoration-teal-600' 
              id='/results/games' href='/results/games'>
              Game Results
            </Link>
            <Link className='
              bg-gradient-to-r from-teal-500 to-cyan-500 bg-left-bottom bg-[length:0%_2px]
              bg-no-repeat pb-2px transition-all delay-250 duration-300 ease-in-out hover:bg-[length:100%_2px]
              text-slate-300 text-sm md:text-xl decoration-teal-600' 
              id='/characters' href='/characters'> 
              Characters 
            </Link>
            <Link className='
              bg-gradient-to-r from-teal-500 to-cyan-500 bg-left-bottom bg-[length:0%_2px]
              bg-no-repeat pb-2px transition-all delay-250 duration-300 ease-in-out hover:bg-[length:100%_2px]
              text-slate-300 text-sm md:text-xl decoration-teal-600' 
              id='/games' href='/games'> 
              Games 
            </Link>
          </div> :
          <Hamburger/>
        }
    </div>
  )
}

export default Navbar