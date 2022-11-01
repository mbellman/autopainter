import './body.css';

interface AppState {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  isMouseDown: boolean;
}

function createAppState(): AppState {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  return {
    canvas,
    ctx,
    isMouseDown: false
  };
}

function resizeCanvas({ canvas, ctx }: AppState): void {
  canvas.width = document.body.clientWidth - 100;
  canvas.height = document.body.clientHeight;

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function onMouseMove(e: MouseEvent, { isMouseDown, ctx }: AppState): void {
  if (!isMouseDown) {
    return;
  }

  ctx.fillStyle = '#f00';
  
  ctx.beginPath();
  ctx.arc(e.clientX, e.clientY, 10, 0, Math.PI * 2);
  ctx.fill();
}

function main(): void {
  const state = createAppState();

  document.body.appendChild(state.canvas);
  
  resizeCanvas(state);

  window.addEventListener('resize', () => resizeCanvas(state));
  window.addEventListener('mousemove', e => onMouseMove(e, state));
  window.addEventListener('mousedown', () => state.isMouseDown = true);
  window.addEventListener('mouseup', () => state.isMouseDown = false);
}

main();