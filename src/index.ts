import './body.css';

interface AppState {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

function createAppState(): AppState {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  return {
    canvas,
    ctx
  };
}

function resizeCanvas({ canvas, ctx }: AppState): void {
  canvas.width = document.body.clientWidth - 100;
  canvas.height = document.body.clientHeight;

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function main(): void {
  const state = createAppState();

  document.body.appendChild(state.canvas);
  
  resizeCanvas(state);

  window.addEventListener('resize', () => resizeCanvas(state));
}

main();