import ganache from 'ganache';
import Web3 from 'web3';
import CampaignFactory from '../build/CampaignFactory.json';
import Campaign from '../build/Campaign.json';

const web3 = new Web3(ganache.provider());

let accounts;
let campaignFactory;
let campaignAddress;
let campaign;

const GAS = 1e7;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  campaignFactory = await new web3.eth.Contract(CampaignFactory.abi)
    .deploy({ data: CampaignFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: GAS });

  await campaignFactory.methods
    .createCampaign(100)
    .send({ from: accounts[0], gas: GAS });

  [campaignAddress] = await campaignFactory.methods
    .getDeployedCampaigns()
    .call();
  campaign = new web3.eth.Contract(Campaign.abi, campaignAddress);
});

test('deploys the CampaignFactory and Campaign', () => {
  expect(campaignFactory.options.address).toBeDefined();
  expect(campaign.options.address).toBeDefined();
});

test('marks caller as the campaign manager', async () => {
  const manager = await campaign.methods.manager().call();
  expect(manager).toEqual(accounts[0]);
});

test('it should mark an account as a contributor after contributing to the campaign', async () => {
  await campaign.methods.contribute().send({ value: 200, from: accounts[1] });
  const isContributor = await campaign.methods.contributors(accounts[1]).call();
  expect(isContributor).toBe(true);
});

test('it requires a minimum contribution', async () => {
  let error;

  try {
    await campaign.methods.contribute().send({ value: 99, from: accounts[1] });
  } catch (err) {
    error = err;
  }

  expect(error).toBeDefined();
});

test('it allows a manager to make a payment request', async () => {
  await campaign.methods
    .createRequest('test', 100, accounts[1])
    .send({ from: accounts[0], gas: GAS });

  const request = await campaign.methods.requests(0).call();
  expect(request.description).toEqual('test');
  expect(request.value).toEqual('100');
  expect(request.recipient).toEqual(accounts[1]);
  expect(request.complete).toEqual(false);
  expect(request.approversCount).toEqual('0');
});

test('it processes request', async () => {
  await campaign.methods
    .contribute()
    .send({ from: accounts[0], value: web3.utils.toWei('10', 'ether') });

  await campaign.methods
    .createRequest('test', web3.utils.toWei('5', 'ether'), accounts[1])
    .send({ from: accounts[0], gas: GAS });

  await campaign.methods
    .approveRequest(0)
    .send({ from: accounts[0], gas: GAS });

  let initialBalance = await web3.eth.getBalance(accounts[1]);
  initialBalance = web3.utils.fromWei(initialBalance, 'ether');
  initialBalance = parseFloat(initialBalance);

  await campaign.methods
    .finalizeRequest(0)
    .send({ from: accounts[0], gas: GAS });

  let finalBalance = await web3.eth.getBalance(accounts[1]);
  finalBalance = web3.utils.fromWei(finalBalance, 'ether');
  finalBalance = parseFloat(finalBalance);

  expect(finalBalance - initialBalance).toBe(5);
});
