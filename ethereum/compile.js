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

console.log('Compiling contract...');
const compiledContract = solc.compile(JSON.stringify(input));
console.log('Done.');
const output = JSON.parse(compiledContract);
const contracts = Object.entries(output.contracts.allContracts);

console.log('Removing existing build folder...');
fse.ensureDirSync(buildPath);
console.log('Done.');

contracts.forEach((contract) => {
  const [contractName, json] = contract;
  console.log(`Writing ${contractName} JSON file to ${buildPath}...`);
  fse.outputJSONSync(path.resolve(buildPath, `${contractName}.json`), json);
  console.log(`Done.`);
});
