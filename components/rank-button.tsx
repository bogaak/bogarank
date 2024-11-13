'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function RankButton(props: any) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  params.set('id', props.game_id);
  params.set('game', props.name)
  const path = `/ranking?${params.toString()}`;
  
  return (
    <Link href={path}>
    <button>
        {props.name} 
    </button>
    </Link>
  );
}

export default RankButton;