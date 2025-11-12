import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { NeonArenaGame } from '../game/NeonArenaGame';

interface GameCanvasProps {
  onScore: (score: number) => void;
}

export function GameCanvas({ onScore }: GameCanvasProps) {
  const gameRef = useRef<Phaser.Game | null>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!parentRef.current || gameRef.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: parentRef.current,
      width: 800,
      height: 600,
      backgroundColor: '#0a0a1a',
      scene: NeonArenaGame,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 },
        },
      },
    };

    gameRef.current = new Phaser.Game(config);
    gameRef.current.scene.start('NeonArenaGame', { onScore });

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, [onScore]);

  return (
    <div className="relative">
      <div ref={parentRef} className="rounded-lg overflow-hidden border-2 border-cyan-400 shadow-lg shadow-cyan-400/50" />
    </div>
  );
}
