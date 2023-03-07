import React, { useEffect, useRef, useState } from 'react'
import { api } from '../../utils/api'
import type { ChangeEvent } from 'react';
import { useRouter } from 'next/router'
import { BsSearch } from "react-icons/bs";
import Image from 'next/image'
import Link from 'next/link'

const Search = () => {
  const router = useRouter()
  const [ search,  setSearch ] = useState('')
  const { data: characters } = api.ff.getCharacter.useQuery({ name: `${search}`}, {enabled:!!search.length})
  const [focusedIndex, setFocusedIndex ] = useState(-1)
  const resultContainer = useRef<HTMLAnchorElement|null>(null)
  const handleSearch = (e:ChangeEvent<HTMLInputElement>)=> {
    setSearch(e.target.value)
  }
  const clearSearch = ()=> {
    setSearch('')
  }

  useEffect(()=> {
    if (!resultContainer.current) return;
    resultContainer?.current?.scrollIntoView({block: 'center'})
  },[focusedIndex])

  const handleKeyDown = (e:React.KeyboardEvent<HTMLDivElement>) => {
    const { key } = e
    let nextIndex = 0
    if (key === 'ArrowDown' && characters) {
      nextIndex = (focusedIndex + 1) % characters.length
    }

    if (key === 'ArrowUp' && characters) {
      if (focusedIndex < 0) nextIndex = -1
      else {
        nextIndex = (focusedIndex - 1) % characters.length
      }
    }

    if (key === 'Enter' && characters) {
      const characterAtIndex = characters[focusedIndex]
      setSearch('')
      
      if(characterAtIndex) {
        return router.push(`/characters#${characterAtIndex.id}`)
    }

    }

    if (key === 'Escape' && characters) {
      setSearch('')
    }

    setFocusedIndex(nextIndex)
  }
  return (
    // comeback to figure out keydown ts error
    <div className='
      border-2 border-slate-800 relative rounded-xl flex items-center bg-slate-100
      sm:w-2/4 md:w-2/6 lg:w-2/6 xl:w-1/4'
      onKeyDown={(e)=>void handleKeyDown(e)} tabIndex={1}>
      <input className='w-full rounded-tl-xl pl-2 rounded-bl-xl self-center focus:outline-none' type='text' maxLength={20} onChange={handleSearch} value={search}/>
      <BsSearch className='bg-slate-100 rounded-r-xl' size='1.25em'/>
      <div className='bg-slate-100 rounded flex flex-col max-h-60 absolute top-full overflow-y-auto min-w-full'>
        {characters?.map((character, index)=> {
          return (
          <div className={`${index === focusedIndex ? 'bg-gradient-to-br from-emerald-500 to-cyan-500': ''}`} key={character.id}>
            <Link 
              className= 'bg-slate-300 border-0 flex gap-4 items-center m-0.5'
              onClick={clearSearch} href={`/characters#${character.id}`} 
              key={character.id} 
              ref={index === focusedIndex ? resultContainer:null}>
              <Image className='h-12 w-12' width={50} height={50} src={character.pic} alt={`${character.name} thumbnail`}/>
              <h3>{character.name}</h3>
            </Link>
          </div>
          )
        })}
      </div>
    </div>
  )
}

export default Search