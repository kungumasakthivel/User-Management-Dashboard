 import PropTypes from 'prop-types';

 const Card = ({ user }) => {
   return (
     <div className="card-box rounded-xl">
         <div className=" shadow p-2">
             <div className="flex flex-row justify-start gap-2">
                 <div className="self-start">
                     <p>{user.id}</p>
                 </div>
                 <div className="text-left">
                     <p>Name: {user.name}</p>
                     <p>Email: {user.email}</p>
                     <p>Company: {user.company.name}</p>
                 </div>
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