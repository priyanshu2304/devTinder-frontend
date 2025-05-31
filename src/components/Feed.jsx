import React, { useEffect } from 'react';
import axios from '../utils/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../store/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed?.userFeed);

  const fetchFeed = async () => {
    const feed = await axios.get(`/feed?page=1&limit=10`);
    dispatch(addFeed({ ...feed.data }));
    try {
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);
  if (feedData && feedData.length > 0) {
    return (
      <div className="flex justify-center h-full items-center my-10">
        <UserCard user={feedData[0]} />
      </div>
    );
  }
};

export default Feed;
