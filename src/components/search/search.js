import { useState } from 'react'
import './search.css'

/**
 * 
 * @param {function} getResponse - sends response to parent based on search 
 * @returns {null}
 */

const Search = ({ getResponse }) => {

    // state of the value in the search bar
    const [value, setValue] = useState('')
    // state for the debouncing timer
    const [debounceTimer, setDebounceTimer] = useState(null);

    /**
     * Debouce the search to reduce the hits on per change 
     * @param {object} event 
     * @returns {null}
     */

    const debounceSearch = (event) => {
        setValue(event.target.value)
        if (debounceTimer) {
            clearTimeout(debounceTimer)
        }

        let value = event.target.value
        let timer;


        timer = setTimeout(() => {
            getResponse(value.toLowerCase())
        }, 500)

        setDebounceTimer(timer)

    };


    return (
        <div className="container mb-4">
            <input
                type="search"
                placeholder='Search By Name'
                className='form-control'
                value={value}
                onChange={(event) => debounceSearch(event)}
            />
        </div>
    )
}

export default Search