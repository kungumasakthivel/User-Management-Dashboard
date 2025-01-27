import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Card from './Card';
import AddUser from './AddUserPopUp';
import { ToastContainer } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';

const ListUsers = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

 Modal.setAppElement('#root');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(data);

  if (loading) return (
    <div className='flex justify-center items-center h-full w-full'>
      <TailSpin height="40" width="40" color="red" />
    </div>
  );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col justify-center items-center mb-5">
        <p className="font-bold text-3xl my-5 md:mb-10 heading-user-list">Users List</p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-12'>
          {data.map(user => (
            <Card key={user.id} user={user} />
          ))}
        </div>
        <button
         className='btn px-4 py-2 font-medium text-xl border-2 rounded-3xl add-btn'
         onClick={() => setIsOpen(true)}
        >
          Add
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
          <AddUser setIsOpen={isOpen}/>
          <button className='cursor-pointer hover:text-red-400' onClick={() => setIsOpen(false)}>Close</button>
        </Modal>
        <ToastContainer />
    </div>
  )
}

export default ListUsers