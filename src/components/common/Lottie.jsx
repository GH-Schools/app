import React from "react";
import Lottier from "react-lottie";

/**
 * @param {{
 * data: any;
 * autoPlay?: boolean;
 * loop?: boolean;
 * width?: number;
 * height?: number;
 * }}
 */
const Lottie = ({
  data,
  autoPlay = true,
  loop = true,
  width = 400,
  height = 400,
}) => {
  const defaultOptions = {
    loop,
    autoplay: autoPlay,
    animationData: data,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottier options={defaultOptions} height={height} width={width} />;
};

export default Lottie;
