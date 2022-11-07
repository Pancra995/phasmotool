import React from "react";
import ElementImages from "../../assets/evidence-images.json";

const EvidenceElement = ({ evidenceArray, handleSelectedEvidences }) => {
  const generateElements = () => {
    return evidenceArray.map((evidence, evidenceIndex) => {
      return (
        <div
          className="evidence-element"
          key={evidenceIndex}
          onClick={() => handleSelectedEvidences(evidence)}
        >
          <img className="evidence-image" src={ElementImages[evidence]} />
          <div>{evidence}</div>
        </div>
      );
    });
  };

  return <div className="evidence-remaining-list">{generateElements()}</div>;
};

export default EvidenceElement;
