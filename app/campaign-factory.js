import CampaignFactory from '../ethereum/build/CampaignFactory.json';
import web3 from './app-web3';

const campaignFactory = new web3.eth.Contract(
  CampaignFactory.abi,
  process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS
);

export default campaignFactory;
