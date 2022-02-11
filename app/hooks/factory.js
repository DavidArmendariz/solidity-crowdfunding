import { useEffect, useState } from 'react';
import CampaignFactory from '../../ethereum/build/CampaignFactory.json';

const useFactory = (web3) => {
  const [factory, setFactory] = useState(null);

  useEffect(() => {
    if (web3) {
      setFactory(
        new web3.eth.Contract(
          CampaignFactory.abi,
          process.env.FACTORY_CONTRACT_ADDRESS
        )
      );
    }
  }, [web3]);

  return factory;
};

export default useFactory;
