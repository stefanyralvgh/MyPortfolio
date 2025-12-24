import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const BugReportModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { t } = useLanguage();
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/bug_reports`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                bug_report: {
                  description,
                  email,
                  url: window.location.href,
                  user_agent: navigator.userAgent,
                  timestamp: new Date().toISOString(),
                },
              }),
            }
          );
          

      if (response.ok) {
        alert(t("bug.success"));
        onClose();
      } else {
        alert(t("bug.error"));
      }
    } catch {
      alert(t("bug.error"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#181824",
          borderRadius: "1rem",
          padding: "2rem",
          maxWidth: "500px",
          width: "90%",
          border: "1px solid rgba(243,177,230,0.3)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          style={{
            color: "#f3b1e6",
            marginTop: 0,
            fontFamily: "Courier New, Monaco, Menlo, monospace",
          }}
        >
          🐛 {t("bug.title")}
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ color: "#f3b1e6" }}>
              {t("bug.description")}
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              placeholder={t("bug.description.placeholder")}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "#f3b1e6",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ color: "#f3b1e6" }}>
              {t("bug.email")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("bug.email.placeholder")}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "#f3b1e6",
              }}
            />
          </div>

          <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "0.75rem",
                }}
                >
                {/* Cancel */}
                <button
                    type="button"
                    onClick={onClose}
                    style={{
                    padding: "0.6rem 1.2rem",
                    borderRadius: "0.6rem",
                    backgroundColor: "transparent",
                    color: "#f3b1e6",
                    border: "1px solid rgba(243,177,230,0.4)",
                    cursor: "pointer",
                    fontWeight: 500,
                    }}
                    onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                        "rgba(243,177,230,0.1)")
                    }
                    onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                    }
                >
                    {t("bug.cancel")}
                </button>

                {/* Send */}
                <button
                    type="submit"
                    disabled={submitting}
                    style={{
                    padding: "0.6rem 1.4rem",
                    borderRadius: "0.6rem",
                    backgroundColor: submitting ? "#555" : "#f3b1e6",
                    color: "#181824",
                    border: "none",
                    cursor: submitting ? "not-allowed" : "pointer",
                    fontWeight: 600,
                    opacity: submitting ? 0.7 : 1,
                    }}
                >
                    {submitting ? t("bug.sending") : t("bug.submit")}
                </button>
                </div>

        </form>
      </div>
    </div>
  );
};

export default BugReportModal;
