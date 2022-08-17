import React, {
  FC,
  SyntheticEvent,
  useState,
} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Images from "../Images";
import Predictions from "../Predictions";
import { Dialog } from "@mui/material";
import PredictionDisplay from "./PredictionDisplay";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export type Image = {
  filename: string;
  size: string;
  uploadedAt: Date;
  image: any;
};

export type Prediction = {
  title: string;
  description: string;
  prediction: {
    description: string;
    predictions: {
      bbox: { x1: number; x2: number; y1: number; y2: number };
      label: string;
      score: string;
    }[];
  };
  submittedAt: Date;
  imageUrl: string;
};

const TabPanel: FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
    >
      {value === index && (
        <Box>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const TabBarAndPanels: FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [images, setImages] = useState<Image[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [viewImage, setViewImage] = useState<Prediction | undefined>();

  const handleChange = (_event: SyntheticEvent, newSelectedTab: number) => {
    setSelectedTab(newSelectedTab);
  };

  const handleViewClick = (prediction: Prediction) => {
    setViewImage(prediction);
  };

  const handleViewClose = () => {
    setViewImage(undefined);
  };

  return (
    // using in-line styles here for speed but could pull these out to a sass module for better readability and separation
    // could use better (more meaningful) values for the TabPanels than the index
    <Box sx={{ width: "100%" }}>
      <Box>
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab label="Images" />
          <Tab label="Predictions" />
        </Tabs>
      </Box>
      <TabPanel value={selectedTab} index={0}>
        <Images
          images={images}
          setImages={setImages}
          setPredictions={setPredictions}
          predictions={predictions}
        />
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <Predictions rows={predictions} onViewClick={handleViewClick} />
      </TabPanel>
      <Dialog
        open={!!viewImage}
        onClose={handleViewClose}
        style={{ height: "100%", width: "100%" }}
      >
        <img
          src={viewImage?.imageUrl}
          alt={viewImage?.title}
          style={{ objectFit: "contain"}}
          id="displayed-image"
        />
        {viewImage && <PredictionDisplay viewImage={viewImage} />}
      </Dialog>
    </Box>
  );
};

export default TabBarAndPanels;
