import React, { useState, useEffect } from "react";

const defaultScenarios = [
  "Kreiranje dinarskog računa maloprodaje",
  "Kreiranje dinarskog avansnog računa maloprodaje",
  "Kreiranje dinarskog predračuna",
  "Kreiranje deviznog računa maloprodaje",
  "Kreiranje deviznog predračuna maloprodaje",
  "Kreiranje dinarskog predračuna veleprodaje",
  "Kreiranje deviznog predračuna veleprodaje",
  "Kreiranje dinarskog avansa veleprodaje",
  "Kreiranje deviznog računa veleprodaje",
  "Kreiranje dinarskog konačnog računa veleprodaje",
  "Kreiranje običnog dinarskog računa",
  "Kreiranje partnera (domaćeg, stranog, pravnog, fizičkog lica)",
  "Kreiranje računa SNPDV - sa oslobođenjem",
  "Provera načina plaćanja (kartično, virmanski, paypal)",
  "Provera fiskalizacije na SUF-u",
  "Provera efaktura na SEF-u",
  "Provera knjiženja (upis u popdv, izveštaji za SNPDV...)"
];

function App() {
  const [scenarios, setScenarios] = useState(() => {
    const saved = localStorage.getItem("testScenarios");
    return saved ? JSON.parse(saved) : defaultScenarios.map(name => ({ name, steps: [], status: "Not Started" }));
  });

  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("testScenarios", JSON.stringify(scenarios));
  }, [scenarios]);

  const addStep = (index) => {
    const newScenarios = [...scenarios];
    newScenarios[index].steps.push({ label: "", checked: false });
    setScenarios(newScenarios);
  };

  const updateStep = (scenarioIndex, stepIndex, field, value) => {
    const newScenarios = [...scenarios];
    newScenarios[scenarioIndex].steps[stepIndex][field] = value;
    setScenarios(newScenarios);
  };

  const updateStatus = (index, value) => {
    const newScenarios = [...scenarios];
    newScenarios[index].status = value;
    setScenarios(newScenarios);
  };

  const filteredScenarios = scenarios.filter(s => filter === "All" || s.status === filter);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <label>Status filter: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Passed">Passed</option>
          <option value="Failed">Failed</option>
        </select>
      </div>
      {filteredScenarios.map((scenario, i) => (
        <div key={i} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2>{scenario.name}</h2>
            <select value={scenario.status} onChange={(e) => updateStatus(i, e.target.value)}>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Passed">Passed</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
          {scenario.steps.map((step, j) => (
            <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
              <input
                type="checkbox"
                checked={step.checked}
                onChange={(e) => updateStep(i, j, "checked", e.target.checked)}
              />
              <input
                type="text"
                value={step.label}
                onChange={(e) => updateStep(i, j, "label", e.target.value)}
                placeholder="Opis stavke (npr. datum prometa, iznos...)"
                style={{ flex: 1 }}
              />
            </div>
          ))}
          <button onClick={() => addStep(i)} style={{ marginTop: '12px' }}>Dodaj stavku</button>
        </div>
      ))}
    </div>
  );
}

export default App;
