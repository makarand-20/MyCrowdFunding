import { useEffect, useState } from 'react';
import contractAddress from '../constants/contractData/CrowdFunding-address.json';

function useConnect() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [account, setAccount] = useState(null);
  const provider = window.ethereum;

  const connectAccounts = async () => {
    if (window.ethereum) {
      try {
        const res = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        accountsChanged(res);
      } catch (err) {
        console.error(err.message);
        setErrorMessage('There was a problem connecting to MetaMask');
      }
      try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x' + contractAddress.chainId.toString(16) }],
        });
        console.log('You have switched to the right network');
      } catch (switchError) {
        // The network has not been added to MetaMask
        if (switchError.code === 4902) {
          console.log('Please add the Polygon network to MetaMask');
        }
        console.log('Cannot switch to the network');
      }
    } else {
      alert('Install MetaMask');
    }
  };

  const accountsChanged = (newAccount) => {
    // console.log(newAccount);
    if (newAccount.length) setAccount(newAccount[0]);
    else setAccount(null);
  };

  const chainChanged = () => {
    console.log('chain changed');
    setErrorMessage(null);
    setAccount(null);
  };
  const alreadyConnected = async () => {
    try {
      const res = await window.ethereum.request({
        method: 'eth_accounts',
      });
      accountsChanged(res);
    } catch (err) {
      console.error(err);
      setErrorMessage('There was a problem connecting to MetaMask');
    }
  };
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', accountsChanged);
      window.ethereum.on('chainChanged', chainChanged);
      alreadyConnected();
    }
  }, [account]);

  return { account, connectAccounts, errorMessage };
}

export default useConnect;
