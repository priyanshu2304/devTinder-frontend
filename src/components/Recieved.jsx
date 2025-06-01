import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../utils/axiosInstance';
import { addRequest } from '../store/requestSlice';
import Loader from './Loader';
import UserCard from './UserCard';

const Recieved = () => {
  const dispatch = useDispatch();
  const request = useSelector((store) => store.request);
  const [loading, setLoading] = useState(true);

  const fetchRequest = async () => {
    try {
      const resp = await axios.get('/user/requests/recieved');
      dispatch(addRequest(resp.data));
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  const handleRequest = async (status, id) => {
    try {
      const resp = await axios.post(`/request/review/${status}/${id}`);
      fetchRequest();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      {request.length === 0 ? (
        <div className="text-center text-lg text-gray-500">
          No requests found.
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {request.map((item) => {
            const { firstName, lastName, gender, age, skills, about } =
              item.fromUserId;
            const resp = { firstName, lastName, gender, age, skills, about };
            return (
              <UserCard
                key={item._id}
                user={resp}
                handlePrimary={() => handleRequest('accepted', item._id)}
                handleSecondary={() => handleRequest('rejected', item._id)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Recieved;
