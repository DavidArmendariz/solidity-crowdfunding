import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import Layout from 'app-components/Layout';
import RequestRow from 'app-components/RequestRow';
import { Link } from 'app-routes';
import getCampaign from 'app-utils/get-campaign';

const RequestIndex = ({ address, requests, requestCount }) => {
  const { Header, Row, HeaderCell, Body } = Table;

  const renderRows = () => {
    return requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          request={request}
          address={address}
          id={index}
        />
      );
    });
  };

  return (
    <Layout>
      <Link route={`/campaigns/${address}`}>
        <a>Back</a>
      </Link>
      <h3>Requests</h3>
      <Link route={`/campaigns/${address}/requests/new`}>
        <a>
          <Button primary>Add Request</Button>
        </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>{renderRows()}</Body>
      </Table>
    </Layout>
  );
};

RequestIndex.getInitialProps = async (props) => {
  const { address } = props.query;
  const campaign = getCampaign(address);
  const requestCount = parseInt(await campaign.methods.numRequests().call());
  const requests = await Promise.all(
    Array(requestCount)
      .fill()
      .map((_, index) => {
        return campaign.methods.requests(index).call();
      })
  );

  return {
    address,
    requests,
    requestCount,
  };
};

export default RequestIndex;
