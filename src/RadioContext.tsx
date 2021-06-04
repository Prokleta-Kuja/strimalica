import React, { ReactNode, useContext, useEffect, useState } from "react";
import Config from "./Config";

interface ProviderProps {
  children: ReactNode;
}

export interface RadioStream {
  id: number;
  title: string;
  url: string;
}

export interface IRadioContext {
  currentStation?: RadioStream;
  currentVolume: number;
  isPlaying?: boolean;
  changeStation: (radio: RadioStream) => void;
  changeVolume: (vol: number) => void;
  toggle: () => void;
}

// @ts-ignore
export const RadioCtx = React.createContext<RadioContext>({});

export const useRadio = (): IRadioContext => useContext(RadioCtx);

export const RadioCtxProvider = (props: ProviderProps): JSX.Element => {
  const { mediaSession } = navigator;
  const [radio, setRadio] = useState<RadioStream>();
  const [playing, setPlaying] = useState<boolean>(false);
  const [vol, setVol] = useState<number>(100);

  const changeStation = (radio?: RadioStream) => {
    radio = radio ? radio : Config.Streams[0];
    Player.src = `${radio.url}?t=${new Date().toISOString()}`;
    Player.load();
    Player.play().catch((e) => {});
    setPlaying(true);
    setRadio(radio);
    if (navigator.mediaSession)
      navigator.mediaSession.metadata = new MediaMetadata({
        artist: "Strimalica",
        title: radio.title,
      });
  };

  const changeVolume = (vol: number) => {
    Player.volume = vol / 100;
    setVol(vol);
  };

  const toggleRadio = () => {
    if ((Player.paused || Player.ended) && Player.src) {
      Player.load();
      Player.play();
      setPlaying(true);
    } else {
      Player.pause();
      setPlaying(false);
    }
  };

  useEffect(() => {
    mediaSession?.setActionHandler("play", toggleRadio);
    mediaSession?.setActionHandler("pause", toggleRadio);
    mediaSession?.setActionHandler("stop", toggleRadio);
    return () => {
      mediaSession?.setActionHandler("play", null);
      mediaSession?.setActionHandler("pause", null);
      mediaSession?.setActionHandler("stop", null);
    };
  }, [mediaSession]);

  useEffect(() => {
    const next = () => {
      if (radio) {
        const idx = radio.id === Config.Streams.length - 1 ? 0 : radio.id + 1;
        changeStation(Config.Streams[idx]);
      } else changeStation();
    };
    const previous = () => {
      if (radio) {
        const idx = radio.id === 0 ? Config.Streams.length - 1 : radio.id - 1;
        changeStation(Config.Streams[idx]);
      } else changeStation();
    };

    mediaSession?.setActionHandler("nexttrack", next);
    mediaSession?.setActionHandler("previoustrack", previous);
    return () => {
      mediaSession?.setActionHandler("nexttrack", null);
      mediaSession?.setActionHandler("previoustrack", null);
    };
  }, [mediaSession, radio]);

  return (
    <RadioCtx.Provider
      value={{
        currentStation: radio,
        currentVolume: vol,
        changeStation: changeStation,
        changeVolume: changeVolume,
        toggle: toggleRadio,
        isPlaying: playing,
      }}
    >
      {props.children}
    </RadioCtx.Provider>
  );
};

export const Player = new Audio();
