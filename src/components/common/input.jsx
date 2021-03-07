const Input = ({ onChange, value, id, label }) => {
    return (
      <div className="form-floating">
      <input onChange={(e)=> onChange(e.target.value)} type="text" value={value} id={id} className="form-control" placeholder="name@example.com"/>
        <label htmlFor={id}>{label}</label>
      </div>
    )
  }

  export default Input;