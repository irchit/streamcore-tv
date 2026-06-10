import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "Max Mustermann",
    paymentday: "2026-07-15",
    cloudUsed: 15,
    cloudTotal: 50,
    geoZone: "DE-Süd"
  });

  const [subscriptions, setSubscriptions] = useState([
    { 
      id: "dach-tv", 
      name: "DACH Regional & Live TV", 
      active: true, 
      price: "9.99", 
      desc: "Inkludiert regionale Sender (DE, AT, CH) und Cloud-Recording-Basis." 
    },
    { 
      id: "us-entertainment", 
      name: "US Entertainment & Sport", 
      active: false, 
      price: "14.99", 
      desc: "Premium US-Kanäle, Hollywood-Filme und exklusive Sport-Übertragungen." 
    },
    { 
      id: "cloud-ultra", 
      name: "Cloud Recording Pro (+100GB)", 
      active: false, 
      price: "4.99", 
      desc: "Erweitert deinen Cloud-Speicher für automatische TV-Aufnahmen." 
    }
  ]);

  const [content, setContent] = useState([
    { id: 1, title: "Tatort: München", category: "Krimi", sourceId: "dach-tv", geoZone: "DE-Süd", imageClass: "g1", progress: 65, isRecording: false },
    { id: 2, title: "Alpenpanorama Doku", category: "Dokumentation", sourceId: "dach-tv", geoZone: "DE-Süd", imageClass: "g3", progress: 20, isRecording: false },
    { id: 3, title: "NFL Game Day Live", category: "Sport", sourceId: "us-entertainment", geoZone: "US-East", imageClass: "g2", progress: 0, isRecording: false },
    { id: 4, title: "Miami Vice Remake", category: "Action", sourceId: "us-entertainment", geoZone: "US-East", imageClass: "g4", progress: 0, isRecording: false },
    { id: 5, title: "Tagesschau 20:00 (Aufnahme)", category: "News / Cloud", sourceId: "dach-tv", geoZone: "DE-Süd", imageClass: "g5", progress: 100, isRecording: true },
    { id: 6, title: "Der Chiemsee von oben", category: "Dokumentation", sourceId: "dach-tv", geoZone: "DE-Süd", imageClass: "g8", progress: 0, isRecording: true }
  ]);

  const extendPaymentDate = () => {
    setUser(prevUser => {
      const currentDate = new Date(prevUser.paymentday);
      currentDate.setMonth(currentDate.getMonth() + 1);
      const newDate = currentDate.toISOString().split('T')[0];
      return { ...prevUser, paymentday: newDate };
    });
  };

  const activateSubscription = (subId) => {
    setSubscriptions(prevSubs => 
      prevSubs.map(sub => sub.id === subId ? { ...sub, active: true } : sub)
    );
    if (subId === "cloud-ultra") {
      setUser(prevUser => ({ ...prevUser, cloudTotal: 150 }));
    }
  };

  const deactivateSubscription = (subId) => {
    setSubscriptions(prevSubs => 
      prevSubs.map(sub => sub.id === subId ? { ...sub, active: false } : sub)
    );
    if (subId === "cloud-ultra") {
      setUser(prevUser => ({ ...prevUser, cloudTotal: 50 }));
    }
  };

  const changeGeoZone = (zone) => {
    setUser(prevUser => ({ ...prevUser, geoZone: zone }));
  };

  return (
    <AppContext.Provider value={{ 
      user, 
      subscriptions, 
      content, 
      extendPaymentDate, 
      activateSubscription,
      deactivateSubscription,
      changeGeoZone
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);