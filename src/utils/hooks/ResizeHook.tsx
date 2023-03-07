import { useEffect, useState } from 'react'

const ResizeHook = () => {
    const [ windowWidth, setWindowWidth ] = useState(0)
    useEffect(()=> {
        const handleResize = ()=> {
            setWindowWidth(window.innerWidth)
        }
        addEventListener('resize', handleResize)
        handleResize()
        return ()=> removeEventListener('resize', handleResize)
    },[])
  
    return windowWidth
}

export default ResizeHook