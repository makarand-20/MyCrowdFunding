import { createContext, useContext } from 'react';
import useConnect from './connect';
import useContract from './use-contract';

const state = {
  account: '',
  connectAccounts: async () => {},
  createCampaign: async () => {},
  getCampaigns: async () => {},
  getUserCampaigns: async () => {},
  donate: async () => {},
  getCampaignDetails: async () => {},
};

export const StateContext = createContext(state);

export const StateContextProvider = ({ children }) => {
  const { account, connectAccounts } = useConnect();
  const {
    createCampaign,
    getCampaigns,
    getUserCampaigns,
    donate,
    getCampaignDetails,
  } = useContract();
  return (
    <StateContext.Provider
      value={{
        account,
        connectAccounts,
        createCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getCampaignDetails,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
