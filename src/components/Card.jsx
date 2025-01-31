import PropTypes from 'prop-types';
import gsap from 'gsap';
import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import EditUser from './EditUserPopUp';
import { TailSpin } from 'react-loader-spinner';

 const Card = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);       // modal open status
    const [loading, setLoading] = useState(false);     // loading status for delete api call

    const textRef = useRef(null);
    useEffect(() => {

        gsap.to('.anim', {
            x: '10%',
            opacity: 1,
            duration: 1,
            ease: 'power1.out',
            stagger: 0.1,
        }) // adding sliding animation for card's 

    }, [])

    const handleDelete = async (id) => {
      try {
        setLoading(true)
        // making delete request to delete user with specific id
        const res = await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`); 
        setLoading(false)
        if(res.status === 200) {
          toast.success('Successfully deleted user with ID ' + id) // raising success notification 
        }
      } catch (err) {
        toast.error('Error in deleting user! ' + err) // raising error notification
      }
    }

   return (
     <div ref={textRef} className="card-box rounded-xl anim opacity-0">
         <div className="p-2">
            {loading ? <div className="del-loader" ><TailSpin height="20" width="25" color="red" /></div>: null}
             <div className="flex flex-row justify-start gap-2 mb-3">
                 <div className="self-start text-lg">
                     <p>{user.id}</p>
                 </div>
                 <div className="text-left text-lg">
                     <p>Name: {user.name}</p>
                     <p>Email: {user.email}</p>
                     <p>Company: {user.company.name}</p>
                 </div>
             </div>
             <div className='btn-container flex flex-row justify-between items-center'>
                <button 
                  className='mx-2 my-1 px-2 py-1 border-2 border-cyan-50 rounded-xl del-btn'
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
                <button 
                  className='mx-2 my-1 px-2 py-1 border-2 border-cyan-50 rounded-xl edit-btn'
                  onClick={() => setIsOpen(true)}
                >
                  Edit
                </button>
                <Modal // modal popup for editing user details
                  isOpen={isOpen}
                  onRequestClose={() => setIsOpen(false)}
                  style={{
                    content: {
                      top: '50%',
                      left: '50%',
                      right: 'auto',
                      bottom: 'auto',
                      marginRight: '-50%',
                      minWidth: 'auto',
                      minHeight: '50vh',
                      transform: 'translate(-50%, -50%)',
                      borderRadius: '25px',
                      backgroundImage: 'linear-gradient(135deg, #071952 10%, #088395 180%)'
                    },
                  }}
                >
                  <EditUser user={user}/>
                  <button className='cursor-pointer hover:text-red-400' onClick={() => setIsOpen(false)}>Close</button>
                </Modal>
             </div>
         </div>
     </div>
   )
 }


 // prototyping the incoming object user
 Card.propTypes = {
   user: PropTypes.shape({
     id: PropTypes.number.isRequired,
     name: PropTypes.string.isRequired,
     email: PropTypes.string.isRequired,
     company: PropTypes.shape({
       name: PropTypes.string.isRequired
     }).isRequired
   }).isRequired
 }; 

 export default Card