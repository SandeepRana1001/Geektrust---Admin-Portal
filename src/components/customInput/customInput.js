import './customInput.css'

/**
 * Custom Input Function to create reduce recreating input component again and again
 * @param {string} label - Label of the input
 * @param {string} value - Value of the input
 * @param {string} type - Type of the input
 * @param {string} name - Name of the input
 * @param {string} classes - List of classes to use for the input
 * @param {function} onChangeHandler - function to call when the input is changed
 * @param {string} value - Value of the input
 * @param {string} error - Error of  the input
 * @returns {null}
 */

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