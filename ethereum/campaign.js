import fs from 'fs';
import path from 'path';
import solc from 'solc';

const inboxPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    campaignContract: {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

const compiledContract = JSON.parse(solc.compile(JSON.stringify(input)));

export default compiledContract.contracts.campaignContract.Lottery;
