import React, { useEffect, useState } from "react";
import useFetch from '../../customHooks/useFetch'
import Loader from "../loader/loader";
import Pagination from '../pagination/pagination'
import Table from "../table/table";

import './home.css'
const Home = () => {

    const [data] = useFetch()
    const [users, setUsers] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [pageLimit, setPageLimit] = useState(0)
    const [loading, setLoading] = useState(true)
    const [range, setRange] = useState([])

    const paginationLogic = (currentPage) => {
        setCurrentPage(currentPage)
        let record = currentPage * 10
        let limit = (currentPage + 1) * 10
        const sliced = allUsers.slice(record, limit)
        setUsers([...sliced])
        console.clear()
        console.log(`pageLimit`)
        console.log(pageLimit)
        console.log(`currentPage`)
        console.log(currentPage)
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
        paginationLogic(currentPage)
        let limit = Math.round((allUsers.length) / 10)
        setPageLimit(limit)
        generateRange()
    }, [data])

    useEffect(() => {
        paginationLogic(currentPage)
        setLoading(false)
    }, [allUsers, currentPage])

    const togglePage = () => {
        setCurrentPage(currentPage + 1)
    }

    return (
        <div className="container">
            <button onClick={togglePage}>Button</button>
            <Loader loading={loading} msg='Loading.... Please Wait' />
            <Table users={users} />
            {
                !loading &&
                users.map((user) => {
                    return <div key={user.id}>
                        {user.name} - {user.id}
                    </div>
                })
            }
            {
                !loading &&
                <Pagination
                    currentPage={currentPage}
                    range={range}
                    paginationLogic={paginationLogic}
                    pageLimit={pageLimit}
                />
            }

        </div>
    )
}

export default Home