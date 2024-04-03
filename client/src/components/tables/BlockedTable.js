import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ImBlocked } from "react-icons/im";

function BlockedTable() {
  const [blockedData, setBlockedData] = useState(null);
  const [selectedEpic, setSelectedEpic] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [epicTotals, setEpicTotals] = useState({});
  const [parentIssueLink, setParentIssueLink] = useState(null);

  useEffect(() => {
    const fetchAwaiting = async () => {
      try {
        const response = await fetch(`https://backlog-health-server.vercel.app/api/blocked-table`);
        if (!response.ok) {
          throw new Error("Network response for awaiting data was not ok");
        }
        const data = await response.json();
        setBlockedData(data);
      } catch (error) {
        console.error("Error fetching awaiting data:", error);
      }
    };

    fetchAwaiting();
  }, []);

  useEffect(() => {
    if (blockedData) {
      const totals = {};
      blockedData.forEach((issue) => {
        const epicName = issue.epicName;
        if (!totals[epicName]) {
          totals[epicName] = 0;
        }
        totals[epicName] += issue.storyPoints || 0;
      });
      setEpicTotals(totals);
    }
  }, [blockedData]);

  const handleEpicClick = (epicName) => {
    setSelectedEpic(epicName);
    setModalOpen(true);

    const selectedEpicData = blockedData.find(
      (issue) => issue.epicName === epicName,
    );
    if (selectedEpicData) {
      setParentIssueLink(selectedEpicData.parentIssueLink);
    } else {
      setParentIssueLink(null);
    }
  };

  const handleCloseModal = () => {
    setSelectedEpic(null);
    setModalOpen(false);
    setParentIssueLink(null);
  };

  return (
    <div>
      <div style={{ flex: "1", padding: "5px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ textAlign: 'left', fontWeight: 'bold' }}>Blocked Issues</h2>
            <h5 style={{ textAlign: 'left', fontSize: '15px', marginBottom: '20px' }}>Blocked by Client or Internally</h5>
          </div>
          <div style={{ fontSize: "40px", padding: '10px', color: "#0F415A" }}>
            <ImBlocked />
          </div>
        </div>
      </div>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col" style={{ backgroundColor: "#0F415A", color: "white" }}>
              Epic Name
            </th>
            <th scope="col" style={{ backgroundColor: "#0F415A", color: "white" }}>
              Total Story Points
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(epicTotals).map((epicName) => (
            <tr key={epicName} onClick={() => handleEpicClick(epicName)}>
              <td>{epicName}</td>
              <td>{epicTotals[epicName]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={modalOpen} onHide={handleCloseModal}>
        <Modal.Header style={{ backgroundColor: "#0F415A", color: "white" }}>
          <Modal.Title>Issues: {selectedEpic}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table">
            <thead>
              <tr>
                <th>MSS ID</th>
                <th>Story Points</th>
              </tr>
            </thead>
            <tbody>
              {blockedData &&
                blockedData
                  .filter((issue) => issue.epicName === selectedEpic)
                  .map((issue) => (
                    <tr key={issue.key}>
                      <td>
                        <a
                          href={`https://redantinternal.atlassian.net/browse/${issue.key}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {issue.key}
                        </a>
                      </td>
                      <td>{issue.storyPoints}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </Modal.Body>

        {parentIssueLink && (
          <Modal.Footer
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ fontWeight: "bold", color: "black" }}>
              <span>Epic Link: </span>
              <a
                href={`https://redantinternal.atlassian.net/browse/${selectedEpic}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "blue",
                  borderBottom: "1px solid",
                }}
              >
                {selectedEpic}
              </a>
            </div>
            <Button
              variant="secondary"
              onClick={handleCloseModal}
              style={{ backgroundColor: '#E70127', borderColor: '#E70127' }}
            >
              Close
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
}

export default BlockedTable;
