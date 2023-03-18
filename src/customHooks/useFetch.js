import { useState, useEffect } from "react"
import { useSnackbar } from "notistack"
import axios from "axios"

/**
 * 
 * @param {string} url  - API  endpoint to be connect to backend or api endpoint
 * @returns {array} data - array of the response received from the backend or api endpoint
 */

const useFetch = (url) => {

    // state to set the data to be returned
    const [data, setData] = useState([])
    // snackbar from notistack
    const { enqueueSnackbar } = useSnackbar()

    /**
     * Displays the snackbar
     * @param {string} msg - the message to be displayed
     * @param {string} variant - sets the color of the snackbar
     */


    const showSnackBar = (msg, variant) => {
        enqueueSnackbar(msg, {
            variant: variant,
            snackbarprops: 'data-role="alert"'

        })
    }

    /**
     * Function to fetch data from backend / api endpoint using axios
     * @returns {null}
     */

    const fetchData = () => {
        try {
            axios.get(`${process.env.REACT_APP_BACKEND}`)
                .then((data) => {
                    setData(data.data)
                })
                .catch((err) => {
                    showSnackBar('Network Error', 'error')
                })
        } catch (err) {
            showSnackBar('Something went wrong', 'error')
        }
    }

    //use effect

    useEffect(() => {
        fetchData()
    }, [url])


    return [data]
}


export default useFetch