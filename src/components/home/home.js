import React, { useEffect, useState } from "react";
import { createPortal } from 'react-dom';
import useFetch from '../../customHooks/useFetch'
import Edit from "../edit/edit";
import Loader from "../loader/loader";
import Pagination from '../pagination/pagination'
import Table from "../table/table";

import { $ } from 'react-jquery-plugin'


import './home.css'
import Search from "../search/search";
const Home = () => {

    const [data] = useFetch()
    const [users, setUsers] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [backupUsers, setBackupUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [pageLimit, setPageLimit] = useState(0)
    const [loading, setLoading] = useState(true)
    const [range, setRange] = useState([])
    const [userToBeUpdated, setUserToBeUpdated] = useState()

    const paginationLogic = (currentPage) => {
        setCurrentPage(currentPage)
        let record = currentPage * 10
        let limit = (currentPage + 1) * 10
        const sliced = allUsers.slice(record, limit)
        setUsers([...sliced])
    }

    const generateRange = () => {
        let arr = []
        let limit = Math.round((allUsers.length) / 10)
        for (let i = 1; i <= limit; i++)
            arr.push(i)
        setRange([...arr])
    }



    useEffect(() => {
        setAllUsers([...data])
        setBackupUsers([...data])
        paginationLogic(currentPage)
        let limit = Math.round((allUsers.length) / 10)
        setPageLimit(limit)
        generateRange()
        setLoading(false)

    }, [data])

    useEffect(() => {
        paginationLogic(currentPage)
        let limit = Math.round((allUsers.length) / 10)
        setPageLimit(limit)
        generateRange()
        setLoading(false)
    }, [allUsers, currentPage])

    const deleteAllSelected = (data) => {
        const arr = allUsers.filter((user) => {
            return !data.includes(user.id)
        })
        setAllUsers([...arr])
    }

    const deleteSelected = (id) => {
        const arr = allUsers.filter((user) => {
            return user.id != id
        })
        setAllUsers([...arr])
    }

    const togglePage = (toggleType) => {
        if (toggleType === 'INCREMENT' && currentPage !== pageLimit - 1) {
            setCurrentPage(currentPage + 1)
        } else {
            if (currentPage !== 0)
                setCurrentPage(currentPage - 1)
        }
    }

    const addModaldata = (id) => {
        setUserToBeUpdated(id)
        $('#editModal').modal('show')
    }

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
    }

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
            {createPortal(
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