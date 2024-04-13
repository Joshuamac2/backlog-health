// import React, { useState, useEffect } from "react";
// import { Button, Modal } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { BsBank } from "react-icons/bs";
// import { MdPersonSearch } from "react-icons/md";
// import { ImBlocked } from "react-icons/im";
// import Pagination from 'react-js-pagination';

// function FormatTable({ data, issueType }) {
//   const [selectedEpic, setSelectedEpic] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [parentIssueLink, setParentIssueLink] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const dataPerPage = 6; 

//   const [epicTotals, setEpicTotals] = useState({});

//   useEffect(() => {
//     if (data) {
//       const groupedData = {};
//       data.forEach((issue) => {
//         const epicName = issue.epicName;
//         if (!groupedData[epicName]) {
//           groupedData[epicName] = [];
//         }
//         groupedData[epicName].push(issue);
//       });

//       const totals = {};
//       Object.keys(groupedData).forEach((epicName) => {
//         totals[epicName] = groupedData[epicName].reduce((total, issue) => total + (issue.storyPoints || 0), 0);
//       });

//       setEpicTotals(totals);
//     }
//   }, [data]);

//   const handleEpicClick = (epicName) => {
//     setSelectedEpic(epicName);
//     setModalOpen(true);

//     const selectedEpicData = data.find((issue) => issue.epicName === epicName);

//     if (selectedEpicData) {
//       setParentIssueLink(selectedEpicData.parentIssueLink);
//     } else {
//       setParentIssueLink(null);
//     }
//   };

//   const handleCloseModal = () => {
//     setSelectedEpic(null);
//     setModalOpen(false);
//     setParentIssueLink(null);
//   };

//   const paginatedData = Object.keys(epicTotals).slice((currentPage - 1) * dataPerPage, currentPage * dataPerPage);

//   return (
//     <div>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <div>
//           <h2 style={{ textAlign: 'left', fontWeight: 'bold' }}> {issueType === 'available' ? 'Available Issues' : issueType === 'awaiting' ? 'Awaiting Confirmation' : 'Blocked Issues'}</h2>
//           <h5 style={{ textAlign: 'left', fontSize: '15px' }}>{issueType === 'available' ? 'Ready for the next sprint' : issueType === 'awaiting' ? 'Requires client approval' : 'Blocked by Client or Internally'}</h5>
//         </div>
//         <div style={{ fontSize: "50px", padding: '10px', color: "#0F415A" }}>
//           {issueType === 'available' ? <BsBank /> : issueType === 'awaiting' ? <MdPersonSearch /> : <ImBlocked />}
//         </div>
//       </div>
//       <table className="table table-hover table-bordered">
//         <thead>
//           <tr>
//             <th scope="col" style={{ backgroundColor: "#0F415A", color: "white" }}>Epic Name</th>
//             <th scope="col" style={{ backgroundColor: "#0F415A", color: "white" }}>Total Story Points</th>
//           </tr>
//         </thead>
//         <tbody>
//           {paginatedData.map((epicName) => (
//             <tr key={epicName} onClick={() => handleEpicClick(epicName)}>
//               <td>{epicName}</td>
//               <td>{epicTotals[epicName]}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <Pagination
//         activePage={currentPage}
//         itemsCountPerPage={dataPerPage}
//         totalItemsCount={Object.keys(epicTotals).length}
//         pageRangeDisplayed={3}
//         onChange={setCurrentPage}
//         itemClass="page-item"
//         linkClass="page-link"
//       />
//       <Modal show={modalOpen} onHide={handleCloseModal}>
//         <Modal.Header style={{ backgroundColor: "#0F415A", color: "white" }}>
//           <Modal.Title>Issues: {selectedEpic}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>MSS ID</th>
//                 <th>Story Points</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data && data.filter((issue) => issue.epicName === selectedEpic).map((issue) => (
//                 <tr key={issue.key}>
//                   <td>
//                     <a href={`https://redantinternal.atlassian.net/browse/${issue.key}`} target="_blank">{issue.key}</a>
//                   </td>
//                   <td>{issue.storyPoints}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </Modal.Body>
//         {parentIssueLink && (
//           <Modal.Footer style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <div style={{ fontWeight: "bold", color: "black" }}>
//               <span>Epic Link: </span>
//               <a href={parentIssueLink} target="_blank" style={{ textDecoration: "none", color: "blue", borderBottom: "1px solid" }}>{selectedEpic}</a>
//             </div>
//             <Button variant="secondary" onClick={handleCloseModal} style={{ backgroundColor: '#E70127', borderColor: '#E70127' }}>Close</Button>
//           </Modal.Footer>
//         )}
//       </Modal>
//     </div>
//   );
// }

