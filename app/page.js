"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");

  useEffect(() => {
    fetch("/api/leads")
      .then(res => res.json())
      .then(setLeads);
  }, []);

  const generateSummary = async () => {
    const res = await fetch("/api/summary", {
      method: "POST",
      body: JSON.stringify({ notes }),
    });
    const data = await res.json();
    setSummary(data.summary);
  };

  const saveNotes = async () => {
    await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify({
        leadId: selectedLead.id,
        notes,
        summary,
      }),
    });
    alert("Saved");
    closeModal();
  };

  const closeModal = () => {
    setSelectedLead(null);
    setNotes("");
    setSummary("");
  };

  return (
    <div className="container">
      <h2>Lead Sync + Notes</h2>

      <table className="leads-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leads.map(lead => (
            <tr key={lead.id}>
              <td data-label="Name">{lead.name}</td>
<td data-label="Email">{lead.email}</td>
<td data-label="Phone">{lead.phone}</td>

              <td>
                <button
                  className="primary-btn"
                  onClick={() => setSelectedLead(lead)}
                >
                  Add Notes
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {selectedLead && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Notes for {selectedLead.name}</h3>

            <textarea
              rows="4"
              placeholder="Write notes here..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />

            <div className="modal-actions">
              <button
                className="secondary-btn"
                onClick={generateSummary}
              >
                Generate AI Summary
              </button>

              <button
                className="primary-btn"
                onClick={saveNotes}
              >
                Save
              </button>

              <button
                className="danger-btn"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>

            {summary && (
              <div className="summary-box">
                <strong>AI Summary:</strong>
                <p>{summary}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
