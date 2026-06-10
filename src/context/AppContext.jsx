import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "Max Mustermann",
    paymentday: "2026-07-15",
    cloudUsed: 24,
    cloudTotal: 100,
    geoZone: "EU-East"
  });

  const [subscriptions, setSubscriptions] = useState([
    { 
      id: "digi-ro", 
      name: "Digi Romania (Alle Kanäle)", 
      active: true, 
      price: "2.49", 
      desc: "Kompletter Zugriff pe toate canalele Digi: Sport, News, Dokumentationen und Film-Pakete." 
    },
    { 
      id: "telekom-de", 
      name: "Telekom Deutschland TV", 
      active: false, 
      price: "5.99", 
      desc: "30 deutsche Premium-TV-Kanäle live inklusive vollständiger Auto-Recording-Unterstützung." 
    },
    { 
      id: "amazon-prime", 
      name: "Amazon Prime Video", 
      active: false, 
      price: "3.99", 
      desc: "Die neuesten 15 Blockbuster-Filme und 15 exklusiven TV-Shows direkt in der Plattform." 
    },
    { 
      id: "netflix", 
      name: "Netflix Premium Lite", 
      active: false, 
      price: "6.49", 
      desc: "Eine kuratierte Auswahl von 30 weltweiten Top-Titeln und exklusiven Netflix Originals." 
    },
    { 
      id: "disney-plus", 
      name: "Disney+ Sci-Fi & Hero", 
      active: false, 
      price: "4.99", 
      desc: "Das gesamte Star Wars Universum und alle Marvel MCU Highlights bis einschließlich Phase 4." 
    }
  ]);

  const [content, setContent] = useState([
    { id: 1, title: "Digi24 HD", category: "News", sourceId: "digi-ro", emoji: "📰", progress: 90, isRecording: false },
    { id: 2, title: "Digi Sport 1", category: "Sport", sourceId: "digi-ro", emoji: "⚽", progress: 45, isRecording: false },
    { id: 3, title: "Digi World", category: "Dokumentation", sourceId: "digi-ro", emoji: "🌍", progress: 10, isRecording: false },
    { id: 4, title: "Digi Life (Aufnahme)", category: "Lifestyle / Cloud", sourceId: "digi-ro", emoji: "🧘", progress: 100, isRecording: true },
    
    { id: 5, title: "Das Erste (ARD)", category: "Allgemein", sourceId: "telekom-de", emoji: "🇩🇪", progress: 30, isRecording: false },
    { id: 6, title: "ZDF HD", category: "Allgemein", sourceId: "telekom-de", emoji: "📺", progress: 75, isRecording: false },
    { id: 7, title: "RTL Regional", category: "Unterhaltung", sourceId: "telekom-de", emoji: "🏙️", progress: 0, isRecording: false },
    { id: 8, title: "ProSieben (Aufnahme)", category: "Sci-Fi / Cloud", sourceId: "telekom-de", emoji: "👽", progress: 100, isRecording: true },

    { id: 9, title: "The Boys - Staffel 4", category: "TV Show", sourceId: "amazon-prime", emoji: "🦸‍♂️", progress: 15, isRecording: false },
    { id: 10, title: "Die Ringe der Macht", category: "TV Show", sourceId: "amazon-prime", emoji: "🧝‍♂️", progress: 0, isRecording: false },
    { id: 11, title: "Reacher", category: "TV Show", sourceId: "amazon-prime", emoji: "🕵️‍♂️", progress: 0, isRecording: false },
    { id: 12, title: "Interstellar", category: "Film", sourceId: "amazon-prime", emoji: "🚀", progress: 60, isRecording: false },
    { id: 13, title: "Road House (2024)", category: "Film", sourceId: "amazon-prime", emoji: "🥊", progress: 0, isRecording: false },

    { id: 14, title: "Stranger Things", category: "TV Show", sourceId: "netflix", emoji: "🚲", progress: 80, isRecording: false },
    { id: 15, title: "Wednesday", category: "TV Show", sourceId: "netflix", emoji: "🕷️", progress: 0, isRecording: false },
    { id: 16, title: "Black Mirror", category: "TV Show", sourceId: "netflix", emoji: "📱", progress: 0, isRecording: false },
    { id: 17, title: "Red Notice", category: "Film", sourceId: "netflix", emoji: "🖼️", progress: 45, isRecording: false },
    { id: 18, title: "Glass Onion: Knives Out", category: "Film", sourceId: "netflix", emoji: "🧅", progress: 0, isRecording: false },

    { id: 19, title: "The Mandalorian", category: "Star Wars", sourceId: "disney-plus", emoji: "🛡️", progress: 50, isRecording: false },
    { id: 20, title: "Ahsoka", category: "Star Wars", sourceId: "disney-plus", emoji: "⚔️", progress: 0, isRecording: false },
    { id: 21, title: "Iron Man (Phase 1)", category: "Marvel MCU", sourceId: "disney-plus", emoji: "🤖", progress: 0, isRecording: false },
    { id: 22, title: "WandaVision (Phase 4)", category: "Marvel MCU", sourceId: "disney-plus", emoji: "🔮", progress: 25, isRecording: false },
    { id: 23, title: "Loki (Phase 4)", category: "Marvel MCU", sourceId: "disney-plus", emoji: "⏳", progress: 0, isRecording: false }
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
  };

  const deactivateSubscription = (subId) => {
    setSubscriptions(prevSubs => 
      prevSubs.map(sub => sub.id === subId ? { ...sub, active: false } : sub)
    );
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