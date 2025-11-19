import { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import { NeonArenaGame } from '../game/NeonArenaGame';

interface GameCanvasProps {
  onScore: (score: number) => void;
}

export function GameCanvas({ onScore }: GameCanvasProps) {
  const gameRef = useRef<Phaser.Game | null>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const calculateDimensions = () => {
      if (!parentRef.current) return;

      const container = parentRef.current.parentElement;
      if (!container) return;

      const containerWidth = container.clientWidth;
      const aspectRatio = 4 / 3;
      const maxWidth = 800;
      const maxHeight = 600;

      let width = Math.min(containerWidth - 48, maxWidth);
      let height = width / aspectRatio;

      if (height > maxHeight) {
        height = maxHeight;
        width = height * aspectRatio;
      }

      width = Math.max(width, 320);
      height = Math.max(height, 240);

      setDimensions({ width, height });
    };

    calculateDimensions();

    const handleResize = () => {
      calculateDimensions();

      if (gameRef.current) {
        gameRef.current.scale.resize(dimensions.width, dimensions.height);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dimensions.width, dimensions.height]);

  useEffect(() => {
    if (!parentRef.current || gameRef.current) return;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: parentRef.current,
      width: dimensions.width,
      height: dimensions.height,
      backgroundColor: '#0a0a1a',
      scene: NeonArenaGame,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
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
  }, [onScore, dimensions.width, dimensions.height]);

  return (
    <div className="relative w-full flex justify-center">
      <div
        ref={parentRef}
        className="rounded-lg overflow-hidden border-2 border-cyan-400 shadow-lg shadow-cyan-400/50"
        style={{ maxWidth: '100%' }}
      />
    </div>
  );
}
