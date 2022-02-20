import web3 from 'app-web3';
import Campaign from '../../ethereum/build/Campaign.json';

const getCampaign = (address) => {
  return new web3.eth.Contract(Campaign.abi, address);
};

export default getCampaign;
