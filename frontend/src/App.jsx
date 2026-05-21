import React, { useMemo, useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = "https://cybersecurity-phishing-scanner.onrender.com/score";

  const scanEmail = async () => {
    if (!email.trim()) {
      setResult({
        prediction: "Empty Input",
        score: 0,
        message: "Please paste an email before scanning.",
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: email,
        }),
      });

      if (!response.ok) {
        throw new Error("Backend request failed");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      setResult({
        prediction: "Connection Error",
        score: 0,
        message: "Backend connection failed. Please check FastAPI server.",
      });
    } finally {
      setLoading(false);
    }
  };

  const riskScore = Number(result?.score ?? 0);
  const riskPercent = Math.round(riskScore * 100);

  const isPhishing = useMemo(() => {
    const prediction = String(result?.prediction || "").toLowerCase();
    return (
      prediction.includes("phishing") ||
      prediction.includes("malicious") ||
      prediction === "1" ||
      riskScore >= 0.5
    );
  }, [result, riskScore]);

  const riskLabel = !result
    ? "Waiting"
    : result.prediction === "Connection Error"
    ? "Offline"
    : result.prediction === "Empty Input"
    ? "Input Required"
    : isPhishing
    ? "High Risk"
    : "Low Risk";

  const riskColor = !result
    ? "#60a5fa"
    : result.prediction === "Connection Error"
    ? "#f97316"
    : result.prediction === "Empty Input"
    ? "#facc15"
    : isPhishing
    ? "#ef4444"
    : "#22c55e";

  return (
    <div style={styles.page}>
      <div style={styles.glowOne}></div>
      <div style={styles.glowTwo}></div>

      <nav style={styles.navbar}>
        <div>
          <h2 style={styles.logo}>Cyber Phishing Scanner</h2>
          <p style={styles.logoSub}>Email Threat Detection System</p>
        </div>

        <div style={styles.liveBadge}>
          <span style={styles.liveDot}></span>
          Local Security Engine
        </div>
      </nav>

      <section style={styles.hero}>
        <div>
          <p style={styles.eyebrow}>AI-powered phishing analysis</p>
          <h1 style={styles.heroTitle}>
            Scan Suspicious Emails Before They Become Attacks.
          </h1>
          <p style={styles.heroText}>
            Paste any email message and analyze risky keywords, urgency signals,
            suspicious URLs, and phishing intent using your FastAPI detection
            engine.
          </p>

          <div style={styles.statsRow}>
            <div style={styles.miniStat}>
              <strong>FastAPI</strong>
              <span>Backend</span>
            </div>
            <div style={styles.miniStat}>
              <strong>React</strong>
              <span>Frontend</span>
            </div>
            <div style={styles.miniStat}>
              <strong>/score</strong>
              <span>API Endpoint</span>
            </div>
          </div>
        </div>

        <div style={styles.engineCard}>
          <p style={styles.engineLabel}>Threat Engine</p>
          <h2 style={styles.engineStatus}>Active</h2>
          <p style={styles.engineText}>
            Ready to inspect email content and calculate phishing risk score.
          </p>
        </div>
      </section>

      <main style={styles.mainGrid}>
        <section style={styles.card}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.cardTitle}>Email Scanner</h2>
              <p style={styles.cardSub}>
                Paste the full email body/message below.
              </p>
            </div>
            <span style={styles.chip}>Live Scan</span>
          </div>

          <textarea
            style={styles.textarea}
            placeholder={`Example:
URGENT: Your bank account has been suspended.
Click here to verify immediately:
http://fake-bank-login.xyz`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            style={{
              ...styles.button,
              opacity: loading ? 0.75 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            onClick={scanEmail}
            disabled={loading}
          >
            {loading ? "Scanning Threat..." : "Scan Email"}
          </button>
        </section>

        <section style={styles.card}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.cardTitle}>Detection Result</h2>
              <p style={styles.cardSub}>Risk analysis output</p>
            </div>
            <span
              style={{
                ...styles.statusPill,
                color: riskColor,
                borderColor: riskColor,
                background: `${riskColor}1A`,
              }}
            >
              {riskLabel}
            </span>
          </div>

          {!result ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>🛡️</div>
              <h3>No scan yet</h3>
              <p>Submit an email to analyze phishing risk.</p>
            </div>
          ) : (
            <div style={styles.resultArea}>
              <div style={styles.meterWrap}>
                <div
                  style={{
                    ...styles.meterCircle,
                    borderColor: riskColor,
                    boxShadow: `0 0 35px ${riskColor}55`,
                  }}
                >
                  <span style={{ ...styles.meterNumber, color: riskColor }}>
                    {riskPercent}%
                  </span>
                  <small>Risk</small>
                </div>
              </div>

              <div style={styles.resultDetails}>
                <h1 style={{ ...styles.resultTitle, color: riskColor }}>
                  {result.prediction === "Connection Error"
                    ? "Backend Offline"
                    : result.prediction === "Empty Input"
                    ? "Email Required"
                    : isPhishing
                    ? "Phishing Detected"
                    : "Email Looks Safe"}
                </h1>

                <p style={styles.resultText}>
                  Prediction:{" "}
                  <strong>{String(result.prediction || "Unknown")}</strong>
                </p>

                <p style={styles.resultText}>
                  Risk Score: <strong>{riskScore.toFixed(4)}</strong>
                </p>

                {result.message && (
                  <p style={styles.warningText}>{result.message}</p>
                )}
              </div>
            </div>
          )}
        </section>
      </main>

      <section style={styles.infoGrid}>
        <div style={styles.infoCard}>
          <h3>Keyword Signals</h3>
          <p>Detects urgency terms like verify, account, password, OTP.</p>
        </div>
        <div style={styles.infoCard}>
          <h3>URL Risk</h3>
          <p>Highlights suspicious links and fake login patterns.</p>
        </div>
        <div style={styles.infoCard}>
          <h3>Recruiter Ready</h3>
          <p>React + FastAPI project suitable for portfolio demos.</p>
        </div>
      </section>

      <footer
  style={{
    textAlign: "center",
    padding: "12px",
    fontSize: "13px",
    color: "#888",
    marginTop: "20px",
  }}
>
  Built by <strong>Himanshu Sahu</strong> · B.Tech Cyber Security, Pune ·
  <a
    href="https://github.com/himanshu-04022006"
    target="_blank"
    rel="noreferrer"
  >
    {" "}
    GitHub
  </a>{" "}
  ·
  <a
    href="https://www.linkedin.com/in/himanshu-sahu-a134a0283"
    target="_blank"
    rel="noreferrer"
  >
    {" "}
    LinkedIn
  </a>
</footer>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top left, #0f766e33, transparent 35%), radial-gradient(circle at top right, #2563eb33, transparent 35%), #020617",
    color: "#f8fafc",
    fontFamily: "Inter, Arial, sans-serif",
    padding: "24px",
    position: "relative",
    overflow: "hidden",
  },
  glowOne: {
    position: "fixed",
    width: "360px",
    height: "360px",
    background: "#2563eb",
    filter: "blur(160px)",
    opacity: 0.18,
    top: "8%",
    right: "8%",
    zIndex: 0,
  },
  glowTwo: {
    position: "fixed",
    width: "320px",
    height: "320px",
    background: "#22c55e",
    filter: "blur(150px)",
    opacity: 0.12,
    bottom: "10%",
    left: "8%",
    zIndex: 0,
  },
  navbar: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "42px",
  },
  logo: {
    margin: 0,
    fontSize: "28px",
    fontWeight: 900,
    color: "#38bdf8",
  },
  logoSub: {
    margin: "4px 0 0",
    color: "#94a3b8",
  },
  liveBadge: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: "1px solid #22c55e",
    color: "#4ade80",
    borderRadius: "999px",
    padding: "10px 16px",
    background: "rgba(34,197,94,0.08)",
    fontWeight: 700,
  },
  liveDot: {
    width: "8px",
    height: "8px",
    background: "#22c55e",
    borderRadius: "50%",
    boxShadow: "0 0 15px #22c55e",
  },
  hero: {
    position: "relative",
    zIndex: 1,
    display: "grid",
    gridTemplateColumns: "1.4fr 0.8fr",
    gap: "26px",
    alignItems: "stretch",
    marginBottom: "26px",
  },
  eyebrow: {
    color: "#38bdf8",
    textTransform: "uppercase",
    letterSpacing: "2px",
    fontWeight: 800,
    marginBottom: "10px",
  },
  heroTitle: {
    fontSize: "clamp(36px, 5vw, 72px)",
    lineHeight: 1.02,
    margin: 0,
    maxWidth: "950px",
  },
  heroText: {
    color: "#cbd5e1",
    fontSize: "18px",
    lineHeight: 1.7,
    maxWidth: "780px",
    marginTop: "22px",
  },
  statsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "14px",
    marginTop: "28px",
  },
  miniStat: {
    border: "1px solid rgba(148,163,184,0.25)",
    background: "rgba(15,23,42,0.72)",
    borderRadius: "16px",
    padding: "14px 18px",
    minWidth: "120px",
  },
  engineCard: {
    border: "1px solid rgba(56,189,248,0.35)",
    background: "rgba(15,23,42,0.78)",
    borderRadius: "26px",
    padding: "30px",
    boxShadow: "0 25px 70px rgba(0,0,0,0.35)",
  },
  engineLabel: {
    color: "#93c5fd",
    fontWeight: 800,
  },
  engineStatus: {
    fontSize: "46px",
    margin: "8px 0",
    color: "#22c55e",
  },
  engineText: {
    color: "#cbd5e1",
    lineHeight: 1.6,
  },
  mainGrid: {
    position: "relative",
    zIndex: 1,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "26px",
  },
  card: {
    background: "rgba(15,23,42,0.84)",
    border: "1px solid rgba(148,163,184,0.24)",
    borderRadius: "26px",
    padding: "28px",
    boxShadow: "0 25px 70px rgba(0,0,0,0.32)",
    backdropFilter: "blur(16px)",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "14px",
    alignItems: "center",
    marginBottom: "18px",
  },
  cardTitle: {
    margin: 0,
    fontSize: "28px",
  },
  cardSub: {
    color: "#94a3b8",
    margin: "6px 0 0",
  },
  chip: {
    color: "#38bdf8",
    border: "1px solid rgba(56,189,248,0.45)",
    background: "rgba(56,189,248,0.1)",
    padding: "8px 14px",
    borderRadius: "999px",
    fontWeight: 800,
  },
  textarea: {
    width: "100%",
    minHeight: "280px",
    padding: "18px",
    borderRadius: "18px",
    border: "1px solid rgba(148,163,184,0.32)",
    background: "#020617",
    color: "#e5e7eb",
    fontSize: "16px",
    lineHeight: 1.6,
    resize: "vertical",
    outline: "none",
    boxSizing: "border-box",
  },
  button: {
    marginTop: "18px",
    width: "100%",
    padding: "18px",
    border: "none",
    borderRadius: "18px",
    background: "linear-gradient(90deg, #2563eb, #7c3aed)",
    color: "#ffffff",
    fontSize: "18px",
    fontWeight: 900,
    boxShadow: "0 14px 35px rgba(37,99,235,0.35)",
  },
  statusPill: {
    border: "1px solid",
    padding: "8px 14px",
    borderRadius: "999px",
    fontWeight: 900,
  },
  emptyState: {
    minHeight: "300px",
    border: "1px dashed rgba(148,163,184,0.32)",
    borderRadius: "22px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#94a3b8",
  },
  emptyIcon: {
    fontSize: "52px",
    marginBottom: "12px",
  },
  resultArea: {
    minHeight: "300px",
    border: "1px solid rgba(148,163,184,0.22)",
    borderRadius: "22px",
    background: "#020617",
    padding: "28px",
    display: "grid",
    gridTemplateColumns: "220px 1fr",
    gap: "24px",
    alignItems: "center",
  },
  meterWrap: {
    display: "flex",
    justifyContent: "center",
  },
  meterCircle: {
    width: "170px",
    height: "170px",
    borderRadius: "50%",
    border: "10px solid",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(15,23,42,0.9)",
  },
  meterNumber: {
    fontSize: "42px",
    fontWeight: 900,
  },
  resultTitle: {
    fontSize: "34px",
    margin: "0 0 16px",
  },
  resultText: {
    color: "#cbd5e1",
    fontSize: "18px",
  },
  warningText: {
    color: "#fbbf24",
    marginTop: "18px",
  },
  infoGrid: {
    position: "relative",
    zIndex: 1,
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "18px",
    marginTop: "26px",
  },
  infoCard: {
    background: "rgba(15,23,42,0.74)",
    border: "1px solid rgba(148,163,184,0.2)",
    borderRadius: "20px",
    padding: "22px",
  },
  footer: {
    position: "relative",
    zIndex: 1,
    textAlign: "center",
    color: "#64748b",
    marginTop: "32px",
    paddingBottom: "10px",
  },
};

export default App;