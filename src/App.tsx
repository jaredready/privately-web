import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';

import Header from './Header';
import AddressList from './AddressList';
import './App.css';
import { Container } from '@material-ui/core';

Amplify.configure({
  Auth: {
    region: "us-east-1",
    userPoolId: "us-east-1_EuS36xmVS",
    userPoolWebClientId: "4h8suaci18t02g04po14blef9k",
    mandatorySignIn: true,
  }
});

const query = async () => {
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
  fetch(process.env.REACT_APP_PRIVATELY_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `${session.getIdToken().getJwtToken()}`,
    },
    body: JSON.stringify({
      query: _query
    })
  })
    .then(r => r.json())
    .then(data => console.log('data returned:', data));
}

query();

function App() {
  return (
    <div className="App">
      <Header />
      <Container maxWidth="lg">
        <AddressList />
      </Container>
    </div>
  );
}

export default withAuthenticator(App);
