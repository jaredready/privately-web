import Amplify, { Auth } from 'aws-amplify';
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
})

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
