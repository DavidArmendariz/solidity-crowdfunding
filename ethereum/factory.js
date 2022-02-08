import fse from 'fs-extra';
import web3 from './web3';

const CampaignFactory = fse.readJSONSync('./build/CampaignFactory.json');

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  process.env.FACTORY_CONTRACT_ADDRESS
);

export default instance;
