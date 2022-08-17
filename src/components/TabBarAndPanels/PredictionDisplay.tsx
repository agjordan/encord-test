import React, { FC, useEffect, useState } from "react";
import { Prediction } from "../TabBarAndPanels/TabBarAndPanels";

export interface ImageAndPredictionProps {
  viewImage: Prediction;
}

const ImageAndPrediction: FC<ImageAndPredictionProps> = ({ viewImage }) => {
  const [displayedImage, setDisplayedImage] = useState<
    HTMLImageElement | undefined
  >();

  useEffect(() => {
    // there has got to be a better way of doing this but I just could not get there
    setTimeout(() => {
      setDisplayedImage(
        document?.getElementById("displayed-image") as HTMLImageElement
      );
    }, 5);
  }, []);

  setTimeout(() => {}, 200);

  if (!displayedImage) return <p>Loading...</p>;

  const scalePredictionBoxes = (
    x1: number,
    x2: number,
    y1: number,
    y2: number
  ) => {
    const height = displayedImage.clientHeight;
    const width = displayedImage.clientWidth;
    const heightRatio = displayedImage.naturalHeight / height;
    const widthRatio = displayedImage.naturalWidth / width;

    return {
      sx1: x1 / widthRatio,
      sx2: x2 / widthRatio,
      sy1: y1 / heightRatio,
      sy2: y2 / heightRatio,
    };
  };

  return (
    <>
      {viewImage.prediction.predictions.map((prediction) => {
        const { sx1, sx2, sy1, sy2 } = scalePredictionBoxes(
          prediction.bbox.x1,
          prediction.bbox.x2,
          prediction.bbox.y1,
          prediction.bbox.y2
        );

        return (
          <>
            <div
              style={{
                backgroundColor: "purple",
                color: "black",
                width: sx2 - sx1,
                height: sy2 - sy1,
                position: "absolute",
                top: sy1,
                left: sx1,
                opacity: 0.25,
              }}
            />
            <div
              style={{
                border: "1px solid black",
                color: "black",
                width: sx2 - sx1,
                height: sy2 - sy1,
                position: "absolute",
                top: sy1,
                left: sx1,
                textAlign: "right",
                verticalAlign: "bottom",
              }}
            >
              <span style={{ position: "absolute", bottom: 0, right: 0 }}>
                {`${prediction.label} - ${(
                  Number(prediction.score) * 100
                ).toFixed(0)}%`}
              </span>
            </div>
          </>
        );
      })}
    </>
  );
};

export default ImageAndPrediction;
