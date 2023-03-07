import React from 'react'
import ResultList from '../../components/results/ResultList'
import type { GetServerSideProps } from 'next'
import { createProxySSGHelpers } from '@trpc/react-query/ssg'
import { appRouter } from '../../server/api/root'
import { createInnerTRPCContext } from '../../server/api/trpc'

type Character = {
  id: string;
  name: string;
  pic: string;
  origin: string;
  votes: number
}

type Game = {
  id: string;
  pic: string;
  title: string;
  votes: number;
}

interface Results {
  results: Character[] | Game[];
}

const Result = ({ results }: Results) => {
  return (
    <div className='mt-14 md:mt-20'>
        <ResultList results={results}/>
    </div>
  )
}
//using server side rendering to get result data. I didn't use ssg or static site generation because
//I felt that the results list would change fairly frequently. Once data is fetched, I pass the data to
// the component so it is available before the component is mounted.
export const getServerSideProps: GetServerSideProps = async (ctx)=> {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({})
  })
  const results = ctx.query.result === 'characters' ? await ssg.ff.getCharactersByVote.fetch() : await ssg.ff.getGamesByVote.fetch()
  return {
    props: {
      results
    }
  }
}
export default Result