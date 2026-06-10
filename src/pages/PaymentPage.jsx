import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedId = searchParams.get('selected');
  const { subscriptions, activateSubscription } = useAppContext();

  const subToBuy = subscriptions.find(sub => sub.id === selectedId);

  if (!subToBuy) {
    return (
      <div className="min-vh-100 text-light d-flex align-items-center justify-content-center" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="text-center">
          <h2>Abonnement nicht gefunden</h2>
          <button className="btn btn-primary mt-3 rounded-pill" onClick={() => navigate('/home')}>Zur Startseite</button>
        </div>
      </div>
    );
  }

  const handlePayment = () => {
    activateSubscription(selectedId);
    navigate('/home', { state: { showSuccessToast: true } });
  };

  return (
    <div className="min-vh-100 text-light pb-5" style={{ backgroundColor: 'var(--bg)' }}>
      <nav className="navbar navbar-expand-lg navbar-dark py-3" style={{ background: 'rgba(8, 12, 20, 0.9)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--border)' }}>
        <div className="container-fluid px-4">
          <span className="navbar-brand fw-bold" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', letterSpacing: '2px', color: 'var(--red)', cursor: 'pointer' }} onClick={() => navigate('/home')}>
            STREAM<span className="text-white">CORE</span>
          </span>
          <button className="btn btn-outline-secondary btn-sm rounded-pill px-3" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left me-2"></i> Zurück
          </button>
        </div>
      </nav>

      <div className="container mt-5" style={{ maxWidth: '550px' }}>
        <div className="card bg-dark border-secondary rounded-4 shadow-lg p-4 animate__animated animate__fadeIn">
          <h3 className="fw-bold text-center mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Sichere Kasse</h3>
          
          <div className="bg-secondary bg-opacity-10 border border-secondary rounded-3 p-3 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="fw-bold text-white">{subToBuy.name}</span>
              <span className="fw-bold font-monospace text-primary fs-5">{subToBuy.price} €</span>
            </div>
            <p className="text-secondary small m-0">{subToBuy.desc}</p>
          </div>

          <div className="d-flex flex-column gap-2 mb-4">
            <button className="btn btn-dark py-2.5 fw-bold rounded-3 d-flex align-items-center justify-content-center gap-2 border-0" style={{ backgroundColor: '#000', color: '#fff', fontSize: '1rem' }} onClick={handlePayment}>
              <i className="bi bi-apple fs-5"></i> Mit Apple Pay bezahlen
            </button>
            <button className="btn btn-light py-2.5 fw-bold rounded-3 d-flex align-items-center justify-content-center gap-2 border border-secondary shadow-sm" style={{ backgroundColor: '#fff', color: '#000', fontSize: '1rem' }} onClick={handlePayment}>
              <i className="bi bi-google fs-5 text-primary"></i> Mit Google Pay bezahlen
            </button>
          </div>

          <div className="d-flex align-items-center my-4 text-secondary">
            <hr className="flex-grow-1 border-secondary" />
            <span className="px-3 small text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Oder mit Kreditkarte</span>
            <hr className="flex-grow-1 border-secondary" />
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }}>
            <div className="mb-3">
              <label className="form-label text-secondary small fw-medium">Kartennummer</label>
              <div className="input-group">
                <span className="input-group-text bg-secondary bg-opacity-10 border-secondary text-secondary"><i className="bi bi-credit-card"></i></span>
                <input type="text" className="form-control bg-transparent border-secondary text-light shadow-none font-monospace" placeholder="4242 4242 4242 4242" required />
              </div>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-6">
                <label className="form-label text-secondary small fw-medium">Gültig bis</label>
                <input type="text" className="form-control bg-transparent border-secondary text-light shadow-none font-monospace" placeholder="MM / YY" required />
              </div>
              <div className="col-6">
                <label className="form-label text-secondary small fw-medium">CVC</label>
                <input type="text" className="form-control bg-transparent border-secondary text-light shadow-none font-monospace" placeholder="123" required />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 py-3 fw-bold rounded-3 shadow text-uppercase" style={{ letterSpacing: '1px' }}>
              {subToBuy.price} € Jetzt Bezahlen
            </button>
          </form>

          <div className="text-center mt-4 text-secondary small">
            <i className="bi bi-shield-lock-fill me-2 text-success"></i> Gesicherte SSL-Verbindung via Stripe Framework
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;