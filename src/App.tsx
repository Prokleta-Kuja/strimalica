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
  const refresh = () => {
    window.location.reload();
  };

  return (
    <div className="container-fluid mt-2">
      <div className="list-group list-group-flush">
        {Config.Streams.map((r) => (
          <Radio key={r.id} {...r} />
        ))}
        {radio.currentStation && (
          <button type="button" onClick={radio.toggle} className={classes}>
            {radio.isPlaying ? <i className="bi bi-stop-circle-fill"></i> : <i className='bi bi-play-circle-fill'></i>}
          </button>
        )}
      </div>
      <div className="d-flex justify-content-between">
        <div className="mt-4">
          <button className="btn btn-outline-primary" onClick={refresh}>
            <i className="bi bi-arrow-clockwise"></i>
          </button>
        </div>
        <div className="text-center mt-4">
          <div className="btn-group">
            {Config.VolumeSteps.map((v) => (
              <Volume key={v} vol={v} />
              ))}
          </div>
        </div>
        <div className="mt-4">
          <button className="btn btn-outline-success" onClick={radio.changeDevice}>
            <i className="bi bi-speaker"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
