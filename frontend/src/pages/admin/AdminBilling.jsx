import { useState, useEffect } from 'react';
import { getPendingRebates, updateRebateStatus } from '../../services/api';

export default function AdminBilling() {
  const [rebates, setRebates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRebates();
  }, []);

  const fetchRebates = async () => {
    try {
      const res = await getPendingRebates();
      setRebates(res.data.rebates || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, status) => {
    if (!window.confirm(`Are you sure you want to ${status} this rebate?`)) return;
    try {
      await updateRebateStatus(id, status);
      fetchRebates();
    } catch (err) {
      alert(err.response?.data?.message || `Failed to ${status} rebate.`);
    }
  };

  if (loading) return <div className="loading-screen"><div className="spinner" /></div>;

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1>Billing Overview</h1>
        <p>Monitor system revenue and process pending rebates</p>
      </div>

      <div className="card" style={{ padding: 'var(--sp-6)' }}>
        <h3 className="section-heading">Pending Rebate Requests</h3>

        {rebates.length === 0 ? (
          <div className="empty-state">No pending rebate requests.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Roll Number</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Reason</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rebates.map(r => (
                  <tr key={r._id}>
                    <td>{r.user?.name || 'Unknown'}</td>
                    <td>{r.user?.email ? r.user.email.split('@')[0] : 'N/A'}</td>
                    <td>{new Date(r.startDate).toLocaleDateString()}</td>
                    <td>{new Date(r.endDate).toLocaleDateString()}</td>
                    <td className="truncate" title={r.reason}>{r.reason}</td>
                    <td className="actions-cell">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleAction(r._id, 'approved')}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleAction(r._id, 'rejected')}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
