import React from 'react';
import { Table } from 'semantic-ui-react';
import web3 from 'app-web3';

const RequestRow = ({ request, address, id }) => {
  const { Row, Cell } = Table;
  const { description, value, recipient, approversCount } = request;

  return (
    <Row>
      <Cell>{id}</Cell>
      <Cell>{description}</Cell>
      <Cell>{web3.utils.fromWei(value, 'ether')}</Cell>
      <Cell>{recipient}</Cell>
      <Cell>{approversCount}</Cell>
    </Row>
  );
};

export default RequestRow;
