import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const ScrollRow = ({ children }) => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setHasMoved(true);
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleClickCapture = (e) => {
    if (hasMoved) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  return (
    <div
      ref={scrollRef}
      className={`custom-scroll-row ${isDragging ? 'grabbing' : ''}`}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onClickCapture={handleClickCapture}
    >
      {children}
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, subscriptions, content } = useAppContext();
  
  const [selectedSourceId, setSelectedSourceId] = useState('all');
  const [showToast, setShowToast] = useState(false);
  const [heroItem, setHeroItem] = useState(null);

  const selectedSubscription = selectedSourceId === 'all'
    ? { id: 'all', name: 'Alle anzeigen', status: 'active' }
    : subscriptions.find(sub => sub.id === selectedSourceId);

  const isSubscriptionActive = selectedSourceId === 'all' 
    ? true 
    : (selectedSubscription?.status === 'active' || selectedSubscription?.status === 'expiring');

  const isStreamItem = (sourceId) => ['amazon-prime', 'netflix', 'disney-plus'].includes(sourceId);

  useEffect(() => {
    if (selectedSourceId === 'all') {
      const activeItems = content.filter(item => !item.isRecording && ['active', 'expiring'].includes(subscriptions.find(sub => sub.id === item.sourceId)?.status));
      setHeroItem(activeItems.length > 0 ? activeItems[0] : null);
    } else {
      const filtered = content.filter(item => item.sourceId === selectedSourceId);
      setHeroItem(filtered.length > 0 ? filtered[0] : null);
    }
  }, [selectedSourceId, content, subscriptions]);

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

  const handleCardClick = (item) => {
    setHeroItem(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getHeroBadge = (item) => {
    if (!item) return null;
    if (item.isRecording) {
      return { bg: 'success', text: 'success', icon: 'bi-hdd-fill', label: 'CLOUD AUFNAHME' };
    }
    if (isStreamItem(item.sourceId)) {
      return { bg: 'primary', text: 'primary', icon: 'bi-play-circle-fill', label: 'STREAM' };
    }
    return { bg: 'danger', text: 'danger', icon: 'bi-broadcast', label: 'LIVE STREAM' };
  };

  const getCardBg = (sourceId) => {
    switch(sourceId) {
      case 'digi-ro': return 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)';
      case 'telekom-de': return 'linear-gradient(135deg, #4c0519 0%, #29030d 100%)';
      case 'amazon-prime': return 'linear-gradient(135deg, #082f49 0%, #031422 100%)';
      case 'netflix': return 'linear-gradient(135deg, #450a0a 0%, #200505 100%)';
      case 'disney-plus': return 'linear-gradient(135deg, #172554 0%, #080d21 100%)';
      default: return 'linear-gradient(135deg, #1e3a6e 0%, #0d2a5e 100%)';
    }
  };

  const heroBadge = getHeroBadge(heroItem);

  const activeContent = content.filter(item => {
    const sub = subscriptions.find(s => s.id === item.sourceId);
    return sub?.status === 'active' || sub?.status === 'expiring';
  });

  const continueWatchingStream = activeContent.filter(item => !item.isRecording && isStreamItem(item.sourceId) && item.progress > 0);
  const recentlyViewedLive = activeContent.filter(item => !item.isRecording && !isStreamItem(item.sourceId) && item.progress > 0).slice(0, 3);

  const availableMainContent = selectedSourceId === 'all' ? activeContent.filter(item => !item.isRecording) : content.filter(item => item.sourceId === selectedSourceId && !item.isRecording);
  const categories = [...new Set(availableMainContent.map(item => item.category))];

  const cloudRecordings = selectedSourceId === 'all'
    ? activeContent.filter(item => item.isRecording)
    : content.filter(item => item.sourceId === selectedSourceId && item.isRecording);

  const lockedContent = selectedSourceId === 'all'
    ? content.filter(item => !item.isRecording && !['active', 'expiring'].includes(subscriptions.find(sub => sub.id === item.sourceId)?.status))
    : [];

  return (
    <div className="min-vh-100 text-light pb-5" style={{ backgroundColor: 'var(--bg)' }}>
      
      <style>{`
        .custom-scroll-row {
          display: flex;
          flex-nowrap: nowrap;
          overflow-x: auto;
          gap: 1rem;
          padding-bottom: 1rem;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          cursor: grab;
        }
        .custom-scroll-row.grabbing {
          cursor: grabbing;
        }
        .custom-scroll-row::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scroll-row::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scroll-row::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scroll-row::-webkit-scrollbar-thumb:hover {
          background: var(--blue);
        }
        .stream-card {
          width: 280px;
          flex-shrink: 0;
          cursor: pointer;
        }
      `}</style>
      
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
              <li className="nav-item">
                <span 
                  className={`nav-link ${selectedSourceId === 'all' ? 'active text-white fw-bold' : ''}`} 
                  style={{ cursor: 'pointer' }} 
                  onClick={() => setSelectedSourceId('all')}
                >
                  Alle anzeigen
                </span>
              </li>
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
                <li>
                  <button 
                    className={`dropdown-item d-flex justify-content-between align-items-center ${selectedSourceId === 'all' ? 'active bg-primary' : ''}`}
                    onClick={() => setSelectedSourceId('all')}
                  >
                    Alle anzeigen
                  </button>
                </li>
                <li><hr className="dropdown-divider" /></li>
                {subscriptions.map(sub => (
                  <li key={sub.id}>
                    <button 
                      className={`dropdown-item d-flex justify-content-between align-items-center ${selectedSourceId === sub.id ? 'active bg-primary' : ''}`}
                      onClick={() => setSelectedSourceId(sub.id)}
                    >
                      {sub.name}
                      {sub.status === 'inactive' && <i className="bi bi-lock-fill text-warning ms-3"></i>}
                      {sub.status === 'expiring' && <i className="bi bi-exclamation-triangle-fill text-warning ms-3"></i>}
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

      {isSubscriptionActive && heroItem && (
        <div className="position-relative mb-5 animate__animated animate__fadeIn" style={{ height: '60vh', background: 'linear-gradient(135deg, #0a0010 0%, #0d1a35 50%, #0a0a0f 100%)', overflow: 'hidden' }}>
          <div className="position-absolute w-100 h-100" style={{ background: 'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(37,99,235,0.15) 0%, transparent 60%)' }}></div>
          <div className="container-fluid px-5 h-100 d-flex align-items-end pb-5 position-relative z-1">
            <div style={{ maxWidth: '600px' }}>
              <span className={`badge bg-${heroBadge.bg} bg-opacity-25 text-${heroBadge.text} border border-${heroBadge.bg} mb-3 px-3 py-2 fw-bold`} style={{ letterSpacing: '1px' }}>
                <i className={`${heroBadge.icon} me-2`}></i>
                {heroBadge.label}
              </span>
              <h1 className="display-3 fw-bold text-white mb-3 shadow-sm d-flex align-items-center gap-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '2px', lineHeight: '1' }}>
                <span style={{ fontSize: '1.2em' }}>{heroItem.emoji}</span> {heroItem.title}
              </h1>
              <p className="lead text-white-50 mb-4">
                Kategorie: <strong>{heroItem.category}</strong> — Stream-Übertragungsqualität in 4K Ultra HD mit erweitertem Dolby Atmos Audio Profil, optimiert für deine Region.
              </p>
              <div className="d-flex gap-3">
                <button className="btn btn-light fw-bold px-4 py-2 d-flex align-items-center gap-2">
                  <i className="bi bi-play-fill fs-5"></i> Jetzt ansehen ({heroItem.progress}%)
                </button>
                {!heroItem.isRecording && (
                  <button className="btn btn-dark bg-opacity-50 border-secondary text-white fw-bold px-4 py-2 d-flex align-items-center gap-2" style={{ backdropFilter: 'blur(5px)' }}>
                    <i className="bi bi-cloud-arrow-down fs-5"></i> In Cloud speichern
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container-fluid px-5">
        {!isSubscriptionActive ? (
          <div className="card bg-dark border-secondary rounded-4 shadow-lg p-5 text-center my-5 animate__animated animate__fadeIn">
            <i className="bi bi-lock-fill display-1 text-warning mb-4"></i>
            <h2 className="fw-bold mb-3">Dieses Paket ist inaktiv</h2>
            <p className="text-secondary mb-4 fs-5">
              Du hast derzeit kein aktives Abonnement für <strong>{selectedSubscription?.name}</strong>.
            </p>
            <div>
              <button 
                className="btn btn-primary btn-lg fw-bold rounded-pill px-5 shadow"
                onClick={() => navigate(`/userprofile?tab=selectAbo`)}
              >
                <i className="bi bi-cart-plus-fill me-2"></i> Zum Abonnement hinzufügen ({selectedSubscription?.price} € /Mo)
              </button>
            </div>
          </div>
        ) : (
          <div className="animate__animated animate__fadeIn">

            {selectedSourceId === 'all' && continueWatchingStream.length > 0 && (
              <div className="mb-5">
                <h4 className="fw-bold mb-3 d-flex align-items-center gap-2 text-primary">
                  <i className="bi bi-play-circle"></i> Weiterschauen (Stream)
                </h4>
                <ScrollRow>
                  {continueWatchingStream.map(item => (
                    <div key={item.id} className="card bg-transparent border-0 stream-card" onClick={() => handleCardClick(item)}>
                      <div className="position-relative rounded-3 overflow-hidden mb-2 shadow d-flex align-items-center justify-content-center" style={{ height: '160px', background: getCardBg(item.sourceId) }}>
                        <span style={{ fontSize: '4rem', opacity: '0.8', textShadow: '0px 4px 15px rgba(0,0,0,0.5)' }}>{item.emoji}</span>
                        <div className="position-absolute top-0 end-0 m-2 badge bg-primary fw-bold">STREAM</div>
                        <div className="position-absolute bottom-0 start-0 w-100" style={{ height: '4px', background: 'rgba(255,255,255,0.2)' }}>
                          <div className="bg-primary h-100" style={{ width: `${item.progress}%` }}></div>
                        </div>
                      </div>
                      <h6 className="fw-bold text-white text-truncate m-0">{item.title}</h6>
                      <small className="text-secondary">{item.category} — {item.progress}%</small>
                    </div>
                  ))}
                </ScrollRow>
              </div>
            )}

            {selectedSourceId === 'all' && recentlyViewedLive.length > 0 && (
              <div className="mb-5">
                <h4 className="fw-bold mb-3 d-flex align-items-center gap-2 text-danger">
                  <i className="bi bi-clock-history"></i> Zuletzt angesehen (Live TV)
                </h4>
                <ScrollRow>
                  {recentlyViewedLive.map(item => (
                    <div key={item.id} className="card bg-transparent border-0 stream-card" onClick={() => handleCardClick(item)}>
                      <div className="position-relative rounded-3 overflow-hidden mb-2 shadow d-flex align-items-center justify-content-center" style={{ height: '160px', background: getCardBg(item.sourceId) }}>
                        <span style={{ fontSize: '4rem', opacity: '0.8', textShadow: '0px 4px 15px rgba(0,0,0,0.5)' }}>{item.emoji}</span>
                        <div className="position-absolute top-0 end-0 m-2 badge bg-danger fw-bold">LIVE</div>
                        <div className="position-absolute bottom-0 start-0 w-100" style={{ height: '4px', background: 'rgba(255,255,255,0.2)' }}>
                          <div className="bg-danger h-100" style={{ width: `${item.progress}%` }}></div>
                        </div>
                      </div>
                      <h6 className="fw-bold text-white text-truncate m-0">{item.title}</h6>
                      <small className="text-secondary">{item.category}</small>
                    </div>
                  ))}
                </ScrollRow>
              </div>
            )}

            {categories.map(category => {
              const categoryItems = availableMainContent.filter(item => item.category === category);
              if (categoryItems.length === 0) return null;
              return (
                <div key={category} className="mb-5">
                  <h4 className="fw-bold mb-3 d-flex align-items-center gap-2">
                    <i className="bi bi-folder2-open text-secondary"></i> {category}
                  </h4>
                  <ScrollRow>
                    {categoryItems.map(item => {
                      const isStream = isStreamItem(item.sourceId);
                      return (
                        <div key={item.id} className="card bg-transparent border-0 stream-card" onClick={() => handleCardClick(item)}>
                          <div className="position-relative rounded-3 overflow-hidden mb-2 shadow d-flex align-items-center justify-content-center" style={{ height: '160px', background: getCardBg(item.sourceId) }}>
                            <span style={{ fontSize: '4rem', opacity: '0.8', textShadow: '0px 4px 15px rgba(0,0,0,0.5)' }}>{item.emoji}</span>
                            <div className={`position-absolute top-0 end-0 m-2 badge ${isStream ? 'bg-primary' : 'bg-danger'} fw-bold`}>
                              {isStream ? 'STREAM' : 'LIVE'}
                            </div>
                            <div className="position-absolute bottom-0 start-0 w-100" style={{ height: '4px', background: 'rgba(255,255,255,0.2)' }}>
                              <div className="bg-primary h-100" style={{ width: `${item.progress}%` }}></div>
                            </div>
                          </div>
                          <h6 className="fw-bold text-white text-truncate m-0">{item.title}</h6>
                          <small className="text-secondary">
                            {selectedSourceId === 'all' ? subscriptions.find(s => s.id === item.sourceId)?.name : item.category}
                          </small>
                        </div>
                      );
                    })}
                  </ScrollRow>
                </div>
              );
            })}

            {cloudRecordings.length > 0 && (
              <div className="mb-5">
                <h4 className="fw-bold mb-3 d-flex align-items-center gap-2 text-success">
                  <i className="bi bi-cloud-check"></i> Deine Cloud Aufnahmen
                </h4>
                <ScrollRow>
                  {cloudRecordings.map(item => (
                    <div key={item.id} className="card bg-transparent border-0 stream-card" onClick={() => handleCardClick(item)}>
                      <div className="position-relative rounded-3 overflow-hidden mb-2 shadow d-flex align-items-center justify-content-center" style={{ height: '160px', background: 'linear-gradient(135deg, #064e3b 0%, #0d2c22 100%)' }}>
                        <span style={{ fontSize: '4rem', opacity: '0.8', textShadow: '0px 4px 15px rgba(0,0,0,0.5)' }}>{item.emoji}</span>
                        <div className="position-absolute top-0 end-0 m-2 badge bg-success fw-bold"><i className="bi bi-hdd-fill me-1"></i> CLOUD</div>
                        <div className="position-absolute bottom-0 start-0 w-100" style={{ height: '4px', background: 'rgba(255,255,255,0.2)' }}>
                          <div className="bg-primary h-100" style={{ width: `${item.progress}%` }}></div>
                        </div>
                      </div>
                      <h6 className="fw-bold text-white text-truncate m-0">{item.title}</h6>
                      <small className="text-secondary">{item.category}</small>
                    </div>
                  ))}
                </ScrollRow>
              </div>
            )}

            {selectedSourceId === 'all' && lockedContent.length > 0 && (
              <div className="mb-5">
                <h4 className="fw-bold mb-3 d-flex align-items-center gap-2 text-warning">
                  <i className="bi bi-lock-fill"></i> Gesperrt (Nicht abonnierte Inhalte)
                </h4>
                <ScrollRow>
                  {lockedContent.map(item => {
                    const subInfo = subscriptions.find(s => s.id === item.sourceId);
                    return (
                      <div key={item.id} className="card bg-transparent border-0 stream-card" onClick={() => navigate('/userprofile?tab=selectAbo')}>
                        <div className="position-relative rounded-3 overflow-hidden mb-2 shadow d-flex align-items-center justify-content-center" style={{ height: '160px', background: 'linear-gradient(135deg, #201115 0%, #0f0709 100%)', border: '1px solid rgba(255,45,58,0.1)' }}>
                          <span style={{ fontSize: '4rem', opacity: '0.2', filter: 'grayscale(100%)' }}>{item.emoji}</span>
                          <div className="position-absolute top-0 end-0 m-2 badge bg-warning text-dark fw-bold shadow-sm">
                            <i className="bi bi-lock-fill me-1"></i> GESPERRT
                          </div>
                          <div className="position-absolute bottom-0 start-0 m-2 bg-black bg-opacity-70 px-2 py-1 rounded small text-white-50" style={{ fontSize: '0.75rem' }}>
                            {subInfo?.name}
                          </div>
                        </div>
                        <h6 className="fw-bold text-white-50 text-truncate m-0">{item.title}</h6>
                        <small className="text-muted">{item.category}</small>
                      </div>
                    );
                  })}
                </ScrollRow>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;