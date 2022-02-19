import Header from 'components/Header';
import React from 'react';
import { Container } from 'semantic-ui-react';

const Layout = (props) => {
  return (
    <Container>
      <Header />
      {props.children}
    </Container>
  );
};

export default Layout;
