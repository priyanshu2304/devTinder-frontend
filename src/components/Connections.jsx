import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../store/connectionSlice';
import Loader from './Loader';
import UserCard from './UserCard';

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  console.log('connections', connections);
  const dispatch = useDispatch();

  const fetchConnection = async () => {
    try {
      const resp = await axios.get('/user/connections/accepted');
      dispatch(addConnection(resp.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  if (!connections) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <h1 className="text-2xl font-semibold text-gray-700">
          <Loader />
        </h1>
      </div>
    );
  } else if (Array.isArray(connections) && connections.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <h1 className="text-2xl font-semibold text-gray-700">
          No Connections Found
        </h1>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 my-10">
        <h1 className="text-4xl font-bold text-center primary mb-6 tracking-wide">
          Connections
        </h1>
        {connections.map((connection) => (
          <div key={connection._id}>
            <UserCard user={connection} shouldShowButton={false} />
          </div>
        ))}
      </div>
    );
  }
};

export default Connections;
