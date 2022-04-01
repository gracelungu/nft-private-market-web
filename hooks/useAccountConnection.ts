import getAccount from "helpers/getAccount";
import { isMetamaskConnected } from "helpers/isMetamaskConnected";
import { useState } from "react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import accountAtom from "state/atoms/account";

const useAccountConnection = () => {
  const [isConnected, setIsConnected] = useState<boolean>();
  const [, setAccounts] = useRecoilState(accountAtom);

  const setAccountsState = async () => {
    const userAccount = await getAccount();
    setAccounts(userAccount);
  };

  useEffect(() => {
    const checkConnection = async () => {
      const connected = await isMetamaskConnected();
      if (connected) {
        setIsConnected(true);
        setAccountsState();
      }
    };
    checkConnection();
  }, []);

  return {
    isConnected,
    setAccountsState,
  };
};

export default useAccountConnection;
