import axios from "axios"
import { useState } from "react"
import { toast } from "react-toastify"
import PropTypes from 'prop-types';
const EditUser = ({ user }) => {
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [company, setCompany] = useState(user.company.name)

    const validateEmail = (email) => {
        email = email.trim();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleEdit = async ({ id }) => {
        console.log(id)
        try {
            if(name.trim().length <= 0) {
                return toast.error('Please enter your name!');
            }
            if(validateEmail(email) !== true) {
                return toast.error('Please enter valid email');
            }
            if(company.trim().length <= 0) {
                return toast.error('Please enter your company!');
            }
            const updateData = {
                name: name.trim(),
                email: email.trim(),
                company: company.trim()
            }

            const res = await axios.patch(`https://jsonplaceholder.typicode.com/users/${id}`, updateData);
            console.log(res.data)
            if(res.status === 200 || res.status === 201) {
                toast.success('User updated successfully!')        
            }
        } catch (err) {
            toast.error(err + ' in updating!')
        }
    }

    return (
        <div className='flex flex-col items-center justify-center h-80'>
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
             className="btn px-4 py-2 font-medium text-sm border-2 rounded-3xl mt-6 cursor-pointer"
             onClick={() => handleEdit(user.id)}
            >
                Update
            </button>
        </div>
    )
}

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