import PropTypes from 'prop-types';
import gsap from 'gsap';
// import { SplitText } from 'gsap/SplitText';
import { useRef, useEffect } from 'react';
// gsap.registerPlugin(SplitText) 

 const Card = ({ user }) => {
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
   return (
     <div ref={textRef} className="card-box rounded-xl anim opacity-0">
         <div className="p-2">
             <div className="flex flex-row justify-start gap-2  ">
                 <div className="self-start">
                     <p>{user.id}</p>
                 </div>
                 <div className="text-left">
                     <p>Name: {user.name}</p>
                     <p>Email: {user.email}</p>
                     <p>Company: {user.company.name}</p>
                 </div>
             </div>
             <div className='btn-container flex flex-row justify-between items-center'>
                <button 
                  className='mx-2 my-1 px-2 py-1 border-2 border-cyan-50 rounded-xl cursor-pointer'
                  onClick={}
                >
                  Delete
                </button>
                <button 
                  className='mx-2 my-1 px-2 py-1 border-2 border-cyan-50 rounded-xl cursor-pointer'
                >
                  Edit
                </button>
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