import React, { useEffect, useRef, useState } from 'react';
import axios from '../utils/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed, clearFeed } from '../store/feedSlice';
import UserCard from './UserCard';
import Loader from './Loader';

const Feed = () => {
  const dispatch = useDispatch();
  const { userFeed, page, totalCount, limit } = useSelector(
    (store) => store.feed
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const hasFetched = useRef(false); // ✅ track if feed was fetched already

  const fetchFeed = async (nextPage = 1) => {
    try {
      setLoading(true);
      const resp = await axios.get(`/feed?page=${nextPage}&limit=1`);
      dispatch(addFeed(resp.data));
    } catch (error) {
      console.error('Failed to fetch feed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleButton = async (status) => {
    const currentUser = userFeed[currentIndex];
    if (!currentUser) return;

    try {
      await axios.post(`/request/send/${status}/${currentUser._id}`);
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);

      const remaining = userFeed.length - nextIndex;
      if (remaining === 0 && totalCount > 0) {
        fetchFeed(page + 1);
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  };

  useEffect(() => {
    if (!hasFetched.current && userFeed.length === 0) {
      hasFetched.current = true;
      fetchFeed(1);
    }
    return () => dispatch(clearFeed());
  }, []);

  const currentUser = userFeed[currentIndex];

  if (loading && !currentUser) {
    return (
      <div className="text-center mt-10 text-lg font-semibold min-h-screen justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="text-center mt-10 text-lg font-semibold min-h-screen justify-center items-center">
        No more requests found.
      </div>
    );
  }

  return (
    <div className="flex justify-center h-full items-center my-10">
      <UserCard
        user={currentUser}
        handlePrimary={() => handleButton('interested')}
        handleSecondary={() => handleButton('ignored')}
      />
    </div>
  );
};

export default Feed;
