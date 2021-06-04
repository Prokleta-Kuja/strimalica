import React from "react";
import Config from "./Config";
import Radio from "./Radio";
import { useRadio } from "./RadioContext";
import Volume from "./Volume";
// import './App.css';

function App() {
  const radio = useRadio();
  const classes = `list-group-item list-group-item-action list-group-item-${
    radio.isPlaying ? "danger" : "primary"
  } text-center`;

  return (
    <div className="container-fluid">
      <div className="list-group list-group-flush">
        {Config.Streams.map((r) => (
          <Radio key={r.id} {...r} />
        ))}
        {radio.currentStation && (
          <button type="button" onClick={radio.toggle} className={classes}>
            {radio.isPlaying ? "⏸" : "⏵"}
          </button>
        )}
      </div>
      <div className="text-center mt-4">
        <div className="btn-group">
          {Config.VolumeSteps.map((v) => (
            <Volume key={v} vol={v} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
