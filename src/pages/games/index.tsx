import React from 'react'
import Image from 'next/image'
import type { GetStaticProps } from 'next'
import { createProxySSGHelpers } from '@trpc/react-query/ssg'
import { appRouter } from '../../server/api/root';
import { createInnerTRPCContext } from '../../server/api/trpc'
import { api } from '../../utils/api';
interface Game {
  id: string;
  title: string;
  pic: string;
}

interface Games {
  games: Game[];
}
export const getStaticProps: GetStaticProps = async ()=> {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({}),
  });
   const games = await ssg.ff.getGames.fetch();
  return {
    props: {
      games
    },
  };
}

const DefaultGames = ({games}: Games) => {
  const utils = api.useContext()
  const upVote = api.ff.incrementGamesVote.useMutation({
    onSuccess: async()=> {
      await utils.ff.getGamesByVote.invalidate()
      await utils.ff.getTopGames.invalidate()

    }
  })
  const handleVote = (id: string)=> {
    upVote.mutate({id: id})
  }
  return (
    <div className='grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-8 mt-12 md:grid-cols-4'>
      {games && games.map((game: Game)=> {
        return (
          <div key={game.id}>
            <Image priority className='w-56 h-56 md:w-48 md:h-56 object-contain' width={200} height={200} src={`${game.pic}`} alt='game cover'/>
            <div className='flex gap-4 justify-center items-center'>
              <h3 className='text-slate-300'>{game.title}</h3>
              <button className='
                transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-125 hover:bg-teal-500 hover:text-white duration-300
                bg-blue-900 
                rounded-md
                text-slate-300 p-3'
                data-id={game.id}
                onClick={()=>handleVote(game.id)}
                >Vote</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default DefaultGames