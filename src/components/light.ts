type LightProps = {
  val: boolean;
  row: number;
  col: number;
  handleLightClick: (row: number, col: number) => void;
  isGameOver: boolean;
};

export default function Light({ val, row, col, handleLightClick, isGameOver }: LightProps): JSX.Element {
  return (
    <button
      className={val ? 'lightOn' : 'lightOff'}
      onClick={() => handleLightClick(row, col)}
      aria-pressed={val}
      disabled={isGameOver}
      aria-disabled={isGameOver}
    />
  );
}