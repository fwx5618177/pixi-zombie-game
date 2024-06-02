import { useEffect, useRef } from 'react';
import './styles/App.css';
import { Application } from '@pixi/app';
import Game from './core/Game';

function App() {
  const pixiContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const width = 1024;
    const height = 1024;
    const app = new Application({
      width,
      height,
    });

    if (pixiContainerRef.current) {
      pixiContainerRef.current.appendChild(app.view as unknown as Node);
    }

    const game = new Game(app, width, height);
    app.ticker.add(delta => game.gameLoop(delta));

    return () => {
      app.destroy(true, { children: true, texture: true, baseTexture: true });
    };
  }, []);

  return (
    <div className='h-screen'>
      <div className='relative w-full h-full flex items-center justify-center bg-gray-600'>
        <div className='absolute w-3/4 h-3/4' ref={pixiContainerRef}></div>
      </div>
    </div>
  );
}

export default App;
