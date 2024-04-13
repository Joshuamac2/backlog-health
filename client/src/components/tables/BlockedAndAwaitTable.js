import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FormatTable from "./FormatTable";

function BlockedAndAwaitTable() {
  const [awaitingData, setAwaitingData] = useState(null);
  const [blockedData, setBlockedData] = useState(null);
  const [activeTab, setActiveTab] = useState('awaiting');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [awaitingResponse, blockedResponse] = await Promise.all([
          fetch(process.env.REACT_APP_FETCH_AWAITING),
          fetch(process.env.REACT_APP_FETCH_BLOCKED)
        ]);

        if (!awaitingResponse.ok || !blockedResponse.ok) {
          throw new Error("One of the network responses was not ok");
        }

        const awaitingData = await awaitingResponse.json();
        const blockedData = await blockedResponse.json();

        setAwaitingData(awaitingData);
        setBlockedData(blockedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      {activeTab === 'awaiting' && <FormatTable data={awaitingData} issueType="awaiting" />}
      {activeTab === 'blocked' && <FormatTable data={blockedData} issueType="blocked" />}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button
          style={{
            fontWeight: 'bold',
            border: activeTab === 'awaiting' ? '5px solid #0F415A' : 'none',
            marginRight: '10px',
            borderRadius: '10px',
            backgroundColor: activeTab === 'awaiting' ? 'white' : '#0F415A',
            color: activeTab === 'awaiting' ? '#0F415A' : 'white',
            padding: '10px 20px'
          }}
          onClick={() => handleTabChange('awaiting')}
        >
                   Show Awaiting Issues

        </button>
        <button
          style={{
            fontWeight: 'bold',
            border: activeTab === 'blocked' ? '5px solid #0F415A' : 'none',
            borderRadius: '10px',
            backgroundColor: activeTab === 'blocked' ? 'white' : '#0F415A',
            color: activeTab === 'blocked' ? '#0F415A' : 'white',
            padding: '10px 20px'
          }}
          onClick={() => handleTabChange('blocked')}
        >
          Show Blocked Issues
        </button>
      </div>
    </div>
  );
}

export default BlockedAndAwaitTable;
