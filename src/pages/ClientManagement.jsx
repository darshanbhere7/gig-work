import React, { useState } from "react";

const ClientManagement = () => {
  const [clients, setClients] = useState(
    JSON.parse(localStorage.getItem("clients")) || []
  );
  const [clientName, setClientName] = useState("");
  const [project, setProject] = useState("");

  const handleAddClient = () => {
    if (clientName && project) {
      const newClients = [...clients, { clientName, project }];
      setClients(newClients);
      localStorage.setItem("clients", JSON.stringify(newClients));
      setClientName("");
      setProject("");
    } else {
      alert("Please fill out both fields.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Client Management</h2>
      <div className="p-4 border rounded shadow">
        <div className="mb-3">
          <label className="form-label">Client Name</label>
          <input
            type="text"
            className="form-control"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Project Name</label>
          <input
            type="text"
            className="form-control"
            value={project}
            onChange={(e) => setProject(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-100" onClick={handleAddClient}>
          Add Client
        </button>
      </div>

      <div className="mt-4">
        <h4>Client List</h4>
        {clients.length > 0 ? (
          <ul className="list-group">
            {clients.map((client, index) => (
              <li key={index} className="list-group-item">
                <strong>{client.clientName}</strong> — {client.project}
              </li>
            ))}
          </ul>
        ) : (
          <p>No clients added yet.</p>
        )}
      </div>
    </div>
  );
};

export default ClientManagement;
