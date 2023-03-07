import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import HamburgerMenu from './HamburgerMenu';

const Hamburger = () => {
  const [ show, setShow ] = useState(false)
  const handleShow = ()=> {
    setShow(prev=> !prev)
  }
  return (
    <div className={`${show ? 'translate-x-1/4' : 'translate-x-full'} transform-translate duration-500 ease-in-out absolute right-0`} >
      <div className='aboslute flex items-start'>
        <button className='absolute right-full' onClick={handleShow}>
          <GiHamburgerMenu className='fill-red-800' size='2rem'/>
        </button>
        <HamburgerMenu handleShow={handleShow}/>
      </div>
    </div>
  )
}

export default Hamburger