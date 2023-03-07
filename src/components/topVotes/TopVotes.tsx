import React from 'react'
import CharacterResultsList from '../results/CharacterResultsList'
import GameResultsList from '../results/GameResultsList'

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

interface TopVotes {
  topCharacters: Character[];
  topGames: Game[];
}

const TopVotes = ({ topCharacters, topGames }: TopVotes) => {
  return (
    <div className='flex flex-col md:flex-row justify-between gap-10 md:px-10 text-center'>
        <div className='flex flex-col min-w-2/6'>
            <h3 className='text-lg text-white'>Top 10 Characters </h3>
            <CharacterResultsList results={topCharacters}/>
        </div>
        <div className='flex flex-col min-w-2/6'>
            <h3 className='text-white text-lg'>Top 5 Games</h3>
            <GameResultsList results={topGames}/>
        </div>
    </div>
  )
}

export default TopVotes