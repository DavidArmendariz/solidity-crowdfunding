import CampaignFactory from '../ethereum/build/CampaignFactory.json';
import web3 from './web3';

const factory = new web3.eth.Contract(
  CampaignFactory.abi,
  process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS
);

export default factory;
