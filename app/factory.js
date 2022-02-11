import CampaignFactory from '../ethereum/build/CampaignFactory.json';

const factory = new web3.eth.Contract(
  CampaignFactory.abi,
  process.env.FACTORY_CONTRACT_ADDRESS
);

export default factory;
