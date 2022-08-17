import React, { FC } from "react";
import { Prediction } from "../TabBarAndPanels/TabBarAndPanels";
import PredictionsTable from "./PredictionsTable";

export interface PredictionsProps {
  rows: Prediction[];
  onViewClick: (prediction: Prediction) => void;
}

const Predictions: FC<PredictionsProps> = ({ rows, onViewClick }) => {
  return (
    <>
      <PredictionsTable onViewClick={onViewClick} rows={rows} />
    </>
  );
};

export default Predictions;
