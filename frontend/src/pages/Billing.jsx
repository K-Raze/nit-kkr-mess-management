import { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';
import * as api from '../services/api';

export default function Billing() {
  const [ledger, setLedger] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.getLedger();
      setLedger(res.data.ledger);
    } catch (err) {
      console.error('Billing fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClaimReward = async () => {
    try {
      const res = await api.claimReward();
      setMessage(res.data.message);
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to claim reward');
      setTimeout(() => setMessage(''), 4000);
    }
  };

  const handleGuestPass = async () => {
    try {
      const res = await api.buyGuestPass();
      setMessage(res.data.message);
      fetchData();
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to buy guest pass');
      setTimeout(() => setMessage(''), 4000);
    }
  };

  if (loading) {
    return <div className="loading-screen"><div className="spinner" /></div>;
  }

  return (
    <div className="fade-in">
      <div className="page-header">
        <h1>Billing</h1>
        <p>Manage your mess wallet and view billing details</p>
      </div>

      {message && (
        <div className="alert-success">{message}</div>
      )}

      {/* Stats */}
      <div className="billing-overview">
        <StatCard icon="💰" value={`₹${ledger?.currentBalance || 4000}`} label="Current Balance" iconBg="var(--color-primary-bg)" />
        <StatCard icon="📄" value={`₹${ledger?.totalBill || 0}`} label="Total Bill" iconBg="var(--color-warning-bg)" />
        <StatCard icon="🎁" value={`${ledger?.rewardsAvailableToClaim || 0}`} label="Claimable Rewards" iconBg="rgba(156, 39, 176, 0.08)" />
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 'var(--sp-3)', marginBottom: 'var(--sp-6)' }}>
        <button className="btn btn-primary" onClick={handleClaimReward}>🎁 Claim Reward</button>
        <button className="btn btn-outline" onClick={handleGuestPass}>👤 Buy Guest Pass (₹100)</button>
      </div>

      {/* Ledger Table */}
      <div className="card" style={{ padding: 'var(--sp-6)' }}>
        <h3 style={{ fontWeight: 700, marginBottom: 'var(--sp-4)', fontSize: 'var(--text-md)' }}>📋 Billing Summary</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Base Fee (Advance)</td><td>₹{ledger?.baseFee || 4000}</td></tr>
              <tr><td>Billed Days</td><td>{ledger?.billedDays || 0} days × ₹130 = ₹{ledger?.attendedDeduction || 0}</td></tr>
              <tr><td>Rebated Days</td><td>{ledger?.rebatedDays || 0} days</td></tr>
              <tr><td>Guest Dues</td><td>₹{ledger?.guestDues || 0}</td></tr>
              <tr><td>Skipped Meals</td><td>{ledger?.skippedMeals || 0} (need {2 - ((ledger?.skippedMeals || 0) % 2)} more for next reward)</td></tr>
              <tr style={{ fontWeight: 700 }}>
                <td>Current Balance</td>
                <td style={{ color: (ledger?.currentBalance || 0) >= 0 ? 'var(--color-primary)' : 'var(--color-danger)' }}>
                  ₹{ledger?.currentBalance || 4000}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
