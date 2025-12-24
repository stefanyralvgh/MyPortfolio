import React, { useState } from "react";
import InteractiveTerminal from "../components/InteractiveTerminal";
import { useLanguage } from "../contexts/LanguageContext";
import BugReportModal from "../components/BugReportModal";

const Home: React.FC = () => {
  const [showReportForm, setShowReportForm] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      <div className="home-container">
        <InteractiveTerminal />
      </div>

      <footer
        className="site-footer"
        style={{
          textAlign: "center",
          color: "#f3b1e6",
          fontSize: "0.95rem",
          marginTop: "2rem",
          opacity: 0.7,
        }}
      >
        © 2025 Stefany Ramos Alvis | Backend Developer. All rights reserved.
      </footer>

      {/* Botón flotante */}
      <button
        onClick={() => setShowReportForm(true)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "rgba(231, 84, 128, 0.9)",
          color: "#fff",
          border: "none",
          borderRadius: "50px",
          padding: "12px 20px",
          fontSize: "0.9rem",
          fontFamily: "Courier New, Monaco, Menlo, monospace",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          zIndex: 1000,
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(231, 84, 128, 1)";
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "rgba(231, 84, 128, 0.9)";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        🐛 {t("bug.button")}
      </button>

      {showReportForm && (
        <BugReportModal onClose={() => setShowReportForm(false)} />
      )}
    </>
  );
};

export default Home;
