import React, { useEffect, useState } from "react";
import { createPortal } from 'react-dom';
import useFetch from '../../customHooks/useFetch'
import Edit from "../edit/edit";
import Loader from "../loader/loader";
import Pagination from '../pagination/pagination'
import Table from "../table/table";
import { useSnackbar } from "notistack";

import { $ } from 'react-jquery-plugin'


import './home.css'
import Search from "../search/search";

/**
 * Home Function stores all function 
 * @returns {null}
 */

const Home = () => {

    // data fetched from API
    const [data] = useFetch()
    // state to store users for the current page
    const [users, setUsers] = useState([])
    // state to store all users from the server
    const [allUsers, setAllUsers] = useState([])
    // state to store all backup users to avoid making api call after search
    const [backupUsers, setBackupUsers] = useState([])
    // state to store the current page
    const [currentPage, setCurrentPage] = useState(0)
    // state to store the page limit
    const [pageLimit, setPageLimit] = useState(0)
    // state to store the loading state
    const [loading, setLoading] = useState(true)
    // state to store the range state
    const [range, setRange] = useState([])
    // state to store the id of the user to be updated
    const [userToBeUpdated, setUserToBeUpdated] = useState()
    // from notistack to show snackbar
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();


    /**
     * Displays the snackbar
     * @param {string} msg - the message to be displayed
     * @param {string} variant - sets the color of the snackbar
     */

    const showSnackbar = (msg, variant) => {
        enqueueSnackbar(msg, {
            variant: variant,
            snackbarprops: 'data-role="alert"'

        })
    }

    /**
     * Sets the pagination logic and sets the current page and the data
     * @param {integer} currentPage  - current page
     * @returns {null}
    */

    const paginationLogic = (currentPage) => {
        setCurrentPage(currentPage)
        let record = currentPage * 10
        let limit = (currentPage + 1) * 10
        const sliced = allUsers.slice(record, limit)
        setUsers([...sliced])
    }

    /**
     * Function to generate a range based on Maths formula
     * Determines the page numbers
     * @returns {null}
     */

    const generateRange = () => {
        let arr = []
        let limit = Math.round((allUsers.length) / 10)
        for (let i = 1; i <= limit; i++)
            arr.push(i)
        setRange([...arr])
    }

    /**
     * Function to remove all users that are selected using selectAll
     * @param {array} data  - Array of users 
     * @returns {null}
     * 
     */

    const deleteAllSelected = (data) => {
        const arr = allUsers.filter((user) => {
            return !data.includes(user.id)
        })
        setAllUsers([...arr])
        showSnackbar('Records Deleted Successfully', 'success')

    }

    /**
     * Delete one record at a time whenever the trash button is clicked
     * @param {string} id  - Id of the user to be deleted
     * @returns {null}
     */

    const deleteSelected = (id) => {
        const arr = allUsers.filter((user) => {
            return user.id != id
        })
        setAllUsers([...arr])
        showSnackbar('Record Deleted Successfully', 'success')
    }

    /**
     * Function to determine which page  user should navigate to whenver the next or prev buttons are clicked
     * @param {string} toggleType - Increment to move to next page and decrement to move to previous page
     * @returns {null}
     */

    const togglePage = (toggleType) => {
        if (toggleType === 'INCREMENT' && currentPage !== pageLimit - 1) {
            setCurrentPage(currentPage + 1)
        } else {
            if (currentPage !== 0)
                setCurrentPage(currentPage - 1)
        }
    }

    /**
     * Function to activate the Editing modal and pass the user id to be edited
     * @param {string} id 
     * @returns {null}
     */

    const addModaldata = (id) => {
        setUserToBeUpdated(id)
        $('#editModal').modal('show')
    }

    /**
     * Function to update the edited user from the editing modal
     * @param {string} id  - the id of the user to be updated
     * @param {string} name - the updated user name
     * @param {string} email  - the updated user email
     * @param {string} role  - the updated user role
     * @returns {null}
     * 
    */

    const updateUserData = (id, name, email, role) => {
        const arr = allUsers.map((user) => {
            if (user.id === id) {
                user.name = name
                user.email = email
                user.role = role
            }
            return user
        })
        setAllUsers([...arr])
        setBackupUsers([...arr])

        $('#editModal').modal('hide')
        showSnackbar('Record Updated Successfully', 'success')

    }

    /**
     * Function to filter data based on the search
     * @param {string} data  - data received from search bar after debouncing
     * @returns {null}
     */

    const getResponse = (data) => {
        if (data.trim().length === 0) {
            setAllUsers([...backupUsers])
        } else {
            const regex = new RegExp(data)
            let arr = allUsers.filter((user) => {
                return user.name.toLowerCase().match(regex) || user.email.toLowerCase().match(regex) || user.role.toLowerCase().match(regex)
                // || user.email === data || user.role === data
            })
            setAllUsers([...arr])
        }
    }

    /**
     * Use Effect will run everytime data is changed
     */

    useEffect(() => {
        setAllUsers([...data])
        setBackupUsers([...data])
        paginationLogic(currentPage)
        let limit = Math.round((allUsers.length) / 10)
        setPageLimit(limit)
        generateRange()
        setLoading(false)

    }, [data])

    /**
     * Use Effect will run everytime All Users and Current page is changed
    */

    useEffect(() => {
        paginationLogic(currentPage)
        let limit = Math.round((allUsers.length) / 10)
        setPageLimit(limit)
        generateRange()
        setLoading(false)
    }, [allUsers, currentPage])


    return (
        <div className="container mt-5">
            {
                loading && allUsers.length === 0 &&
                <Loader loading={loading} msg='Loading.... Please Wait' />
            }

            {
                !loading &&
                <Search
                    getResponse={getResponse}
                />
            }

            {
                !loading && allUsers.length === 0 &&
                <div id="no_data">
                    <h5 className="text-center">
                        No data found
                        <span>
                            <i className="fa-regular fa-face-sad-tear"></i>
                        </span>
                    </h5>
                </div>
            }

            {
                !loading && allUsers.length > 0 &&
                <div>

                    <Table
                        users={users}
                        deleteAllSelected={deleteAllSelected}
                        deleteSelected={deleteSelected}
                        addModaldata={addModaldata}
                    />

                    <Pagination
                        currentPage={currentPage}
                        range={range}
                        paginationLogic={paginationLogic}
                        pageLimit={pageLimit}
                        togglePage={togglePage}
                    />
                </div>
            }
            {
                createPortal(
                    <Edit
                        id={userToBeUpdated}
                        updateUserData={updateUserData}
                    />
                    ,
                    document.getElementById('edit-portal')
                )}

        </div>
    )
}

export default Home