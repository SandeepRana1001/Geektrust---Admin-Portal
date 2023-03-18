import { useState } from 'react'
import CustomInput from '../customInput/customInput'
import './edit.css'

/**
 * Edit - A Bootstrap modal dialog allows user to edit the data
 * @param {String} id The id of the modal
 * @param {Function} function to update the users
 * @return {null}
 */


const Edit = ({ id, updateUserData }) => {

    // State for managing  Errors
    const [error, setError] = useState({
        name: '',
        email: '',
        role: ''
    })

    // State for managing user data
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        role: ''
    })

    /** 
     *  function for checking if there is a error
     * @returns {boolean} true if there is a error , false otherwise
     * 
    */
    const doeFormHasError = () => {
        let msg = ''
        let field = ''
        let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        let error = false
        if (userData.name.trim().length < 3) { // validate name
            error = true
            field = 'name'
            msg = 'Name must be at least 3 characters long'
            setError((prev) => ({
                email: '',
                role: '',
                [field]: msg
            }))
        } else if (!filter.test(userData.email)) { // validate email
            error = true
            field = 'email'
            msg = 'Please enter a valid email address'
            setError((prev) => ({
                name: '',
                role: '',
                [field]: msg
            }))
        } else if (userData.role.trim().length === 0) { // validate role
            error = true
            field = 'role'
            msg = 'Please enter a role'
            setError((prev) => ({
                name: '',
                email: '',
                [field]: msg
            }))
        } else {
            error = false
        }

        if (!error) { // if no error - clear State errors
            setError((prev) => ({
                name: '',
                email: '',
                role: ''
            }))
        }

        return error
    }

    /**
     * Function to handle the input value and userData values
     * @param {event} Event Object received 
     * @returns {null}
     */

    const onChangeHandler = (event) => {
        console.log(userData)
        const field = event.target.name
        const value = event.target.value
        setUserData((data) => ({
            ...data,
            [field]: value
        }))
    }

    /**
     * Update Detail updates the user list if there is no error 
     * Clears the user and error state for next record
     * @returns {null} 
     */

    const updateDetails = () => {
        if (doeFormHasError()) {
            return false
        }

        updateUserData(id, userData.name, userData.email, userData.role)

        setUserData((prev) => ({
            name: '',
            email: '',
            role: ''
        }))


        setError((prev) => ({
            name: '',
            email: '',
            role: ''
        }))
    }

    return (
        <section id="edit">
            <div className="modal fade" id="editModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                <div className="modal-dialog  modal-fullscreen">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="editModalLabel">Edit User Details</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='container'>
                                <div className='row justify-content-center'>
                                    <div className='col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12'>

                                        <CustomInput
                                            label='New Name'
                                            type='text'
                                            classes={error.name.trim().length > 0 ? 'error' : 'success'}
                                            name='name'
                                            value={userData.name}
                                            error={error.name}
                                            onChangeHandler={onChangeHandler}
                                        />

                                        <CustomInput
                                            label='New Email'
                                            type='email'
                                            classes={error.email.trim().length > 0 ? 'error' : 'success'}
                                            name='email'
                                            value={userData.email}
                                            error={error.email}
                                            onChangeHandler={onChangeHandler}
                                        />

                                        <CustomInput
                                            label='New Role'
                                            type='text'
                                            classes={error.role.trim().length > 0 ? 'error' : 'success'}
                                            name='role'
                                            value={userData.role}
                                            error={error.role}
                                            onChangeHandler={onChangeHandler}
                                        />
                                        <div className='form-btn'>
                                            <button
                                                type='button'
                                                className='btn theme text-light full-width'
                                                onClick={updateDetails}
                                            >
                                                Update Data
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Edit