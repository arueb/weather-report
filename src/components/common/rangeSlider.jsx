const RangeSlider = ({ onChange, value, id, label, stateProp, min, max }) => {
    return (
      <div className="d-flex range-group">
        <div className="range-label">
          <label htmlFor="customRange2" className="form-label">{label}</label>
        </div>
        <div className="range-input flex-grow-1">
          <input 
            type="range" 
            className="form-range" 
            min={min} 
            max={max} 
            id={id} 
            onChange={(e)=>onChange(e.target.value, stateProp)}
            value={value}
            />
          </div>
        <div className="range-value">
          <span id="minHighTempValue">{value}</span>
        </div>
      </div>
    )
  }

  export default RangeSlider;