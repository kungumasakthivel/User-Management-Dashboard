import axios from "axios"
import { useState } from "react"
import { toast } from "react-toastify"
import PropTypes from 'prop-types';
import { TailSpin } from "react-loader-spinner";
import { validateEmail } from "./functions/validateMail";

const EditUser = ({ user }) => {
    const [name, setName] = useState(user.name)                 // user name from user object
    const [email, setEmail] = useState(user.email)              // user email from user object
    const [company, setCompany] = useState(user.company.name)   // user company.name from user object
    const [loading, setLoading] = useState(false);              // loading status for edit user api call


    const handleEdit = async ({ id }) => {
        console.log(id)
        try {

            // trim off the leading spaces and check for empty 
            // value for clint-side validation 
            if(name.trim().length <= 0) {
                return toast.error('Please enter your name!');
            }

            // validateing the provided email
            if(validateEmail(email) !== true) {
                return toast.error('Please enter valid email');
            }

            // trim off the leading spaces and check for empty 
            // value for clint-side validation 
            if(company.trim().length <= 0) {
                return toast.error('Please enter your company!');
            }
            setLoading(true);
            const updateData = {          // bundle user data for update api call
                name: name.trim(),
                email: email.trim(),
                company: company.trim()
            }
            
            // making patch request for updating user data
            const res = await axios.patch(`https://jsonplaceholder.typicode.com/users/${id}`, updateData);
            setLoading(false)
            console.log(res.data)
            if(res.status === 200 || res.status === 201) {
                toast.success('User updated successfully!')   // raising success notification 
            }
        } catch (err) {
            toast.error(err + ' in updating!')                // raise error notification
        }
    }

    return (
        <div className='flex flex-col items-center justify-center h-80'>
            {loading ? <div className="loader" ><TailSpin height="25" width="35" color="red" /></div>: null}
            <h1 className="text-2xl font-semibold mb-3">EDIT USER</h1>
            <input 
             value={name}
             onChange={(e) => setName(e.target.value)}
             className='border-2 border-cyan-50 w-70 p-2 pl-4 rounded-3xl mb-2' 
             type='text' 
             placeholder='Name'
            />
            <input 
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             className='border-2 border-cyan-50 w-70 p-2 pl-4 rounded-3xl mb-2' 
             type='email' 
             placeholder='Email' 
            />
            <input
             value={company}
             onChange={(e) => setCompany(e.target.value)}
             className='border-2 border-cyan-50 w-70 p-2 pl-4 rounded-3xl mb-2'
             type='text' 
             placeholder='Company' 
            />
            <button 
             className="btn px-4 py-2 font-medium text-sm border-2 rounded-3xl mt-6 cursor-pointer edit-save-btn"
             onClick={() => handleEdit(user.id)}
            >
                Update
            </button>
        </div>
    )
}

// prototyping the incoming object user
EditUser.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        company: PropTypes.shape({
            name: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
}


export default EditUser