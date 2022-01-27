import { useEffect, useState } from 'react';
import styled from 'styled-components';
import lottery from './lottery';
import web3 from './web3';

function App() {
  const [manager, setManager] = useState('');
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState('');
  const [value, setValue] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {
      const manager = await lottery.methods.manager().call();
      const players = await lottery.methods.getPlayers().call();
      const balance = await web3.eth.getBalance(lottery.options.address);
      setManager(manager);
      setPlayers(players);
      setBalance(balance);
    })();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const accounts = await web3.eth.getAccounts();
      const wei = web3.utils.toWei(value, 'ether');
      setMessage('Waiting for transaction to success...');
      await lottery.methods.enter().send({ from: accounts[0], value: wei });
      setMessage('You entered the lottery successfully!');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const pickWinner = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      setMessage('Waiting for transaction to success...');
      await lottery.methods.pickWinner().send({ from: accounts[0] });
      setMessage('A winner has been picked!');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const etherBalance = web3.utils.fromWei(balance, 'ether');

  return (
    <Container>
      <h1>Lottery Contract</h1>
      <ContractManagerInfo>
        This contract is managed by {manager}.
      </ContractManagerInfo>
      <p>
        There are currently {players.length} people entered, competing to win{' '}
        {etherBalance} ether.
      </p>
      <hr />
      <form onSubmit={onSubmit}>
        <h4>Want to try your luck?</h4>
        <div>
          <Label>Amount of ether to enter</Label>
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <button type="submit">Enter</button>
        </div>
      </form>
      <hr />
      <h4>Ready to pick a winner?</h4>
      <button onClick={pickWinner}>Pick a winner</button>
      <hr />
      <h4>{message}</h4>
    </Container>
  );
}

export default App;

const Container = styled.div`
  margin: 5rem;
`;

const Label = styled.label`
  margin-right: 1rem;
`;

const ContractManagerInfo = styled.p`
  overflow-wrap: break-word;
`;
