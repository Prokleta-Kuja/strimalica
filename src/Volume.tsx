import React from "react";
import { useRadio } from "./RadioContext";

const Volume = (props: { vol: number }): JSX.Element => {
  const radio = useRadio();
  const changeVolume = (e: React.MouseEvent<HTMLButtonElement>) => {
    radio.changeVolume(props.vol);
    e.currentTarget.blur();
  };

  const classes = `btn btn-${
    radio.currentVolume === props.vol ? "success" : "warning"
  }`;

  return (
    <button type="button" onClick={changeVolume} className={classes}>
      {props.vol}%
    </button>
  );
};

export default Volume;
