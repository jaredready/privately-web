import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';

import Header from './Header';
import AddressList from './AddressList';
import './App.css';
import { Container } from '@material-ui/core';
import { useEffect, useState } from 'react';

Amplify.configure({
  Auth: {
    region: "us-east-1",
    userPoolId: "us-east-1_EuS36xmVS",
    userPoolWebClientId: "4h8suaci18t02g04po14blef9k",
    mandatorySignIn: true,
  }
});

const getMaskedAddresses = async () => {
  const session = await Auth.currentSession();
  console.log(session);
  const _query = `
    query {
      maskedAddresses {
        id
        address
      }
    }
  `
  // @ts-ignore
  const response = await fetch(process.env.REACT_APP_PRIVATELY_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `${session.getIdToken().getJwtToken()}`,
    },
    body: JSON.stringify({
      query: _query
    })
  });

  return (await response.json()).data.maskedAddresses;
}

const App = () => {
  const [maskedAddresses, setMaskedAddresses] = useState([]);

  useEffect(() => {
    getMaskedAddresses().then((value) => {
      const addresses = value.map((addr: any) => {
        return addr.address;
      })
      setMaskedAddresses(addresses)
    })
  }, maskedAddresses)

  return (
    <div className="App">
      <Header />
      <Container maxWidth="lg">
        <AddressList addresses={maskedAddresses}/>
      </Container>
    </div>
  );
}

export default withAuthenticator(App);
