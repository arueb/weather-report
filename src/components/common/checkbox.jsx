const Checkbox = ({stateProp, onChange, label, value, id}) => {
    return (
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id={id} onChange={(e)=>onChange(stateProp)} checked={value}/>
        <label className="form-check-label" htmlFor={id}>
          {label}
        </label>
    </div>
    )
  }

  export default Checkbox;