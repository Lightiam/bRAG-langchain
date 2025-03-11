import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import ChatInterface from './components/ChatInterface';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <ChatInterface />
      </main>
      <Footer />
    </div>
  );
}

export default App;
