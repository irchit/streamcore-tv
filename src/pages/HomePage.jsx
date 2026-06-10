import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, subscriptions, content } = useAppContext();
  
  const [selectedSourceId, setSelectedSourceId] = useState(subscriptions[0].id);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (location.state?.showSuccessToast) {
      setShowToast(true);
      const timer = setTimeout(() => {
        setShowToast(false);
        window.history.replaceState({}, document.title);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const selectedSubscription = subscriptions.find(sub => sub.id === selectedSourceId);
  const isSubscriptionActive = selectedSubscription?.active;

  const filteredContent = content.filter(item => item.sourceId === selectedSourceId);
  const cloudRecordings = filteredContent.filter(item => item.isRecording);
  const liveTvContent = filteredContent.filter(item => !item.isRecording);

  return (
    <div className="min-vh-100 text-light pb-5" style={{ backgroundColor: 'var(--bg)' }}>
      
      {showToast && (
        <div className="position-fixed top-0 start-50 translate-middle-x mt-4" style={{ minWidth: '320px', zIndex: 9999 }}>
          <div className="alert alert-success d-flex align-items-center gap-3 border-0 shadow-lg px-4 py-3 rounded-pill bg-success text-white" style={{ backdropFilter: 'blur(10px)' }}>
            <i className="bi bi-check-circle-fill fs-4"></i>
            <span className="fw-bold">Abonnement erfolgreich hinzugefügt!</span>
          </div>
        </div>
      )}
      
      <nav className="navbar navbar-expand-lg navbar-dark sticky-top py-3" style={{ background: 'linear-gradient(180deg, rgba(8,12,20,0.98) 0%, rgba(8,12,20,0.85) 100%)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)' }}>
        <div className="container-fluid px-4">
          <span className="navbar-brand fw-bold me-5" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', letterSpacing: '2px', color: 'var(--red)', cursor: 'pointer' }} onClick={() => navigate('/home')}>
            STREAM<span className="text-white">CORE</span>
          </span>
          
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-3 fw-medium">
              <li className="nav-item"><span className="nav-link active text-white" style={{cursor: 'pointer'}}>Startseite</span></li>
              <li className="nav-item"><span className="nav-link" style={{cursor: 'pointer'}}>Live TV</span></li>
              <li className="nav-item"><span className="nav-link" style={{cursor: 'pointer'}}>Cloud Aufnahmen</span></li>
            </ul>
          </div>

          <div className="d-flex align-items-center gap-4">
            <div className="dropdown">
              <button className="btn btn-dark border-secondary dropdown-toggle d-flex align-items-center gap-2" type="button" data-bs-toggle="dropdown">
                <i className="bi bi-geo-alt-fill text-primary"></i>
                {selectedSubscription?.name}
              </button>
              <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end shadow">
                <li className="dropdown-header">Geo-Zonen / TV Pakete</li>
                {subscriptions.filter(sub => sub.id !== 'cloud-ultra').map(sub => (
                  <li key={sub.id}>
                    <button 
                      className={`dropdown-item d-flex justify-content-between align-items-center ${selectedSourceId === sub.id ? 'active bg-primary' : ''}`}
                      onClick={() => setSelectedSourceId(sub.id)}
                    >
                      {sub.name}
                      {!sub.active && <i className="bi bi-lock-fill text-warning ms-3"></i>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div 
              className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center fw-bold shadow-sm" 
              style={{ width: '40px', height: '40px', cursor: 'pointer', background: 'linear-gradient(135deg, var(--blue), var(--purple))' }}
              onClick={() => navigate('/userprofile')}
            >
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
        </div>
      </nav>

      <div className="position-relative mb-5" style={{ height: '60vh', background: 'linear-gradient(135deg, #0a0010 0%, #0d1a35 50%, #0a0a0f 100%)', overflow: 'hidden' }}>
        <div className="position-absolute w-100 h-100" style={{ background: 'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(37,99,235,0.15) 0%, transparent 60%)' }}></div>
        <div className="container-fluid px-5 h-100 d-flex align-items-end pb-5 position-relative z-1">
          <div style={{ maxWidth: '600px' }}>
            <span className="badge bg-danger bg-opacity-25 text-danger border border-danger mb-3 px-3 py-2 fw-bold" style={{ letterSpacing: '1px' }}>
              <i className="bi bi-broadcast me-2"></i>LIVE PREMIERE
            </span>
            <h1 className="display-2 fw-bold text-white mb-3 shadow-sm" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px', lineHeight: '1' }}>
              GLOBAL<br/>NEWS NETWORK
            </h1>
            <p className="lead text-white-50 mb-4">
              Live-Berichterstattung direkt in deine Geozone gestreamt. Verpasse keine wichtigen Ereignisse mit unserem Auto-Recording Feature.
            </p>
            <div className="d-flex gap-3">
              <button className="btn btn-light fw-bold px-4 py-2 d-flex align-items-center gap-2">
                <i className="bi bi-play-fill fs-5"></i> Jetzt ansehen
              </button>
              <button className="btn btn-dark bg-opacity-50 border-secondary text-white fw-bold px-4 py-2 d-flex align-items-center gap-2" style={{ backdropFilter: 'blur(5px)' }}>
                <i className="bi bi-cloud-arrow-down fs-5"></i> Aufnehmen
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid px-5">
        {!isSubscriptionActive ? (
          <div className="card bg-dark border-secondary rounded-4 shadow-lg p-5 text-center my-5 animate__animated animate__fadeIn">
            <i className="bi bi-lock-fill display-1 text-warning mb-4"></i>
            <h2 className="fw-bold mb-3">Dieses Paket ist inaktiv</h2>
            <p className="text-secondary mb-4 fs-5">
              Du befindest dich in der Geo-Zone für <strong>{selectedSubscription.name}</strong>, hast aber derzeit kein aktives Abonnement dafür.
            </p>
            <div>
              <button 
                className="btn btn-primary btn-lg fw-bold rounded-pill px-5 shadow"
                onClick={() => navigate(`/userprofile?tab=selectAbo`)}
              >
                <i className="bi bi-cart-plus-fill me-2"></i> Zum Abonnement hinzufügen ({selectedSubscription.price} € /Mo)
              </button>
            </div>
          </div>
        ) : (
          <div className="animate__animated animate__fadeIn">
            
            <div className="mb-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold m-0 d-flex align-items-center gap-2">
                  <i className="bi bi-tv text-primary"></i> Live TV & On-Demand ({selectedSubscription.name})
                </h4>
              </div>
              <div className="d-flex gap-3 overflow-auto pb-4" style={{ scrollbarWidth: 'none' }}>
                {liveTvContent.map(item => (
                  <div key={item.id} className="card bg-transparent border-0 flex-shrink-0" style={{ width: '280px', cursor: 'pointer' }}>
                    <div className="position-relative rounded-3 overflow-hidden mb-2 shadow" style={{ height: '160px', background: 'linear-gradient(135deg, #1e3a6e 0%, #0d2a5e 100%)', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                      <div className="position-absolute top-0 end-0 m-2 badge bg-danger fw-bold">LIVE</div>
                      <div className="position-absolute bottom-0 start-0 w-100" style={{ height: '4px', background: 'rgba(255,255,255,0.2)' }}>
                        <div className="bg-primary h-100" style={{ width: `${item.progress}%` }}></div>
                      </div>
                    </div>
                    <h6 className="fw-bold text-white text-truncate m-0">{item.title}</h6>
                    <small className="text-secondary">{item.category}</small>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold m-0 d-flex align-items-center gap-2">
                  <i className="bi bi-cloud-check text-success"></i> Deine Cloud Aufnahmen
                </h4>
                <span className="badge bg-dark border border-secondary text-secondary">
                  {user.cloudUsed}GB / {user.cloudTotal}GB belegt
                </span>
              </div>
              <div className="d-flex gap-3 overflow-auto pb-4" style={{ scrollbarWidth: 'none' }}>
                {cloudRecordings.map(item => (
                  <div key={item.id} className="card bg-transparent border-0 flex-shrink-0" style={{ width: '280px', cursor: 'pointer' }}>
                    <div className="position-relative rounded-3 overflow-hidden mb-2 shadow" style={{ height: '160px', background: 'linear-gradient(135deg, #064e3b 0%, #0d2c22 100%)', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                      <div className="position-absolute top-0 end-0 m-2 badge bg-success fw-bold"><i className="bi bi-hdd-fill me-1"></i> CLOUD</div>
                      <div className="position-absolute bottom-0 start-0 w-100" style={{ height: '4px', background: 'rgba(255,255,255,0.2)' }}>
                        <div className="bg-primary h-100" style={{ width: `${item.progress}%` }}></div>
                      </div>
                    </div>
                    <h6 className="fw-bold text-white text-truncate m-0">{item.title}</h6>
                    <small className="text-secondary">{item.category}</small>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;