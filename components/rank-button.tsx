'use client';

import { rankGame } from "@/app/lib/actions";

function RankButton(props: any) {

  const rankGameWithGame = rankGame.bind(null, props.game_id, props.name)
  return (
    <button onClick={rankGameWithGame}>
        {props.name} 
    </button>
  );
}

export default RankButton;