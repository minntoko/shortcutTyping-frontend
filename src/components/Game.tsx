import { useCallback, useEffect, useState } from "react";
import anime from "animejs";

const Game = () => {

  type request = {
  "course": string,
  "questions": Array<{
    "id": string,
    "question": string,
    "keys": Array<{
      "key": string,
      "placeholder": boolean,
    }>
  }>
};

  // ダミーデータ
  const data: request = {
    "course": "Mac",
    "questions": [
      {
        "id": "1",
        "question": "文字をコピーするショートカット",
        "keys": [
          {
            "key": "command",
            "placeholder": true,
          },
          {
            "key": "c",
            "placeholder": false,
          }
        ]
      },
       {
        "id": "2",

        "question": "コピーした文字をペーストするショートカット",
        "keys": [
          {
            "key": "command",
            "placeholder": true
          },
          {
            "key": "v",
            "placeholder": false
          }
        ]
      },
        {
        "id": "3",

        "question": "b",
        "keys": [
          {
            "key": "command",
            "placeholder": true
          },
          {
            "key": "b",
            "placeholder": false
          }
        ]
      },
    ]
  };
    
 const [time, setTime] = useState<number>(10);
  const [answerKey, setAnswerKey] = useState<number>(0);

  // キーイベントのコールバック関数
  const escFunction = useCallback(
    (event: { key: string }) => {
      // キーコードを判定
      if (event.key === data["questions"][answerKey]["keys"][1]["key"]) {
        console.log(answerKey + " Key is pressed!");
        setTime(10); // タイマーをリセット
        ani.restart();
        setAnswerKey(answerKey+1); // answerKeyを変更
      }
    },
    [answerKey]
  );

   const ani =anime({
      targets: ".timeBar",
      width: "100%",
      easing: 'linear',
      duration: 10000,
    });
    ani.pause();

  useEffect(() => {
    // キーイベントを追加
    document.addEventListener("keydown", escFunction, true);

    // 10秒カウントダウン
    const timer = setInterval(() => {
      setTime((prevTime) => (prevTime <= 0 ? 0 : prevTime - 1));
    }, 1000);

    ani.play();


    return () => {
      document.removeEventListener("keydown", escFunction, true);
      ani.restart()
      clearInterval(timer);
    };
  }, [,answerKey]);

  return <main className="flex justify-around items-center w-[100vw] h-[100vh] bg-slate-900">

    
    <div className="h-screen w-screen flex justify-center items-center">
      {/* <div className="text-5xl">
        count down
      </div> */}
      <div className=" bg-slate-800 p-10 w-2/4 rounded-md">
        <div className="flex justify-around p-4">
          <div className="text-white text-xl p-1 bg-slate-600 w-16 text-center">
            {time}秒
          </div>
            <div className="w-1/2 h-8 bg-slate-600">

              <div className="bg-slate-100 h-8 w-0 timeBar">
                
              </div>
            </div>
        </div>
        <div className="bg-slate-600 p-4 rounded-md">
          <div className="text-white text-xl p-4 w-full text-center ">
            {data["questions"][answerKey]["question"]}
            </div>
          <div className="p-4 w-full text-center flex justify-around">
            <div className="p-4 bg-slate-50 inline  rounded-md text-xl">
              command
            </div>
            <div className="text-white text-xl p-4 inline rounded-md">
              ＋
            </div>
            <div className="p-4 bg-slate-50 inline rounded-md text-xl">
              {data["questions"][answerKey]["keys"][1]["key"]}
            </div>
            </div>
        </div>
      </div>
    </div>
  </main>

};

export default Game;
