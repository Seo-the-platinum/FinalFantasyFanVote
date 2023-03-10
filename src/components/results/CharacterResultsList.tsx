import React from 'react'
import Image from 'next/image'

type Character = {
    id: string;
    name: string;
    pic: string;
    origin: string;
    votes: number;
  }

type Results = {
    results: Character[];
}


const CharacterResultsList = ({ results }: Results) => {
  return (
    <div className='flex flex-col gap-y-8 max-w-screen-xl mt-4'>
        {
        results && results.map((result: Character, index)=> {
          return (
            <div className="
              bg-gradient-to-tr from-indigo-900 via-blue-800 to-indigo-900
              border-2 gap-y-4 gap-x-2 p-2 rounded-lg items-center border-slate-200
              flex flex-col text-slate-200 
              md:items-end md:self-center min-w-full"
              key={result.id} id={result.id}>
              <div className="flex flex-col items-center w-full">
                <div className={`
                  ${index + 1 === 1 ? 'bg-amber-400' : 
                  index + 1 === 2 ? 'bg-slate-400' :
                  index + 1 === 3 ? 'bg-amber-900' : 'bg-slate-300'} 
                  rounded-full w-14 h-14 flex justify-center items-center self-start`}>
                  <h3 className='text-slate-900 text-3xl'>{index + 1}</h3>
                </div>
                <div className="flex justify-center gap-10">
                  <h3 className='font-medium text-lg md:text-2xl'>{result.name}</h3>
                  <h1 className='font-medium text-lg md:text-2xl'>Votes: {result.votes}</h1>
                </div>
                <div className=''>
                  <Image priority className='self-center rounded w-44 h-52' src={result.pic} alt={`portrait of ${result.name}`} width={200} height={100}/>
                </div>
              </div>
              <div className="flex flex-col items-end gap-x-8 self-center">
                  <h1 className='font-medium text-lg md:text-2xl'>{result?.origin && result.origin}</h1>
              </div>
            </div>
          )
        })
      }    
    </div>
  )
}

export default CharacterResultsList