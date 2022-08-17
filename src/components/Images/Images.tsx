import { Button, Drawer } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC, FormEvent, useState } from "react";
import getPrediction from "../../services/predict.api";
import ImagesPredictDialog from "./ImagesPredictDialog";
import ImagesTable from "./ImagesTable";
import ImagesUploadDialog from "./ImagesUploadDialog";
import { Image, Prediction } from "../TabBarAndPanels/TabBarAndPanels";

const formatBytes = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const sizes = ["Bytes", "KB", "MB", "GB"];

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
};

export interface ImagesProps {
  images: Image[];
  predictions: Prediction[];
  setImages: (images: Image[]) => void;
  setPredictions: (predictions: Prediction[]) => void;
}

const Images: FC<ImagesProps> = ({
  images,
  setImages,
  setPredictions,
  predictions,
}) => {
  const [uploadDrawerIsVisible, setUploadDrawerIsVisible] = useState(false);
  const [predictDrawerIsVisible, setPredictDrawerIsVisible] = useState(false);
  const [predictionCandidate, setPredictionCandidate] = useState<
    string | undefined
  >();
  const handleAddImageSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const file = event.currentTarget.image.files[0];
    const url = URL.createObjectURL(file);
    setImages([
      ...images,
      {
        image: url,
        filename: event.currentTarget.image.files[0].name,
        size: formatBytes(event.currentTarget.image.files[0].size),
        uploadedAt: new Date(),
      },
    ]);
    setUploadDrawerIsVisible(false);
  };

  const handleUploadDrawerOpen = () => {
    setUploadDrawerIsVisible(true);
  };

  const handleUploadDrawerClose = () => {
    setUploadDrawerIsVisible(false);
  };
  const handlePredictDrawerOpen = (imageUrl: string) => {
    setPredictionCandidate(imageUrl);
    setPredictDrawerIsVisible(true);
  };

  const handlePredictDrawerClose = () => {
    setPredictDrawerIsVisible(false);
    setPredictionCandidate(undefined);
  };

  const handlePredictSubmit = async (
    event: FormEvent<HTMLFormElement>,
    imageUrl: string
  ) => {
    event.preventDefault();
    try {
      console.log('trying')
      const title = event.currentTarget.predictionTitle.value;
      const description = event.currentTarget.predictionDescription.value;
      const prediction = await getPrediction();
      setPredictions([
        ...predictions,
        {
          title,
          description,
          prediction,
          submittedAt: new Date(),
          imageUrl,
        },
      ]);
    } catch (error) {
      alert(error);
    } finally {
      handlePredictDrawerClose();
    }
  };

  return (
    <>
      <Box>
        <ImagesTable rows={images} onPredictClick={handlePredictDrawerOpen} />
      </Box>
      <Button variant="contained" onClick={handleUploadDrawerOpen}>
        Add Image
      </Button>
      <Drawer
        anchor={"bottom"}
        open={uploadDrawerIsVisible}
        onClose={handleUploadDrawerClose}
      >
        <ImagesUploadDialog
          onSubmit={handleAddImageSubmit}
          onCancelClick={handleUploadDrawerClose}
        />
      </Drawer>
      <Drawer
        anchor={"bottom"}
        open={predictDrawerIsVisible}
        onClose={handlePredictDrawerClose}
      >
        <ImagesPredictDialog
          onCancelClick={handlePredictDrawerClose}
          onSubmit={handlePredictSubmit}
          predictionImageUrl={predictionCandidate}
        />
      </Drawer>
    </>
  );
};

export default Images;
