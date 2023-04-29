import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { DiaplayCampaigns } from '../components';
import { useStateContext } from '../context';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { getCampaigns, account } = useStateContext();
  const [campaigns, setCampaigns] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    getCampaigns().then((response) => {
      setCampaigns(response);
      setIsLoading(false);
    });
  }, [getCampaigns]);
  return (
    <DiaplayCampaigns
      isLoading={isLoading}
      title="All Campaigns"
      campaigns={campaigns}
    />
  );
};

export default Home;
