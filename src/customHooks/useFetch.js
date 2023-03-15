import { useState, useEffect } from "react"
import { useSnackbar } from "notistack"
import axios from "axios"

const useFetch = (url) => {
    const [data, setData] = useState([])
    const { enqueueSnackbar } = useSnackbar()

    /*
        * Snackbar is used to show error message in a pop up faishon
     *  Accepts - msg - @string - Message to be displayed
     *  Accepts -  Variant - @string - color of the snackbar
     * 
     *  returns  - @void
     */

    const showSnackBar = (msg, variant) => {
        enqueueSnackbar(msg, {
            variant: variant,
            snackbarprops: 'data-role="alert"'

        })
    }



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

    useEffect(() => {
        fetchData()
    }, [url])


    return [data]
}


export default useFetch