import './customInput.css'

const CustomInput = ({ label, id, type, name, classes, onChangeHandler, value, error }) => {
    return (
        <div className={`form-group ${classes}`}>
            <label htmlFor={id}>{label} : </label>
            <input
                type={type}
                value={value}
                name={name}
                onChange={onChangeHandler}
                className='form-control'
                id={id}
            />
            {
                error.length > 0 &&
                <div id='msg'>

                    <span>
                        <i className="fa-sharp fa-solid fa-circle-exclamation"></i>
                    </span>

                    <span>
                        {error}
                    </span>

                </div>
            }

        </div>

    )
}

export default CustomInput