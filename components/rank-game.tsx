'use client';

import { useState, useEffect } from 'react';
import { rankGame } from '@/app/lib/actions';
import { redirect } from 'next/navigation';

const RankingGame = (props: any) => {
  let gameList = props.gameList;
  const gameName = props.gameName;
  
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(gameList.length - 1);
  const [mid, setMid] = useState(Math.floor((0 + gameList.length - 1) / 2));
  const [found, setFound] = useState(false);

  const handleChoice = (direction: number) => {
    if (found) return;

    let newLow = low;
    let newHigh = high;

    if (direction === 1) {
      newLow = mid + 1;
      setLow(newLow);
    } else if (direction === 0) {
      newHigh = mid - 1;
      setHigh(newHigh);
    }

    const newMid = Math.floor((newLow + newHigh) / 2);

    if (newLow > newHigh) {
      setFound(true);
      insertElementAtIndex(newLow);
    } else {
      setMid(newMid);
    }
    
  };

  const insertElementAtIndex = (index: number) => {
    const newList = [...gameList.slice(0, index), {id: props.game_id, name: gameName}, ...gameList.slice(index)];

    rankGame(newList);

    setTimeout(() => {
        redirect('/home');
    }, 1000);
  };


  return (
    <div>
        {!found ? (
        <div>
          <p>Choose whether to rank {gameName} higher or lower than {gameList[mid]['name']}.</p>
          <button onClick={() => handleChoice(0)}>Higher</button>
          <button onClick={() => handleChoice(1)}>Lower</button>
        </div>
      ) : (
        <div>
          <p>Successfully added your game! Redirecting you back now...</p>
        </div>
      )}
    </div>
  );
};

export default RankingGame;