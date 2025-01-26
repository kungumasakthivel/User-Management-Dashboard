import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';

const ListUsers = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col justify-center items-center mb-5">
        <p className="font-bold text-3xl my-5 md:mb-10">Users List</p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-12'>
          {data.map(user => (
            <Card key={user.id} user={user} />
          ))}
        </div>
    </div>
  )
}

export default ListUsers