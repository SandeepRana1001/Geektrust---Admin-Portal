import { useEffect, useState } from "react"
import './table.css'


const Table = ({ users, deleteAllSelected, deleteSelected }) => {

    const [selected, setSelected] = useState([])
    const [selectAll, setSelectAll] = useState(false)

    const isCheckboxChecked = (id) => {
        if (selected.includes(id)) {
            return true
        }
        return false
    }

    const toggleSelectAll = () => {
        setSelected([])
        if (!selectAll) {
            let arr = []
            for (let user of users) {
                if (!selected.includes(user.id))
                    arr.push(user.id)
            }
            setSelected([...selected, ...arr])
        }
        setSelectAll(!selectAll)
    }

    const toggleSelectionList = (id, dependency = false) => {

        if (selected.includes(id)) {
            let index = selected.indexOf(id)
            selected.splice(index, 1)
            setSelected([...selected])
        } else {
            setSelected([id, ...selected])
        }
    }

    const deleteAll = () => {
        deleteAllSelected(selected)
        setSelectAll(!selectAll)
        setSelected([])
    }

    const deleteOne = (id) => {
        deleteSelected(id)
    }

    useEffect(() => {

    }, [selected])

    // Use effect to check if everything is select
    // if yes select the select all dropdown


    return (
        <section>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12">
                        <div className="table-responsive-sm">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">
                                            <input type='checkbox'
                                                onChange={toggleSelectAll}
                                                className='form-check-inline'
                                                checked={selectAll}
                                            />
                                        </th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Role</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.map((user) => {
                                            return (
                                                <tr key={user.id} onClick={() => toggleSelectionList(user.id, false)}
                                                    className={`table-row ${selectAll || isCheckboxChecked(user.id) ? 'selected' : ''}`}
                                                >
                                                    <td>
                                                        <input type='checkbox' id={user.id}
                                                            // defaultChecked={isCheckboxChecked(user.id)}
                                                            checked={selectAll || isCheckboxChecked(user.id)}
                                                            onChange={() => toggleSelectionList(user.id)}
                                                            className='form-check-inline'
                                                        />
                                                    </td>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td className="role">{user.role}</td>
                                                    <td>
                                                        <div className="d-flex justify-content-center" id="actions">
                                                            <button>
                                                                <i className="fa-sharp fa-regular fa-pen-to-square"></i>
                                                            </button>
                                                            <button
                                                                onClick={() => deleteOne(user.id)}
                                                            >
                                                                <i className="fa-regular fa-trash-can"></i>                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="align-left mt-3">
                            <button
                                type="button"
                                className={`btn ${selectAll || selected.length > 0 ? 'active' : 'disabled'}`}
                                id="deleteAll"
                                onClick={deleteAll}
                            >
                                <span>
                                    Delete Selected
                                </span>

                                <span>
                                    <i className="fa-regular fa-trash-can"></i>
                                </span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Table