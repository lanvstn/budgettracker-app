import "./Label.css"

function Label(props) {
  const color = props.colorMap[props.text]?.color;
  const labelClass = `label ${props.big ? "big" : ""}`;

  return <span
    style={{ backgroundColor: color === undefined ? "black" : color }}
    className={labelClass}
    onClick={props.onClick === undefined ? null : props.onClick}
  >{props.text}</span >;
}

export default Label
