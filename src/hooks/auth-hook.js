import { useState, useEffect } from 'react';

let expirationTimer;

export const useAuth = (setUser, expiration, token, logout) => {
  const [tokenId, setTokenId] = useState(false);
  const [expirationDate, setExpirationDate] = useState();

  // checking local storage and set data
  useEffect(() => {
    const storedData = JSON.parse(window.localStorage.getItem('userData'));
    if (storedData && storedData.userId && new Date(storedData.expiration) > new Date()) {
      setUser(storedData.userId, storedData.token, new Date(storedData.expiration));
      setTokenId(storedData.token);
      setExpirationDate(new Date(storedData.expiration));
    }
    setExpirationDate(expiration);
    // eslint-disable-next-line
  }, [tokenId]);

  // set user data and expiration date
  useEffect(() => {
    setExpirationDate(new Date(expiration));
  }, [expiration]);

  useEffect(() => {
    setTokenId(token);
  }, [token]);

  useEffect(() => {
    if (tokenId && expirationDate) {
      const remainingTime = new Date(expirationDate).getTime() - new Date().getTime();
      expirationTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(expirationTimer);
    }
  }, [tokenId, logout, expirationDate]);

  return { tokenId };
};
