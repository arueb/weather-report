const Button = ({onClick, label, id, style="btn btn-primary" }) => {
    return (
      <button id={id} onClick={onClick} className={style}>{label}</button>
    )
  }

  export default Button;