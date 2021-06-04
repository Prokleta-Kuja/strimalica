import { RadioStream } from "./RadioContext";

export default abstract class Config {
  public static Streams: RadioStream[] = [
    {
      id: 0,
      title: "Radio 101",
      url: "http://live.radio101.hr:9531/stream.mp3",
    },
    { id: 1, title: "Otvoreni", url: "https://stream2.otvoreni.hr/otvoreni" },
    { id: 2, title: "Narodni", url: "http://live.narodni.hr:8059/narodni" },
    {
      id: 3,
      title: "Enter ZG",
      url: "http://live.enterzagreb.hr:8023/stream/",
    },
    {
      id: 4,
      title: "Yammat",
      url: "https://streaming.radio.co/s5ad4b474a/listen",
    },
  ];

  public static VolumeSteps: number[] = [10, 25, 50, 75, 100];
}
