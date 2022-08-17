export const getPrediction = async () => {
  try {
    return await (await fetch("http://localhost:4000/predict")).json();
  } catch (error) {
    throw error;
  }
};

export default getPrediction;
