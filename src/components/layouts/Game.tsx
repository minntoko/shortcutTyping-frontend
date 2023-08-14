import { useEffect, useState } from "react";

const Game = () => {

  const [time, setTime] = useState<number>(10);
  useEffect(() => {
    const timer = setInterval(() => {
      if (time <= 0) {
        console.log("clear");
        clearInterval(timer);
      }else{
        setTime((time) => time - 1);
        console.log(time);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });
  return <div className="h-screen w-screen flex justify-center items-center">
    {/* <div className="text-5xl">
      count down
    </div> */}
    <div className="bg-gray-300 p-10 w-2/4">
      <div className="flex justify-around p-4">
        <div className="p-2 bg-blue-400">
          {time}秒
          </div>
        <div className="p-2">
          time bar
          </div>
      </div>
      <div className="bg-blue-400 p-4">
        <div className="p-4 w-full text-center">
          文字をコピーするショートカット
          </div>
        <div className="p-4 w-full text-center flex justify-around">
          <div className="p-4 bg-slate-50 inline">
            command
          </div>
          <div className="p-4 inline">
            ＋
          </div>
          <div className="p-4 bg-slate-50 inline">
            c
          </div>
          </div>
      </div>
    </div>
  </div>;
};

export default Game;
