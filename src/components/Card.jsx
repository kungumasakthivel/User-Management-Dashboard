import PropTypes from 'prop-types';
import gsap from 'gsap';
// import { SplitText } from 'gsap/SplitText';
import { useRef, useEffect, useState } from 'react';
// gsap.registerPlugin(SplitText) 
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import EditUser from './EditUser';

 const Card = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);

    const textRef = useRef(null);
    useEffect(() => {
        // let typeSplit = new SplitText(textRef.current, {
        //     types: 'lines, words, chars',
        //     tagName: 'span'
        // })

        gsap.to('.anim', {
            x: '10%',
            opacity: 1,
            duration: 1,
            ease: 'power1.out',
            stagger: 0.1,
        })

    }, [])

    const handleDelete = async (id) => {
      try {
      const res = await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      if(res.status === 200) {
        toast.success('Successfully deleted user with ID ' + id)
      }
    } catch (err) {
      toast.error('Error in deleting user! ' + err)
    }
    }

   return (
     <div ref={textRef} className="card-box rounded-xl anim opacity-0">
         <div className="p-2">
             <div className="flex flex-row justify-start gap-2  ">
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
                <Modal
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
                  <button className='cursor-pointer' onClick={() => setIsOpen(false)}>Close</button>
                </Modal>
             </div>
         </div>
     </div>
   )
 }

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