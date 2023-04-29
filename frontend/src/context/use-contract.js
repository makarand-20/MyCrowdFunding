import { ethers } from 'ethers';
import contractAddress from '../constants/contractData/CrowdFunding-address.json';
import contractAbi from '../constants/contractData/CrowdFunding.json';
import useConnect from './connect';

function useContract() {
  const readOnlyProvider = ethers.getDefaultProvider(contractAddress.url);
  const { account } = useConnect();
  let provider;
  let signer;
  if (account) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
  }
  let contract = new ethers.Contract(
    contractAddress.address,
    contractAbi.abi,
    account ? provider : readOnlyProvider
  );
  contract.getCampaigns().then((res) => console.log(res));
  if (account) {
    contract = contract.connect(signer);
  }
  const createCampaign = async (form) => {
    if (!account) {
      alert('Please Connect Metamask');
      return;
    }
    try {
      const tx = await contract.createCampaign(
        form.title,
        form.description,
        ethers.utils.parseUnits(form.target),
        new Date(form.deadline).getTime(),
        form.image
      );
      return tx;
    } catch (err) {
      return err;
    }
  };

  const getCampaigns = async () => {
    const campaigns = await contract.getCampaigns();
    console.log(campaigns);
    const parsedCampaigns = campaigns.map((campaign) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: parseInt(campaign.deadline),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      id: parseInt(campaign.id),
      image: campaign.image,
      donators: campaign.donations.map((donation, idx) => ({
        donation: ethers.utils.formatEther(parseInt(donation).toString()),
        donator: campaign.donators[idx],
      })),
    }));
    return parsedCampaigns;
  };

  const getUserCampaigns = async (address) => {
    const campaigns = await getCampaigns();
    const userCampaigns = campaigns.filter((campaign) => {
      // console.log(campaign.owner, address);
      return campaign.owner.toLowerCase() === address;
    });
    return userCampaigns;
  };

  const donate = async (id, _value) => {
    if (!account) {
      alert('Please Connect Metamask');
      return;
    }
    const tx = await contract.donateToCampaign(id, {
      value: ethers.utils.parseEther(`${_value}`),
    });
    return await tx.wait();
  };

  const getCampaignDetails = async (id) => {
    const campaign = await contract.campaigns(id);
    const parsedCampaign = {
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: parseInt(campaign.deadline),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      id: parseInt(campaign.id),
      image: campaign.image,
    };
    const donationDetails = await contract.getDonators(id);
    parsedCampaign.donators = donationDetails[1].map((donation, idx) => ({
      donation: ethers.utils.formatEther(parseInt(donation).toString()),
      donator: donationDetails[0][idx],
    }));
    console.log(parsedCampaign.donators);
    return parsedCampaign;
  };

  return {
    createCampaign,
    getCampaigns,
    getUserCampaigns,
    donate,
    getCampaignDetails,
  };
}

export default useContract;
