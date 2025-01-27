import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const EditUser = ({user}) => {
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [company, setCompany] = useState(user.company.name)

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
        >
            Add User
        </button>
    </div>
  )
}

export default EditUser