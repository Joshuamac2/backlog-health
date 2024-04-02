import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { IoBarChart } from "react-icons/io5";

function TotalChart() {
  const [available, setAvailable] = useState(null);
  const [awaiting, setAwaiting] = useState(null);
  const [blocked, setBlocked] = useState(null);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchAvailable = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/available`);
        if (!response.ok) {
          throw new Error('Network response for available data was not ok');
        }
        const data = await response.json();
        setAvailable(data); 
      } catch (error) {
        console.error('Error fetching available data:', error);
        setError(error);
      }
    };

    const fetchAwaiting = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/awaiting`);
        if (!response.ok) {
          throw new Error('Network response for awaiting data was not ok');
        }
        const data = await response.json();
        setAwaiting(data); 
      } catch (error) {
        console.error('Error fetching awaiting data:', error);
        setError(error);
      }
    };

    const fetchBlocked = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/blocked`);
        if (!response.ok) {
          throw new Error('Network response for blocked data was not ok');
        }
        const data = await response.json();
        setBlocked(data); 
      } catch (error) {
        console.error('Error fetching blocked data:', error);
        setError(error);
      }
    };

    fetchAvailable();
    fetchAwaiting();
    fetchBlocked();
  }, []); 

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
      <BarChart
        xAxis={[{ scaleType: 'band', data: ['Available', 'Pending Client', 'Blocked'] }]}
        series={[{ data: [available, awaiting, blocked] }]}
        width={650}
        height={270}
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
    </div>
  );
}

export default TotalChart;
