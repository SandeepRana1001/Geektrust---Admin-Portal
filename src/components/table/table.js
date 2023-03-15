import { useEffect, useState } from "react"

const Table = ({ users }) => {

    const [selected, setSelected] = useState({})
    const [selectAll, setSelectAll] = useState(false)

    const isCheckboxChecked = (id) => {
        if (selected[id] === true) {
            return true
        }
        return false
    }

    const toggleSelectAll = () => {
        setSelectAll(!selectAll)
    }

    const toggleSelectionList = (id) => {
        if (!selected[id]) {
            setSelected((prev) => ({
                [id]: true,
                ...prev
            }))
        } else {
            setSelected((prev) => ({
                [id]: false,
                ...prev
            }))
        }
    }

    useEffect(() => {
        console.clear()
        console.log(selected)
    }, [selected])

    return (
        <section>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">
                                            <input type='checkbox'
                                                onClick={toggleSelectAll}
                                                className='form-check-inline'
                                            />
                                        </th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.map((user) => {
                                            return (
                                                <tr key={user.id}>
                                                    <td>
                                                        <input type='checkbox' id={user.id}
                                                            // defaultChecked={isCheckboxChecked(user.id)}
                                                            checked={selectAll || isCheckboxChecked(user.id)}
                                                            onChange={() => toggleSelectionList(user.id)}
                                                            className='form-check-inline' />
                                                    </td>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.role}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Table