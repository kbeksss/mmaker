import { useEffect, useState } from 'react';
import { useRouter } from '../../routes/hooks';
import { useAuthContext } from './use-auth-context';
import { signInWithMetamask } from '../context/jwt';

export const useMetamask = ({ setErrorMsg }) => {
  const [account, setAccount] = useState(null);
  const router = useRouter();
  const { checkUserSession } = useAuthContext();
  const checkIfMetaMaskInstalled = () => typeof window.ethereum !== 'undefined';

  const requestAccount = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log('acc', accounts);
      setAccount(accounts[0]);
    } catch (error) {
      console.error('Пользователь отклонил запрос доступа к аккаунту');
    }
  };

  const signMetamask = async () => {
    try {
      await signInWithMetamask();
      await checkUserSession?.();

      router.refresh();
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  };

  const connectWallet = async () => {
    if (checkIfMetaMaskInstalled()) {
      await requestAccount();
      await signMetamask();
    } else {
      alert('Пожалуйста, установите MetaMask!');
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        console.log('acc', accounts);
        setAccount(accounts[0]);
      });

      window.ethereum.on('chainChanged', (chainId) => {});
    }
  }, []);
  return {
    connectWallet,
  };
};
