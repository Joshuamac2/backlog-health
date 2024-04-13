import React, { useState } from 'react';
import TotalChart from './components/chart/TotalChart';
import SendReport from './components/buttons/SendReport';
import MoodCheck from './components/buttons/MoodCheck';
import BlockedAndAwaitTable from './components/tables/BlockedAndAwaitTable';
import AvailableTable from './components/tables/AvailableTable';

function App() {
  const [secret, setSecret] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://backlog-health-server.vercel.app/api/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ secret }),
      });
      const data = await response.json();
      if (data.success) {
        setAuthenticated(true);
      } else {
        alert('Invalid secret key');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    authenticated ? (
      <div style={{ display: 'flex', backgroundColor: '#F3F8FF', height: '100%' }}>
        <div style={{ flex: '1', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', border: '1px solid white', borderRadius: '20px', padding: '20px', boxShadow: '5px 5px 10px rgba(5, 5, 0, 0.1)' }}>
            <div>
              <h1 style={{ fontSize: '50px', fontWeight: 'bold' }}>Backlog Health</h1>
              <p style={{ fontSize: '20px' }}>Reporting Dashboard</p>
              <MoodCheck />
            </div>
            <div>
              <img src="/homeimage.png" className="img-fluid" alt="Responsive image" style={{ width: '100%', height: '160px' }} />
            </div>
          </div>
          <div>
            <div style={{ backgroundColor: 'white', border: '1px solid white', borderRadius: '20px', padding: '20px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', marginTop: '20px', marginBottom: '20px' }}>
              <TotalChart />
            </div>
          </div>
          <div style={{ backgroundColor: 'white', border: '1px solid white', borderRadius: '20px', padding: '20px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
            <SendReport />
          </div>
        </div>
        <div style={{ flex: '1', padding: '20px' }}>
          <div style={{ padding: '30px', backgroundColor: 'white', marginBottom: '20px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
            <BlockedAndAwaitTable />
          </div>
          <div style={{ padding: '30px', backgroundColor: 'white', marginBottom: '20px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
            <AvailableTable />
          </div>
        </div>
      </div>
    ) : (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <form onSubmit={handleSubmit}>
          <input type="password" value={secret} onChange={(e) => setSecret(e.target.value)} />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  );
}

export default App;
