import { useCallback, useEffect, useRef, useState } from "react";
import anime from "animejs";
import { Link } from "react-router-dom";

const Game = () => {

  type request = {
        "shortcut_id": number,
        "shortcut_name": string,
        "f_os":string,
        "f_key1": {
                "key": string,
                "placeholder": Boolean
            },
        "f_key2":{
                "key": string,
                "placeholder": Boolean
            },
        "f_key3":{
                "key": string,
                "placeholder": Boolean
            }
};

 const [time, setTime] = useState<number>(15);
 const [countDown,setCountDown] = useState<number>(3);
  const [answerKey, setAnswerKey] = useState<number>(-1);

  const data = useRef<request[]>()
  const typoCount = useRef<number>(0);


  useEffect(()=>{

    const result= fetch("https://shortcutgame.kumaa9.dev/api/shortcut/")
    .then((res)=> res.json())
    .then((json)=> {
      data.current = json
      console.log(data)
    })
    .catch(err=> console.log(err))
  },[])


  // キーイベントのコールバック関数
  const escFunction = useCallback(
    (event: { key: string }) => {
      // キーコードを判定
      if (event.key.toLocaleLowerCase() === data.current?.[answerKey]?.f_key2?.key.toLocaleLowerCase()) {
        console.log(answerKey + " Key is pressed!");
        setTime(10); // タイマーをリセット
        ani.restart();
        setAnswerKey(answerKey+1); // answerKeyを変更
      }else{
        if(answerKey == -1) return
        typoCount.current += 1
        console.log(typoCount.current)
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

    useEffect(()=>{
      const countDownInterval = setInterval(() => {
      if (countDown === -1) {
        clearInterval(countDownInterval)
        setAnswerKey(0)
      }
      if (countDown > -2) {
        setCountDown(countDown - 1)
      }
    }, 1000)
    return () => {
      clearInterval(countDownInterval)
    }
  }, [countDown])
  

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
  }, [answerKey]);

  const countDownTag = 
      <div className="text-5xl text-white">
        {(countDown == -1) ? "GO" :countDown}
      </div>

  const mainGameTag = 
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
            {answerKey == -1  ? "": data.current?.[answerKey]?.shortcut_name}
            </div>
          <div className="p-4 w-full text-center flex justify-around">
            <div className="p-4 bg-slate-50 inline  rounded-md text-xl">
                 {answerKey == -1 ? "":data.current?.[answerKey]?.f_key1?.key}
            </div>
            <div className="text-white text-xl p-4 inline rounded-md">
              ＋
            </div>
            <div className="p-4 bg-slate-50 inline rounded-md text-xl">
              <p className={data.current?.[answerKey]?.f_key2?.placeholder? "":"opacity-0"}>
                {answerKey == -1 ? "":data.current?.[answerKey]?.f_key2?.key}
              </p>
            </div>
            </div>
        </div>
      </div>

  return<>
   <header className="fixed top-0 flex justify-between items-center w-[100vw] h-[10vh] p-4">
        <Link to="/">
          <h1 className="text-xl font-bold text-white">ショートカットタイピング</h1>
        </Link>
      </header>
  <main className="flex justify-around items-center w-[100vw] h-[100vh] bg-slate-900">

    
    <div className="h-screen w-screen flex justify-center items-center">
      {answerKey== -1 ? countDownTag:mainGameTag}
      
    </div>
  </main>
  </>


};

export default Game;
