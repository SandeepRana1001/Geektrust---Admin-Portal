import { useState } from "react"

import './table.css'

/**
     * 
     * @param {array} users - List of 10 users spliced from the all users array for current page
     * @param {function }deleteAllSelected  - function to delete all selected users
     * @param {function} deleteSelectedUsers - function to delete a single selected user
     * @param {function} addModaldata - function to get id of the the user to be edited
     * @returns {null}
*/

const Table = ({ users, deleteAllSelected, deleteSelected, addModaldata }) => {

    // array state to store all selected users
    const [selected, setSelected] = useState([])
    // state to check if select all is selected or not
    const [selectAll, setSelectAll] = useState(false)


    /**
     * Function to check if user is selected or not
     * @param {string} id - Id of the user
     * @returns {boolean} true if the user is selected and false otherwise
     */

    const isCheckboxChecked = (id) => {
        if (selected.includes(id)) {
            return true
        }
        return false
    }

    /**
     * Function to check and uncheck all users
     * @returns {null}
     */

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

    /**
     * add or removed user id from the selected array
     * @param {string} id - Id of the user 
     * @param {*} dependency  - not used -  for future use
     */

    const toggleSelectionList = (id, dependency = false) => {

        if (selected.includes(id)) {
            let index = selected.indexOf(id)
            selected.splice(index, 1)
            setSelected([...selected])
        } else {
            setSelected([id, ...selected])
        }
    }

    /**
     * Delete All function deletes all seleted users at once from memory
     * @return {null}
     */

    const deleteAll = () => {
        deleteAllSelected(selected)
        setSelectAll(false)
        setSelected([])
    }

    /**
     * Delete One Function delete only one user at a time
     * @return {null}
     */

    const deleteOne = (id) => {
        deleteSelected(id)
    }

    /**
     * Sends id to the modal data 
     * @param {string} id  - id of the user

     */

    const openEditModal = (id) => {
        addModaldata(id)
    }


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
                                                            <button
                                                                onClick={() => openEditModal(user.id, user.name, user.email, user.role)}
                                                            >
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