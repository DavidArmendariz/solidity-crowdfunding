import ganache from 'ganache';
import Web3 from 'web3';
import CampaignFactory from '../build/CampaignFactory.json';
import Campaign from '../build/Campaign.json';

const web3 = new Web3(ganache.provider());

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  factory = await new web3.eth.Contract(JSON.parse(CampaignFactory.abi))
    .deploy({ data: CampaignFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: 1000000 });

  await factory.methods
    .createCampaign(100)
    .send({ from: accounts[0], gas: 1000000 });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract(
    JSON.parse(Campaign.abi),
    campaignAddress
  );
});
