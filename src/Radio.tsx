import React from "react";
import { RadioStream, useRadio } from "./RadioContext";

const Radio = (props: RadioStream): JSX.Element => {
  const radio = useRadio();
  const changeStream = (e: React.MouseEvent<HTMLButtonElement>) => {
    radio.changeStation(props);
    e.currentTarget.blur();
  };

  const classes = `list-group-item list-group-item-action list-group-item-${
    radio.isPlaying && radio.currentStation?.id === props.id
      ? "success"
      : "dark"
  } text-center`;

  return (
    <button type="button" onClick={changeStream} className={classes}>
      {props.title}
    </button>
  );
};

export default Radio;
