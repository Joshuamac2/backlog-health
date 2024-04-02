import React from 'react';
import TotalChart from './components/chart/TotalChart';
import SendReport from './components/buttons/SendReport';
import MoodCheck from './components/buttons/MoodCheck';
import AwaitingTable from './components/tables/AwaitingTable';
import BlockedTable from './components/tables/BlockedTable';

function App() {
  return (
    <div style={{ display: 'flex', backgroundColor: '#F3F8FF', height: '100%' }}>
      <div style={{ flex: '1', padding: '20px',  }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',  backgroundColor: 'white', border: '1px solid white', borderRadius: '0px', padding: '10px', marginBottom: '20px', boxShadow: '5px 5px 10px rgba(5, 5, 0, 0.1)'}}>
        <div>
        <h1 style={{ fontSize: '40px', fontWeight: 'bold' }}>Backlog Health</h1>
        <p style={{ fontSize: '20px' }}>Reporting Dashboard</p>
        <MoodCheck/>
        </div>
        <div style={{ marginBottom: '20px' }}>
        <img src="/homeimage.png" className="img-fluid" alt="Responsive image" style={{ width: '100%', height: '200px', marginLeft: '10px' }}/>
        </div>
      </div>
        <div style={{ backgroundColor: 'white', border: '1px solid white', borderRadius: '20px', padding: '20px', marginBottom: '20px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
          <TotalChart/>
        </div>
        <div style={{ backgroundColor: 'white', border: '1px solid white', borderRadius: '20px', padding: '20px', marginBottom: '20px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
          <SendReport/>
        </div>
      </div>
      <div style={{ flex: '1', padding: '20px' }}>
        <div style={{ backgroundColor: 'white', marginBottom: '20px', border: '1px solid white', borderRadius: '20px', padding: '20px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
          <AwaitingTable/>
        </div>
        <div style={{ backgroundColor: 'white', border: '1px solid white', borderRadius: '20px', padding: '20px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
          <BlockedTable/>
        </div>
      </div>
    </div>
  );
}

export default App;
