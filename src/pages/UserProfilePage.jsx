import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const UserProfilePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, subscriptions, deactivateSubscription, activateSubscription, terminateSubscription } = useAppContext();
  
  const isAboTab = searchParams.get('tab') === 'selectAbo';

  const totalCost = subscriptions
    .filter(sub => sub.status === 'active')
    .reduce((sum, sub) => sum + parseFloat(sub.price), 0)
    .toFixed(2);

  const handleSubscriptionClick = (sub) => {
    if (sub.status === 'inactive') {
      navigate(`/payment?selected=${sub.id}`);
    }
  };

  return (
    <div className="min-vh-100 text-light pb-5" style={{ backgroundColor: 'var(--bg)' }}>
      <nav className="navbar navbar-expand-lg navbar-dark sticky-top py-3" style={{ background: 'rgba(8, 12, 20, 0.9)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--border)' }}>
        <div className="container-fluid px-4">
          <span className="navbar-brand fw-bold" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', letterSpacing: '2px', color: 'var(--red)', cursor: 'pointer' }} onClick={() => navigate('/home')}>
            STREAM<span className="text-white">CORE</span>
          </span>
          <button className="btn btn-outline-secondary btn-sm rounded-pill px-3" onClick={() => navigate('/home')}>
            <i className="bi bi-arrow-left me-2"></i> Zurück zur Startseite
          </button>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="card bg-dark border-secondary rounded-4 shadow-sm p-4 text-center animate__animated animate__fadeIn">
              <div className="rounded-circle mx-auto mb-3 d-flex justify-content-center align-items-center fw-bold shadow-sm" style={{ width: '80px', height: '80px', fontSize: '2rem', background: 'linear-gradient(135deg, var(--blue), var(--purple))' }}>
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h4 className="fw-bold mb-1">{user.name}</h4>
              <p className="text-secondary small mb-4">Konto-Typ: Premium User</p>
              
              <div className="text-start border-top border-secondary pt-3">
                <div className="d-flex justify-content-between mb-2 small">
                  <span className="text-secondary">Nächster Zahltag:</span>
                  <span className="text-white fw-medium font-monospace">{user.paymentday}</span>
                </div>
                <div className="d-flex justify-content-between small mb-2">
                  <span className="text-secondary">Geo-Zone:</span>
                  <span className="badge bg-secondary">{user.geoZone}</span>
                </div>
              </div>
            </div>

            <div className="card bg-dark border-secondary rounded-4 shadow-sm p-4 mt-4 animate__animated animate__fadeIn">
              <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
                <i className="bi bi-cloud-check text-success"></i> Cloud-Speicher
              </h5>
              <div className="progress bg-secondary bg-opacity-25 mb-2" style={{ height: '8px' }}>
                <div className="progress-bar bg-success" style={{ width: `${(user.cloudUsed / user.cloudTotal) * 100}%` }}></div>
              </div>
              <div className="d-flex justify-content-between small text-secondary">
                <span>{user.cloudUsed} GB von {user.cloudTotal} GB belegt</span>
                <span>{Math.round((user.cloudUsed / user.cloudTotal) * 100)}%</span>
              </div>
              {!isAboTab && (
                <button className="btn btn-outline-primary btn-sm w-100 mt-4 rounded-pill fw-bold" onClick={() => navigate('/userprofile?tab=selectAbo')}>
                  <i className="bi bi-plus-circle me-2"></i> Speicher erweitern
                </button>
              )}
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card bg-dark border-secondary rounded-4 shadow-sm p-4 h-100 animate__animated animate__fadeIn">
              <div className="d-flex justify-content-between align-items-center border-bottom border-secondary pb-3 mb-4">
                <h4 className="fw-bold m-0">
                  {isAboTab ? 'Abonnement verwalten' : 'Konto-Übersicht'}
                </h4>
                {isAboTab ? (
                  <button className="btn btn-outline-secondary btn-sm rounded-pill fw-bold px-4 shadow-sm" onClick={() => navigate('/userprofile')}>
                    <i className="bi bi-x-lg me-2"></i> Schließen
                  </button>
                ) : (
                  <button className="btn btn-primary btn-sm rounded-pill fw-bold px-4 shadow-sm" onClick={() => navigate('/userprofile?tab=selectAbo')}>
                    <i className="bi bi-patch-plus me-2"></i> Pakete verwalten
                  </button>
                )}
              </div>

              <div className="d-flex justify-content-between align-items-center bg-dark border border-secondary rounded-3 p-3 mb-4 shadow-sm">
                <span className="text-secondary fw-medium">Monatliche Gesamtkosten:</span>
                <span className="fs-3 fw-bold text-white font-monospace">{totalCost} €</span>
              </div>

              <div className="row g-3">
                {subscriptions.map(sub => (
                  <div key={sub.id} className={`col-12 p-3 rounded-3 border d-flex justify-content-between align-items-center flex-wrap gap-3 transition-all ${sub.status === 'active' ? 'border-success bg-success bg-opacity-10' : sub.status === 'expiring' ? 'border-warning bg-warning bg-opacity-10' : 'border-secondary bg-transparent'}`}>
                    <div style={{ maxWidth: '65%' }}>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <h5 className="fw-bold m-0 text-white">{sub.name}</h5>
                        <span className={`badge px-2 py-1 small ${sub.status === 'active' ? 'bg-success text-white' : sub.status === 'expiring' ? 'bg-warning text-dark' : 'bg-secondary text-dark'}`}>
                          {sub.status === 'active' ? 'Aktiv' : sub.status === 'expiring' ? 'Läuft ab' : 'Inaktiv'}
                        </span>
                      </div>
                      <p className="text-secondary small m-0">{sub.desc}</p>
                      {sub.status === 'expiring' && (
                        <p className="text-warning small m-0 mt-2 fw-bold d-flex align-items-center gap-1">
                          <i className="bi bi-exclamation-circle-fill"></i> Gekündigt: Gilt bis zum {user.paymentday}
                        </p>
                      )}
                    </div>
                    <div className="text-end d-flex flex-column align-items-end gap-2">
                      <span className="font-monospace fw-bold fs-5 text-white">{sub.price} € <span className="fs-6 text-secondary fw-normal">/Mo</span></span>
                      
                      {isAboTab && (
                        <div>
                          {sub.status === 'active' && (
                            <button 
                              className="btn btn-sm px-4 rounded-pill fw-bold btn-outline-danger"
                              onClick={() => deactivateSubscription(sub.id)}
                            >
                              Kündigen
                            </button>
                          )}
                          {sub.status === 'expiring' && (
                            <div className="d-flex gap-2">
                              <button 
                                className="btn btn-sm px-3 rounded-pill fw-bold btn-success"
                                onClick={() => activateSubscription(sub.id)}
                              >
                                Reaktivieren (Gratis)
                              </button>
                              <button 
                                className="btn btn-sm px-3 rounded-pill fw-bold btn-outline-danger"
                                onClick={() => terminateSubscription(sub.id)}
                              >
                                Endgültig löschen
                              </button>
                            </div>
                          )}
                          {sub.status === 'inactive' && (
                            <button 
                              className="btn btn-sm px-4 rounded-pill fw-bold btn-primary shadow-sm"
                              onClick={() => handleSubscriptionClick(sub)}
                            >
                              Aktivieren
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;