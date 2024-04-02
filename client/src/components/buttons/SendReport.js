import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { RiMailSendLine } from "react-icons/ri";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SendReport() {
  const [email, setEmail] = useState("");

  const handleSendReport = async () => {
    try {

      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        throw new Error("Please enter a valid email address");
      }
  
      const response = await fetch(`http://localhost:4000/api/send-report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to send report");
      }

      toast.success("Report sent successfully");
      setEmail(""); 
    } catch (error) {
      console.error("Error sending report:", error);
      toast.error("Failed to send report");
    }
  };
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ textAlign: 'left', fontWeight: 'bold' }}>Email Report</h2>
          <h5 style={{ textAlign: 'left', fontSize: '15px' }}>Send reports to your colleagues</h5>
        </div>
        <div style={{ fontSize: '50px', marginBottom: '20px', color: '#0F415A' }}>
          <RiMailSendLine />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
        <Form style={{ marginBottom: '20px', width: '100%' }}>
          <Form.Group controlId="email">
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
              style={{ width: '100%' }}
            />
          </Form.Group>
        </Form>
        <Button onClick={handleSendReport} style={{ backgroundColor: '#0F415A', borderColor: '#0F415A', width: '100%', fontWeight: 'bold' }}>Send Report</Button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SendReport;
