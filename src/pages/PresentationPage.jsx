import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const PresentationPage = () => {
  const [activeTab, setActiveTab] = useState('arch');
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 text-light" style={{ backgroundColor: 'var(--bg)' }}>
      <nav className="navbar navbar-expand-lg navbar-dark sticky-top py-3" style={{ background: 'rgba(8, 12, 20, 0.9)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <span className="navbar-brand fw-bold" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', letterSpacing: '2px', color: 'var(--red)' }}>
            STREAM<span className="text-white">CORE</span>
          </span>
          <div className="d-flex align-items-center">
            <span className="badge bg-dark border border-secondary text-secondary me-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              v2.4.1 (Tema 2)
            </span>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        <ul className="nav nav-pills justify-content-center mb-5 gap-3" role="tablist">
          <li className="nav-item" role="presentation">
            <button 
              className={`nav-link px-4 py-2 rounded-pill fw-medium ${activeTab === 'arch' ? 'bg-primary text-white' : 'text-secondary border border-secondary'}`}
              onClick={() => setActiveTab('arch')}
              style={{ transition: 'all 0.3s ease' }}
            >
              <i className="bi bi-diagram-3 me-2"></i> ① Architektur
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button 
              className={`nav-link px-4 py-2 rounded-pill fw-medium ${activeTab === 'spec' ? 'bg-primary text-white' : 'text-secondary border border-secondary'}`}
              onClick={() => setActiveTab('spec')}
              style={{ transition: 'all 0.3s ease' }}
            >
              <i className="bi bi-card-checklist me-2"></i> ② Spezifikation
            </button>
          </li>
          <li className="nav-item ms-md-4" role="presentation">
            <button 
              className="nav-link px-4 py-2 rounded-pill fw-bold bg-success text-white border-0 shadow-sm"
              onClick={() => navigate('/home')}
              style={{ transition: 'transform 0.2s ease', ':hover': { transform: 'scale(1.05)' } }}
            >
              <i className="bi bi-play-circle-fill me-2"></i> ③ UX/UI Testen
            </button>
          </li>
        </ul>

        {activeTab === 'arch' && (
          <div className="fade-in animate__animated animate__fadeIn">
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
                HIGH-LEVEL SYSTEM ARCHITEKTUR
              </h1>
              <p className="lead text-secondary">TV-Streaming mit Geo-Lokalisierung und Auto-Recording im Cloud-Speicher</p>
            </div>

            <div className="card bg-transparent border-secondary shadow-lg rounded-4 overflow-hidden mb-5">
              <div className="card-header border-secondary bg-dark py-3 d-flex justify-content-center gap-4 flex-wrap">
                <span className="text-secondary small"><i className="bi bi-circle-fill text-primary me-2"></i>Internes Modul</span>
                <span className="text-secondary small"><i className="bi bi-circle-fill text-warning me-2"></i>Externes Interface</span>
                <span className="text-secondary small"><i className="bi bi-arrow-right text-primary me-2"></i>Sync (REST/gRPC)</span>
                <span className="text-secondary small"><i className="bi bi-arrow-right-short text-warning border-bottom border-warning border-2 border-dashed me-2"></i>Async (Queue)</span>
              </div>
              <div className="card-body p-0 position-relative" style={{ backgroundColor: 'var(--surface2)', height: '550px', cursor: 'grab' }}>
                <div className="position-absolute top-0 end-0 p-3 z-3">
                  <span className="badge bg-dark border border-secondary bg-opacity-75">
                    <i className="bi bi-mouse me-2"></i>Scroll to zoom, drag to pan
                  </span>
                </div>
                
                <TransformWrapper initialScale={1} minScale={0.5} maxScale={4} centerOnInit={true}>
                  <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
                    <svg viewBox="0 0 1100 500" xmlns="http://www.w3.org/2000/svg" style={{ width: '1100px', height: '500px' }}>
                      <defs>
                        <marker id="arrow-blue" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#3b82f6"/></marker>
                        <marker id="arrow-orange" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#f97316"/></marker>
                        <marker id="arrow-gray" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#eab308"/></marker>
                      </defs>
                      
                      <rect x="10" y="10" width="220" height="480" rx="8" fill="rgba(249,115,22,0.04)" stroke="rgba(249,115,22,0.15)" strokeWidth="1" strokeDasharray="4,4"/>
                      <text x="120" y="32" textAnchor="middle" fontFamily="'JetBrains Mono',monospace" fontSize="10" fill="rgba(249,115,22,0.6)">EXTERNAL LAYER</text>
                      
                      <rect x="240" y="10" width="620" height="480" rx="8" fill="rgba(37,99,235,0.04)" stroke="rgba(37,99,235,0.15)" strokeWidth="1" strokeDasharray="4,4"/>
                      <text x="550" y="32" textAnchor="middle" fontFamily="'JetBrains Mono',monospace" fontSize="10" fill="rgba(37,99,235,0.6)">CORE PLATFORM</text>
                      
                      <rect x="870" y="10" width="220" height="480" rx="8" fill="rgba(249,115,22,0.04)" stroke="rgba(249,115,22,0.15)" strokeWidth="1" strokeDasharray="4,4"/>
                      <text x="980" y="32" textAnchor="middle" fontFamily="'JetBrains Mono',monospace" fontSize="10" fill="rgba(249,115,22,0.6)">EXTERNAL SERVICES</text>

                      <rect x="30" y="80" width="180" height="64" rx="8" fill="#1a2008" stroke="#f97316" strokeWidth="1.5"/>
                      <text x="120" y="106" textAnchor="middle" fontFamily="'Bebas Neue',sans-serif" fontSize="14" fill="#fb923c">USER CLIENT</text>
                      <text x="120" y="124" textAnchor="middle" fontFamily="'DM Sans',sans-serif" fontSize="10" fill="rgba(249,115,22,0.6)">Playback & Cloud UI</text>

                      <rect x="30" y="240" width="180" height="64" rx="8" fill="#1a2008" stroke="#f97316" strokeWidth="1.5"/>
                      <text x="120" y="266" textAnchor="middle" fontFamily="'Bebas Neue',sans-serif" fontSize="14" fill="#fb923c">TV BROADCASTERS</text>
                      <text x="120" y="284" textAnchor="middle" fontFamily="'DM Sans',sans-serif" fontSize="10" fill="rgba(249,115,22,0.6)">IPTV Live Feeds</text>

                      <rect x="280" y="80" width="160" height="64" rx="8" fill="#0d1a35" stroke="#2563eb" strokeWidth="1.5"/>
                      <text x="360" y="106" textAnchor="middle" fontFamily="'Bebas Neue',sans-serif" fontSize="14" fill="#60a5fa">GEO-LOCATION</text>
                      <text x="360" y="124" textAnchor="middle" fontFamily="'DM Sans',sans-serif" fontSize="10" fill="rgba(96,165,250,0.6)">IP / Region Mapping</text>

                      <rect x="480" y="80" width="160" height="64" rx="8" fill="#0d1a35" stroke="#2563eb" strokeWidth="1.5"/>
                      <text x="560" y="106" textAnchor="middle" fontFamily="'Bebas Neue',sans-serif" fontSize="14" fill="#60a5fa">RECOMMENDATION</text>
                      <text x="560" y="124" textAnchor="middle" fontFamily="'DM Sans',sans-serif" fontSize="10" fill="rgba(96,165,250,0.6)">Geo-based Content</text>

                      <rect x="280" y="240" width="160" height="64" rx="8" fill="#0d1a35" stroke="#8b5cf6" strokeWidth="1.5"/>
                      <text x="360" y="266" textAnchor="middle" fontFamily="'Bebas Neue',sans-serif" fontSize="14" fill="#a78bfa">RECORDING ENGINE</text>
                      <text x="360" y="284" textAnchor="middle" fontFamily="'DM Sans',sans-serif" fontSize="10" fill="rgba(167,139,250,0.6)">Auto-Recording Manager</text>

                      <rect x="480" y="240" width="160" height="64" rx="8" fill="#0d1a35" stroke="#2563eb" strokeWidth="1.5"/>
                      <text x="560" y="266" textAnchor="middle" fontFamily="'Bebas Neue',sans-serif" fontSize="14" fill="#60a5fa">STREAMING ENGINE</text>
                      <text x="560" y="284" textAnchor="middle" fontFamily="'DM Sans',sans-serif" fontSize="10" fill="rgba(96,165,250,0.6)">Live & Cloud VOD</text>

                      <rect x="360" y="400" width="200" height="50" rx="8" fill="#12120a" stroke="#eab308" strokeWidth="1.5"/>
                      <text x="460" y="426" textAnchor="middle" fontFamily="'Bebas Neue',sans-serif" fontSize="14" fill="#fde047">ASYNC EVENT BUS</text>
                      <text x="460" y="440" textAnchor="middle" fontFamily="'DM Sans',sans-serif" fontSize="9" fill="rgba(253,224,71,0.6)">Kafka Cluster</text>

                      <rect x="890" y="240" width="180" height="64" rx="8" fill="#1a2008" stroke="#f97316" strokeWidth="1.5"/>
                      <text x="980" y="266" textAnchor="middle" fontFamily="'Bebas Neue',sans-serif" fontSize="14" fill="#fb923c">PERSONAL CLOUD (S3)</text>
                      <text x="980" y="284" textAnchor="middle" fontFamily="'DM Sans',sans-serif" fontSize="10" fill="rgba(249,115,22,0.6)">User Recorded Video</text>

                      <line x1="210" y1="112" x2="272" y2="112" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow-blue)"/>
                      <line x1="210" y1="272" x2="272" y2="272" stroke="#f97316" strokeWidth="1.5" markerEnd="url(#arrow-orange)"/>
                      <line x1="440" y1="112" x2="472" y2="112" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow-blue)"/>
                      <line x1="440" y1="272" x2="472" y2="272" stroke="#8b5cf6" strokeWidth="1.5" markerEnd="url(#arrow-blue)"/>
                      <line x1="640" y1="272" x2="882" y2="272" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow-blue)"/>
                      <path d="M 360 304 L 360 392" fill="none" stroke="#eab308" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#arrow-gray)"/>
                    </svg>
                  </TransformComponent>
                </TransformWrapper>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'spec' && (
          <div className="fade-in animate__animated animate__fadeIn">
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '3px' }}>
                SYSTEM-SPEZIFIKATION
              </h1>
              <p className="lead text-secondary">Anforderungen, Limitierungen und Features für das TV Streaming System</p>
            </div>

            <div className="row g-4 mb-5">
              <div className="col-md-6">
                <div className="card h-100 bg-dark border-secondary rounded-4 shadow">
                  <div className="card-body p-4">
                    <h5 className="card-title text-primary fw-bold mb-4 d-flex align-items-center">
                      <i className="bi bi-gear-wide-connected fs-4 me-3"></i> QUALITATIVE ASPEKTE
                    </h5>
                    <ul className="list-group list-group-flush bg-transparent">
                      <li className="list-group-item bg-transparent text-light border-secondary px-0 py-3 d-flex gap-3">
                        <i className="bi bi-geo-alt text-primary mt-1"></i>
                        <div><strong>Geo-Lokalisierung:</strong> Das System ermittelt die Region und schaltet automatisch regionale TV-Pakete und passende Content-Vorschläge frei.</div>
                      </li>
                      <li className="list-group-item bg-transparent text-light border-secondary px-0 py-3 d-flex gap-3">
                        <i className="bi bi-cloud-arrow-up text-primary mt-1"></i>
                        <div><strong>Personal Cloud Storage:</strong> Dedizierter Speicherbereich pro Nutzer für Aufzeichnungen, getrennt vom regulären Live-Streaming-Puffer.</div>
                      </li>
                      <li className="list-group-item bg-transparent text-light border-0 px-0 pt-3 d-flex gap-3">
                        <i className="bi bi-layers text-primary mt-1"></i>
                        <div><strong>Skalierbarkeit:</strong> Microservices Architektur. Der Recording-Engine verarbeitet zehntausende Auto-Recordings während Prime-Time Events.</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card h-100 bg-dark border-secondary rounded-4 shadow">
                  <div className="card-body p-4">
                    <h5 className="card-title text-success fw-bold mb-4 d-flex align-items-center">
                      <i className="bi bi-bar-chart-fill fs-4 me-3"></i> QUANTITATIVE ZIELE
                    </h5>
                    <ul className="list-group list-group-flush bg-transparent">
                      <li className="list-group-item bg-transparent text-light border-secondary px-0 py-3 d-flex gap-3 align-items-center">
                        <i className="bi bi-hdd-network text-success"></i>
                        <div className="flex-grow-1"><strong>Cloud-Speicher</strong> — Standard pro Nutzer</div>
                        <span className="badge bg-success bg-opacity-25 text-success font-monospace px-2 py-1 border border-success">50 GB</span>
                      </li>
                      <li className="list-group-item bg-transparent text-light border-secondary px-0 py-3 d-flex gap-3 align-items-center">
                        <i className="bi bi-activity text-success"></i>
                        <div className="flex-grow-1"><strong>Verfügbarkeit</strong> — System-Uptime</div>
                        <span className="badge bg-success bg-opacity-25 text-success font-monospace px-2 py-1 border border-success">99.9%</span>
                      </li>
                      <li className="list-group-item bg-transparent text-light border-0 px-0 pt-3 d-flex gap-3 align-items-center">
                        <i className="bi bi-people text-success"></i>
                        <div className="flex-grow-1"><strong>Nutzer-Kapazität</strong> — Gleichzeitige Streams</div>
                        <span className="badge bg-success bg-opacity-25 text-success font-monospace px-2 py-1 border border-success">2 Millionen</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card h-100 bg-dark border-secondary rounded-4 shadow">
                  <div className="card-body p-4">
                    <h5 className="card-title text-danger fw-bold mb-4 d-flex align-items-center">
                      <i className="bi bi-exclamation-triangle-fill fs-4 me-3"></i> LIMITIERUNGEN
                    </h5>
                    <ul className="list-group list-group-flush bg-transparent">
                      <li className="list-group-item bg-transparent text-light border-secondary px-0 py-3 d-flex gap-3">
                        <i className="bi bi-x-circle text-danger mt-1"></i>
                        <div><strong>Geografische Rechte:</strong> Sendungen können in bestimmten Zonen aufgrund von DRM- und Ausstrahlungsrechten blockiert werden (Geoblocking).</div>
                      </li>
                      <li className="list-group-item bg-transparent text-light border-0 px-0 pt-3 d-flex gap-3">
                        <i className="bi bi-trash text-danger mt-1"></i>
                        <div><strong>Speicher-Limit:</strong> Wenn der Cloud-Speicher voll ist, werden ältere Aufnahmen automatisch gelöscht, sofern sie nicht vom Nutzer "gesperrt" wurden.</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card h-100 bg-dark border-secondary rounded-4 shadow">
                  <div className="card-body p-4">
                    <h5 className="card-title text-warning fw-bold mb-4 d-flex align-items-center">
                      <i className="bi bi-rocket-takeoff-fill fs-4 me-3"></i> INNOVATIONEN
                    </h5>
                    <ul className="list-group list-group-flush bg-transparent">
                      <li className="list-group-item bg-transparent text-light border-secondary px-0 py-3 d-flex gap-3">
                        <i className="bi bi-record-btn text-warning mt-1"></i>
                        <div><strong>Auto-Recording:</strong> Das System analysiert Sehgewohnheiten und nimmt automatisch interessante TV-Serien auf, bevor sie aus dem Live-TV verschwinden.</div>
                      </li>
                      <li className="list-group-item bg-transparent text-light border-0 px-0 pt-3 d-flex gap-3">
                        <i className="bi bi-globe text-warning mt-1"></i>
                        <div><strong>Nahtloser Übergang:</strong> Wechselt der Nutzer die Geozone, passt das System die TV-Quellen dynamisch an, behält aber den Zugriff auf alte Aufnahmen.</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PresentationPage;