import axios from "axios"
import { useState } from "react"
import { TailSpin } from "react-loader-spinner";
import { toast } from 'react-toastify';
import { validateEmail } from "./functions/validateMail";

const AddUser = () => {
    const [name, setName] = useState('')              // to store name value for new user
    const [email, setEmail] = useState('')            // to store email value for new user
    const [company, setCompany] = useState('')        // to store company value for new user
    const [loading, setLoading] = useState(false);    // loading status for creating new user

    

    const handleSubmit = async () => {
        
        // trim off the leading spaces from name and check for empty 
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
        const postData = {         // storing all user data in one object for post method
            name: name.trim(),
            email: email.trim(),
            company: company.trim()
        }
        try {
            // making post request for adding new user
            const res = await axios.post('https://jsonplaceholder.typicode.com/users', postData);
            setLoading(false)
            if(res.status === 200 || res.status === 201) {
                toast.success('User added successfully!')   // calling success notification           
            }
        } catch (err) {
            toast.error('Error: ' + err)   // calling error notification 
        }
    }
  return (
    <div className='flex flex-col items-center justify-center h-80'>
        {loading ? 
            <div className="loader" ><TailSpin height="25" width="35" color="red" /></div>   // spinning loader
            : null
        }
        <h1 className="text-2xl font-semibold mb-3">NEW USER</h1>
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
         className="btn px-4 py-2 font-medium text-sm border-2 rounded-3xl mt-6 cursor-pointer add-user-btn"
         onClick={handleSubmit}
        >
            Add User
        </button>
    </div>
  )
}

export default AddUser