// export default FormatTable;

import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsBank } from "react-icons/bs";
import { MdPersonSearch } from "react-icons/md";
import { ImBlocked } from "react-icons/im";
import Pagination from 'react-js-pagination';

function FormatTable({ data, issueType }) {
  const [selectedEpic, setSelectedEpic] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [parentIssueLink, setParentIssueLink] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 6; 

  const [epicTotals, setEpicTotals] = useState({});
  const [sortedEpics, setSortedEpics] = useState([]);

  useEffect(() => {
    if (data) {
      const groupedData = {};
      data.forEach((issue) => {
        const epicName = issue.epicName;
        if (!groupedData[epicName]) {
          groupedData[epicName] = [];
        }
        groupedData[epicName].push(issue);
      });

      const totals = {};
      Object.keys(groupedData).forEach((epicName) => {
        totals[epicName] = groupedData[epicName].reduce((total, issue) => total + (issue.storyPoints || 0), 0);
      });

      // Sort epics by their total story points in descending order
      const sortedEpics = Object.keys(totals).sort((a, b) => totals[b] - totals[a]);

      setEpicTotals(totals);
      setSortedEpics(sortedEpics);
    }
  }, [data]);

  const handleEpicClick = (epicName) => {
    setSelectedEpic(epicName);
    setModalOpen(true);

    const selectedEpicData = data.find((issue) => issue.epicName === epicName);

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

  const paginatedEpics = sortedEpics.slice((currentPage - 1) * dataPerPage, currentPage * dataPerPage);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ textAlign: 'left', fontWeight: 'bold' }}> {issueType === 'available' ? 'Available Issues' : issueType === 'awaiting' ? 'Awaiting Confirmation' : 'Blocked Issues'}</h2>
          <h5 style={{ textAlign: 'left', fontSize: '15px' }}>{issueType === 'available' ? 'Ready for the next sprint' : issueType === 'awaiting' ? 'Requires client approval' : 'Blocked by Client or Internally'}</h5>
        </div>
        <div style={{ fontSize: "50px", padding: '10px', color: "#0F415A" }}>
          {issueType === 'available' ? <BsBank /> : issueType === 'awaiting' ? <MdPersonSearch /> : <ImBlocked />}
        </div>
      </div>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col" style={{ backgroundColor: "#0F415A", color: "white" }}>Epic Name</th>
            <th scope="col" style={{ backgroundColor: "#0F415A", color: "white" }}>Total Story Points</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEpics.map((epicName) => (
            <tr key={epicName} style={{ fontWeight: 'bold'}} onClick={() => handleEpicClick(epicName)}>
              <td>{epicName}</td>
              <td>{epicTotals[epicName]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={dataPerPage}
        totalItemsCount={sortedEpics.length}
        pageRangeDisplayed={3}
        onChange={setCurrentPage}
        itemClass="page-item"
        linkClass="page-link"
      />
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
              {data && data.filter((issue) => issue.epicName === selectedEpic).map((issue) => (
                <tr key={issue.key}>
                  <td>
                    <a href={`https://redantinternal.atlassian.net/browse/${issue.key}`} target="_blank">{issue.key}</a>
                  </td>
                  <td>{issue.storyPoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        {parentIssueLink && (
          <Modal.Footer style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontWeight: "bold", color: "black" }}>
              <span>Epic Link: </span>
              <a href={parentIssueLink} target="_blank" style={{ textDecoration: "none", color: "blue", borderBottom: "1px solid" }}>{selectedEpic}</a>
            </div>
            <Button variant="secondary" onClick={handleCloseModal} style={{ backgroundColor: '#E70127', borderColor: '#E70127' }}>Close</Button>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
}

export default FormatTable;
