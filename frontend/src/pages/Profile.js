import React, { useEffect, useState } from 'react';
import { DiaplayCampaigns } from '../components';
import { useStateContext } from '../context';

const Profile = () => {
  const [isLoding, setIsLoading] = useState(false);
  const { getUserCampaigns, account } = useStateContext();
  const [campaigns, setCampaigns] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    if (account) {
      getUserCampaigns(account).then((response) => {
        setCampaigns(response);
        setIsLoading(false);
      });
    }
  }, [account, getUserCampaigns, setIsLoading]);
  return (
    <DiaplayCampaigns
      isLoding={isLoding}
      title="My Campaigns"
      campaigns={campaigns}
    />
  );
};

export default Profile;
