import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PresentationPage from './pages/PresentationPage';
import HomePage from './pages/HomePage';
import UserProfilePage from './pages/UserProfilePage';
import PaymentPage from './pages/PaymentPage';

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