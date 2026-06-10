import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Componente temporare pentru rutele noastre
const PresentationPage = () => <div style={{ padding: '80px', textAlign: 'center' }}><h1>Präsentation</h1></div>;
const HomePage = () => <div style={{ padding: '80px', textAlign: 'center' }}><h1>Startseite (Filme & TV)</h1></div>;
const UserProfilePage = () => <div style={{ padding: '80px', textAlign: 'center' }}><h1>Benutzerprofil</h1></div>;
const PaymentPage = () => <div style={{ padding: '80px', textAlign: 'center' }}><h1>Zahlung</h1></div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PresentationPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/userprofile" element={<UserProfilePage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;