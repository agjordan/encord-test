import { Box, Button, TextField, Typography } from "@mui/material";
import React, { FC, FormEvent } from "react";

export interface ImagesPredictDialogProps {
  onSubmit: (event: FormEvent<HTMLFormElement>, imageUrl: string) => void;
  onCancelClick: () => void;
  predictionImageUrl?: string;
}

export type ImagePrediction = {
  title: string,
  description: string,
  predictedAt: Date,
}

const ImagesPredictDialog: FC<ImagesPredictDialogProps> = ({
  onSubmit,
  onCancelClick,
  predictionImageUrl,
}) => {
  return (
    <>
      <Typography
        variant="h5"
        style={{ marginLeft: "20px", marginTop: "20px" }}
      >
        Prediction
      </Typography>
      <form onSubmit={(event) => onSubmit(event, predictionImageUrl!)}>
        <Box
          style={{ maxWidth: "500px", margin: "20px" }}
          display="flex"
          flexDirection="column"
        >
          <TextField variant="outlined" name="predictionTitle" label="title" style={{marginBottom: "5px"}} required/>
          <TextField variant="outlined" name="predictionDescription" label="description" multiline required/>
        </Box>
        <Box style={{ margin: "20px" }}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
          <Button onClick={onCancelClick}>Cancel</Button>
        </Box>
      </form>
    </>
  );
};

export default ImagesPredictDialog;
