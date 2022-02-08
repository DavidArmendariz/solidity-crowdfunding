import { useEffect, useState } from 'react';
import Web3 from 'web3';

const useMetamask = () => {
  const [browserWindow, setBrowserWindow] = useState(null);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    setBrowserWindow(window);
  }, []);

  useEffect(() => {
    if (browserWindow) {
      browserWindow.ethereum.request({ method: 'eth_requestAccounts' });
      setWeb3(new Web3(window.ethereum));
    }
  }, [browserWindow]);

  return web3;
};

export default useMetamask;
