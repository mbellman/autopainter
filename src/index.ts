import './body.css';

interface Point2D {
  x: number;
  y: number;
}

interface AppState {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  lastCoordinates: Point2D[];
  isMouseDown: boolean;
}

function createAppState(): AppState {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  return {
    canvas,
    ctx,
    lastCoordinates: [],
    isMouseDown: false
  };
}

function resizeCanvas({ canvas, ctx }: AppState): void {
  canvas.width = document.body.clientWidth - 100;
  canvas.height = document.body.clientHeight;

  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function saveLastCoordinate(state: AppState, point: Point2D): void {
  state.lastCoordinates.push(point);

  if (state.lastCoordinates.length > 3) {
    state.lastCoordinates.shift();
    state.lastCoordinates.shift();
  }
}

function drawInterpolatedMouseCurve(state: AppState): void {
  if (state.lastCoordinates.length < 3) {
    return;
  }

  const { ctx, lastCoordinates } = state;
  const [ p1, control, p2 ] = lastCoordinates;

  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 10;

  const mid: Point2D = {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2
  };

  const adjustedControl: Point2D = {
    x: control.x - mid.x,
    y: control.y - mid.y
  };

  adjustedControl.x *= 2;
  adjustedControl.y *= 2;

  adjustedControl.x += mid.x;
  adjustedControl.y += mid.y;

  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.quadraticCurveTo(adjustedControl.x, adjustedControl.y, p2.x, p2.y);
  ctx.stroke();
}

function onMouseMove(e: MouseEvent, state: AppState): void {
  const { ctx, lastCoordinates, isMouseDown } = state;

  if (!isMouseDown) {
    return;
  }

  const point: Point2D = {
    x: e.clientX,
    y: e.clientY
  };

  saveLastCoordinate(state, point);
  drawInterpolatedMouseCurve(state);
}

function onMouseUp(e: MouseEvent, state: AppState): void {
  state.isMouseDown = false;
  state.lastCoordinates.length = 0;
}

function main(): void {
  const state = createAppState();

  document.body.appendChild(state.canvas);
  
  resizeCanvas(state);

  window.addEventListener('resize', () => resizeCanvas(state));
  window.addEventListener('mousemove', e => onMouseMove(e, state));
  window.addEventListener('mousedown', () => state.isMouseDown = true);
  window.addEventListener('mouseup', e => onMouseUp(e, state));
}

main();