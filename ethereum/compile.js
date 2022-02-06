import path from 'path';
import { fileURLToPath } from 'url';
import fse from 'fs-extra';
import solc from 'solc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildPath = path.resolve(__dirname, 'build');
fse.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fse.readFileSync(campaignPath, 'utf-8');

const input = {
  language: 'Solidity',
  sources: {
    allContracts: {
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

const compiledContract = solc.compile(JSON.stringify(input));
const output = JSON.parse(compiledContract);
const contracts = Object.entries(output.contracts.allContracts);

fse.ensureDirSync(buildPath);

contracts.forEach((contract) => {
  const [contractName, json] = contract;
  fse.outputJSONSync(path.resolve(buildPath, `${contractName}.json`), json);
});
