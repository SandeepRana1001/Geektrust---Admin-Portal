import { useState } from 'react'
import './search.css'

const Search = ({ getResponse }) => {

    const [value, setValue] = useState('')
    const [debounceTimer, setDebounceTimer] = useState(null);



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