import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FormatTable from "./FormatTable";

function AvailableTable() {
  const [availableData, setAvailableData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [availableResponse] = await Promise.all([
          fetch(process.env.REACT_APP_FETCH_AVAILABLE),
        ]);

        if (!availableResponse.ok) {
          throw new Error("One of the network responses was not ok");
        }

        const availableData = await availableResponse.json();

        setAvailableData(availableData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <FormatTable data={availableData} issueType="available" />
    </div>
  );
}

export default AvailableTable;

