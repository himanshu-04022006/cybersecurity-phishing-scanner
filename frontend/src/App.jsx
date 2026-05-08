import React, { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");

  const scanEmail = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: email,
        }),
      });

      const data = await response.json();

      setResult(`Prediction: ${data.prediction} | Risk Score: ${data.score}`);
    } catch (error) {
      console.error(error);
      setResult("Error connecting to backend");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>🛡️ Phishing Detection Dashboard</h1>
        <p style={styles.subtitle}>
          Paste any suspicious email below and check its phishing risk instantly.
        </p>

        <textarea
          style={styles.textarea}
          rows="10"
          placeholder="Paste suspicious email here..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button style={styles.button} onClick={scanEmail}>
          Scan Email
        </button>

        {result && (
          <div
            style={{
              ...styles.resultBox,
              backgroundColor: result.includes("Phishing")
                ? "#fee2e2"
                : "#dcfce7",
              color: result.includes("Phishing") ? "#991b1b" : "#166534",
            }}
          >
            {result}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "850px",
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "35px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
  },
  title: {
    fontSize: "36px",
    marginBottom: "10px",
    color: "#0f172a",
  },
  subtitle: {
    fontSize: "16px",
    color: "#64748b",
    marginBottom: "25px",
  },
  textarea: {
    width: "100%",
    padding: "16px",
    fontSize: "16px",
    borderRadius: "12px",
    border: "2px solid #cbd5e1",
    outline: "none",
    resize: "vertical",
    minHeight: "220px",
    boxSizing: "border-box",
  },
  button: {
    marginTop: "20px",
    width: "100%",
    padding: "15px",
    fontSize: "18px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "12px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    cursor: "pointer",
  },
  resultBox: {
    marginTop: "25px",
    padding: "18px",
    borderRadius: "12px",
    fontSize: "22px",
    fontWeight: "bold",
    textAlign: "center",
  },
};

export default App;