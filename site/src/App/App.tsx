import React, { useCallback, useEffect, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Database } from '../database.types';
import logo from './logo.svg';
import './App.css';
import TimeLine from '../TimeLine';

const supabaseUrl = 'https://qmikngjovkbtgqtzuwll.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtaWtuZ2pvdmtidGdxdHp1d2xsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg1ODEwNzYsImV4cCI6MTk4NDE1NzA3Nn0.LnzvTdG6VgvHsb04tQTKjcqwMlCxGnA6qptsfILF5_U';

function App() {
  const client = useMemo(() => createClient<Database>(supabaseUrl, supabaseKey), []);
  useEffect(() => {
    client
      .from('Features')
      .select()
      .then((result) => console.log(result));
  }, [client]);

  const loginWithGitHub = useCallback(async () => {
    const { data, error } = await client.auth.signInWithOAuth({
      // provider can be 'github', 'google', 'gitlab', and more
      provider: 'github',
    });
    console.log({ data, error });
  }, [client.auth]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button type="button" onClick={loginWithGitHub}>
          Login with GitHub
        </button>
      </header>
      <TimeLine />
    </div>
  );
}

export default App;
