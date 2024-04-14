import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { IoBarChart } from "react-icons/io5";

function TotalChart() {
  const [availableData, setAvailableData] = useState([]);
  const [awaiting, setAwaiting] = useState(null);
  const [blocked, setBlocked] = useState(null);
  const [totalStoryPoints, setTotalStoryPoints] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [totalAvailableResponse, totalAwaitingResponse, totalBlockedResponse] = await Promise.all([
          fetch(process.env.REACT_APP_FETCH_TOTAL_AVAILABLE),
          fetch(process.env.REACT_APP_FETCH_TOTAL_AWAITING),
          fetch(process.env.REACT_APP_FETCH_BLOCKED)
        ]);
    
        const availableJson = await totalAvailableResponse.json();
        const awaitingJson = await totalAwaitingResponse.json();
        const blockedJson = await totalBlockedResponse.json();
        
        setAvailableData(availableJson);
        setAwaiting(awaitingJson);
        setBlocked(blockedJson);
    
        const total = sumStoryPoints(availableJson);
        setTotalStoryPoints(total);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  function sumStoryPoints(data) {
    let totalStoryPoints = 0;
  
    for (const item of data.availableData) {
      totalStoryPoints += item.storyPoints;
    }

    return totalStoryPoints;
  }

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ textAlign: 'left', fontWeight: 'bold' }}>Story Points Summary</h2>
          <h5 style={{ textAlign: 'left', fontSize: '15px' }}>Review the state of the backlog</h5>
        </div>
        <div style={{ fontSize: '50px', marginBottom: '20px', padding: '10px',  color: '#0F415A' }}>
          <IoBarChart />
        </div>
      </div>

      {error && <div>Error: {error.message}</div>}
      {totalStoryPoints !== null && (
        <BarChart
          xAxis={[{ scaleType: 'band', data: ['Available', 'Pending Client', 'Blocked'] }]}
          series={[{ data: [totalStoryPoints, awaiting, blocked] }]} 
          width={650}
          height={450}
          sx={{
            "& .MuiBarElement-root:nth-of-type(1)": {
              fill: "#0F415A",
            },
            "& .MuiBarElement-root:nth-of-type(2)": {
              fill: "#E70127",
            },
            "& .MuiBarElement-root:nth-of-type(3)": {
              fill: "#E70127",
            },
          }}
        />
      )}

      <div style={{ fontWeight: 'bold' }}>Total Story Points: {totalStoryPoints + awaiting + blocked}</div>
    </div>
  );
}

export default TotalChart;
