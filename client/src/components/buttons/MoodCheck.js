import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function MoodCheck() {
  const [showModal, setShowModal] = useState(false);
  const [availableTotal, setAvailableTotal] = useState(false);

  useEffect(() => {
    const fetchAvailableTotal = async () => {
      try {
        const response = await fetch(`https://backlog-health-server.vercel.app/api/check-mood`);
        if (!response.ok) {
          throw new Error('Network response for available data was not ok');
        }
        const data = await response.json();
        setAvailableTotal(data);
      } catch (error) {
        console.error('Error fetching available total data:', error);
      }
    };

    fetchAvailableTotal();
  }, []);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div>
        <Button onClick={handleShowModal} style={{ width: '50%', backgroundColor: '#E70127', borderColor: '#E70127', fontWeight: 'bold' }}>Check Heath</Button>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton style={{ backgroundColor: "#0F415A", color: "white" }}>
          <Modal.Title>How's Josh feeling today?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {availableTotal < 300 ? (
            <img src="/moodcheck1.png" className="img-fluid" alt="Responsive image" />
          ) : (
            <img src="/moodcheck2.png" className="img-fluid" alt="Responsive image" />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal} style={{ backgroundColor: '#E70127', borderColor: '#E70127' }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MoodCheck;
