import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

import logo from './logo.svg';
import './App.css';

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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
