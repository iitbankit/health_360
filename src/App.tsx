import { useState } from "react";
import FullBody from "./components/FullBody";

/* ---------------- UTILS ---------------- */
const toColor = (v: number) => (v >= 70 ? "green" : v >= 50 ? "orange" : "red");

/* ---------------- DISCLAIMER ---------------- */
function Disclaimer({ agreed, setAgreed }: any) {
  return (
    <div
      style={{
        border: "1px solid #f5c2c2",
        background: "#fff5f5",
        padding: 12,
        marginBottom: 20,
      }}
    >
      <strong>Medical Disclaimer</strong>
      <ul>
        <li>This app is for educational and wellness guidance only.</li>
        <li>It does not provide medical diagnosis or treatment.</li>
        <li>Predictions are estimates, not guarantees.</li>
        <li>Always consult a qualified doctor.</li>
      </ul>
      <label>
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />{" "}
        I agree
      </label>
    </div>
  );
}

/* ---------------- MAIN APP ---------------- */
export default function App() {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [analysis, setAnalysis] = useState<string[]>([]);
  const [goal, setGoal] = useState("");
  const [future, setFuture] = useState<any>(null);
  const [summary, setSummary] = useState<string[]>([]);

  const sampleCurrent = { heart: 52, lungs: 70, liver: 45, kidneys: 65 };

  /* ---------------- MOCK AI CALLS ---------------- */
  const analyzeReport = async () => {
    if (!agreed) {
      alert("Please agree to disclaimer");
      return;
    }
    // Demo fallback
    setAnalysis([
      "Heart risk slightly high due to cholesterol",
      "Liver enzymes elevated",
      "Kidney function below optimal",
      "Lung capacity normal",
    ]);
    setStep(2);
  };

  const askImprovement = async () => {
    // Demo fallback
    setFuture({ heart: 72, lungs: 78, liver: 65, kidneys: 75 });
    setSummary([
      "Heart health improved with exercise",
      "Liver enzymes reduced with diet",
      "Kidney function improved with hydration",
      "Lung capacity increased via cardio",
    ]);
    setStep(4);
  };

  return (
    <div style={{ fontFamily: "Arial", padding: 20 }}>
      <h1>MyBody360</h1>

      {/* STEP 1: Upload */}
      {step === 1 && (
        <>
          <h2>Step 1: Upload Health Report</h2>
          <input
            type="file"
            accept=".pdf,.jpg,.png"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          {file && <p>Uploaded: {file.name}</p>}
          <br />
          <br />
          {!agreed && <Disclaimer agreed={agreed} setAgreed={setAgreed} />}
          <button disabled={!file || !agreed} onClick={analyzeReport}>
            Analyze Report
          </button>
        </>
      )}

      {/* STEP 2: Show Body + Issues */}
      {step === 2 && (
        <>
          <h2>Step 2: Current Health Overview</h2>
          <FullBody
            organs={{
              heart: toColor(sampleCurrent.heart),
              lungs: toColor(sampleCurrent.lungs),
              liver: toColor(sampleCurrent.liver),
              kidneys: toColor(sampleCurrent.kidneys),
            }}
          />
          <h3>AI Findings</h3>
          <ul>
            {analysis.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
          <button disabled={!agreed} onClick={() => setStep(3)}>
            Next: Set Goals
          </button>
        </>
      )}

      {/* STEP 3: User Goal */}
      {step === 3 && (
        <>
          <h2>Step 3: What do you want to improve?</h2>
          <textarea
            rows={5}
            style={{ width: "100%" }}
            placeholder="Example: Improve heart, reduce fat, increase stamina"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
          <br />
          <br />
          <button disabled={!goal} onClick={askImprovement}>
            Predict Improvements
          </button>
        </>
      )}

      {/* STEP 4: Show Improvements */}
      {step === 4 && future && (
        <>
          <h2>Step 4: Possible Improvement (3 Months)</h2>
          <div style={{ display: "flex", gap: 40 }}>
            <div>
              <h3>Current</h3>
              <FullBody
                organs={{
                  heart: toColor(sampleCurrent.heart),
                  lungs: toColor(sampleCurrent.lungs),
                  liver: toColor(sampleCurrent.liver),
                  kidneys: toColor(sampleCurrent.kidneys),
                }}
              />
            </div>
            <div>
              <h3>After 3 Months</h3>
              <FullBody
                organs={{
                  heart: toColor(future.heart),
                  lungs: toColor(future.lungs),
                  liver: toColor(future.liver),
                  kidneys: toColor(future.kidneys),
                }}
              />
            </div>
          </div>
          <h3>Values Before → Achievable</h3>
          <ul>
            <li>
              Heart: {sampleCurrent.heart} → {future.heart}
            </li>
            <li>
              Lungs: {sampleCurrent.lungs} → {future.lungs}
            </li>
            <li>
              Liver: {sampleCurrent.liver} → {future.liver}
            </li>
            <li>
              Kidneys: {sampleCurrent.kidneys} → {future.kidneys}
            </li>
          </ul>
          <h3>AI Summary</h3>
          <ul>
            {summary.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
