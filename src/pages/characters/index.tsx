import React from 'react'
import { api } from '../../utils/api'
import type { GetStaticProps } from 'next'
import { createProxySSGHelpers } from '@trpc/react-query/ssg'
import { appRouter } from '../../server/api/root';
import Image from 'next/image'
import { createInnerTRPCContext } from '../../server/api/trpc'
import { useRouter } from 'next/router'
interface Character {
    id: string;
    name: string;
    pic: string;
    origin: string;
}

interface Characters {
    characters: Character[]
}
export const getStaticProps: GetStaticProps = async ()=> {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({}),
  });
    const characters = await ssg.ff.getCharacters.fetch();
    
  return {
    props: {
      characters
    },
  };
}

const DefaultCharacters = ({ characters }: Characters) => {
  const router = useRouter()
  const path = router.asPath.split('#')[1]
  const utils = api.useContext()
    const upVote = api.ff.incrementCharacterVote.useMutation({
      onSuccess: async ({ id })=> {
        await utils.ff.getCharactersByVote.invalidate()
        await utils.ff.getTopCharacters.invalidate()
        void router.push(`/results/characters#${id}`)
      }
    })
    
    const handleVote = (id: string)=> {
        upVote.mutate({id: id})
    }
  return (
    <div className='mt-14 md:mt-20 max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 place-items-end'>
      {
        characters.map((char: Character)=> {
          return (
            <div className={`${path === char.id ? 'border-2 border-emerald-500 rounded' : ''} flex flex-col gap-y-4`} key={char.id} id={char.id}>
              <Image priority className="w-24 h-24 md:w-48 md:h-48 object-contain" alt='final fantasy character' width={200} height={200} src={char.pic}/>
              <div className='flex gap-4'>
                <div>
                  <h3 className='text-slate-300'>{char.name}</h3>
                  <h3 className='text-slate-300'>{char.origin}</h3>
                </div>
                <button className='
                  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-125 hover:bg-teal-500 hover:text-white duration-300
                  bg-blue-900 
                  rounded-md
                  text-slate-300 px-3' 
                  data-id={char.id} onClick={()=>handleVote(char.id)}> 
                  Vote
                </button>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default DefaultCharacters