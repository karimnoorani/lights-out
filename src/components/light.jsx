export default function Light(props){
  return (
    <button 
      className={props.val ? "lightOn" : "lightOff"}
      onClick={() => props.handleLightClick(props.row, props.col)}
      aria-pressed={props.val}
      disabled={props.isGameOver}
      aria-disabled={props.isGameOver}
    >
    </button>)
}