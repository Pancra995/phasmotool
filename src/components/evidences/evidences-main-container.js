import React, { useState } from "react";
import EvidenceMatrix from "../../assets/evidence-matrix.json";
import EvidenceList from "../../assets/evidence-list.json";
import EvidenceElement from "./evidence-element";

const EvidencesMainContainer = () => {
  const [selectedEvidences, setSelectedEvidences] = useState([]);
  const [posibleEvidences, setPosibleEvidences] = useState(EvidenceList);

  const handleSelectedEvidences = (newEvidence) => {
    const evidences = [...selectedEvidences];
    const oldEvidence = evidences.indexOf(newEvidence);
    if (oldEvidence < 0) evidences.push(newEvidence);
    else evidences.splice(oldEvidence, 1);
    setSelectedEvidences(evidences);

    let evidenceArray = EvidenceList;

    if (evidences.length === 2) {
      const filteredEvidenceMatrix = EvidenceMatrix.filter(
        (row) => row[1].includes(evidences[0]) && row[1].includes(evidences[1])
      );

      let tempArray = [];
      filteredEvidenceMatrix.forEach(
        (filtered) => (tempArray = tempArray.concat(filtered[1]))
      );
      evidenceArray = [...new Set(tempArray)];
    }

    evidenceArray = evidenceArray.filter(
      (evidence) => evidences.indexOf(evidence) === -1
    );
    setPosibleEvidences(evidenceArray);
  };

  return (
    <div className="app-container">
      <div className="evidence-main-container">
        <div className="section">
          <div className="evidence-element-title">Selected evidences</div>
          <EvidenceElement
            evidenceArray={selectedEvidences}
            handleSelectedEvidences={handleSelectedEvidences}
          />
        </div>
        <div className="section">
          <div className="evidence-element-title">Possible evidences</div>
          {selectedEvidences.length < 3 && (
            <EvidenceElement
              evidenceArray={posibleEvidences}
              handleSelectedEvidences={handleSelectedEvidences}
            />
          )}
          {selectedEvidences.length === 3 && (
            <div style={{ height: "8vmax" }} />
          )}
        </div>
        <div className="section" style={{ height: "55%" }}>
          <div className="evidence-element-title">Ghost</div>
          {selectedEvidences.length < 2 && <div style={{ height: "80%" }} />}
          {selectedEvidences.length >= 2 && (
            <div className="ghost-list">
              {EvidenceMatrix.filter(
                (row) =>
                  row[1].includes(selectedEvidences[0]) &&
                  row[1].includes(selectedEvidences[1]) &&
                  (selectedEvidences.length === 2 ||
                    row[1].includes(selectedEvidences[2]))
              ).map((row, rowIndex) => (
                <div key={rowIndex} className="ghost-element">
                  <div className="ghost-name">{row[0]}</div>
                  <div className="ghost-tip">
                    {row[2].map((tip, tipIndex) => (
                      <div key={tipIndex}>&#x2022; {tip}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EvidencesMainContainer;
