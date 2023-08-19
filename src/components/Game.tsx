import { useCallback, useEffect, useRef, useState } from "react";
import anime from "animejs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BGDots from "./layouts/BGDots";
import CornersFrame from "./layouts/CornersFrame";
import OctagonFrame from "./layouts/OctagonFrame";
import UnderlineButton from "./buttons/UnderlineButton";
import KranoxButton from "./buttons/KranoxButton";
import { loginState, loginToken } from "../state/atoms/userLoginAtom";
import { useRecoilState } from "recoil";

const Game = () => {
  //データ型
  type request = {
    shortcut_id: number;
    shortcut_name: string;
    f_os: string;
    f_key1: {
      key: string;
      placeholder: Boolean;
    };
    f_key2: {
      key: string;
      placeholder: Boolean;
    };
    f_key3: {
      key: string;
      placeholder: Boolean;
    };
  };

  const [time, setTime] = useState<number>(15);
  const [countDown, setCountDown] = useState<number>(3);
  const [answerKey, setAnswerKey] = useState<number>(-1);

  const data = useRef<request[]>();
  const typoCount = useRef<number>(0);
  const correctCount = useRef<number[]>([]);
  const missCount = useRef<number[]>([]);

  const location = useLocation();
  // const course = location.state.course as number;

  const navigate = useNavigate();

  const isLogin = useRecoilState(loginState);
  const token = useRecoilState(loginToken);

  // データの取得
  useEffect(() => {
    if (isLogin[0] == false) {
      const result = fetch(`https://shortcutgame.kumaa9.dev/api/shortcut/${1}/`)
        .then((res) => res.json())
        .then((json) => {
          data.current = json;
          console.log(data);
        });
    } else {
      const result = fetch(`https://shortcutgame.kumaa9.dev/api/shortcut/${1}/`)
        .then((res) => res.json())
        .then((json) => {
          data.current = json;
          console.log(data);
        });
    }
  }, []);

  // キーイベントのコールバック関数
  const escFunction = useCallback(
    (event: { key: string }) => {
      // キーコードを判定
      if (
        event.key.toLocaleLowerCase() ===
        data.current?.[answerKey]?.f_key2?.key.toLocaleLowerCase()
      ) {
        console.log(answerKey + " Key is pressed!");
        correctCount.current.push(data.current?.[answerKey]?.shortcut_id); //正解したショートカットのIDを配列に追加
        setTime(10); // タイマーをリセット
        setAnswerKey(answerKey + 1); // answerKeyを変更
        if (answerKey == data.current?.length - 1) {
          console.log(correctCount.current);
          console.log(missCount.current);
          navigate(`/finish`, {
            state: {
              solved: correctCount, //正解した問題のid:正数配列
              notSolved: missCount, //正解できなかった問題のid:正数配列
              typoCount: typoCount, //タイプミスのカウント:正数
              // os: course, //osの種類:文字列
            },
          });
        }
      } else {
        if (answerKey == -1) return;
        typoCount.current += 1;
        console.log(typoCount.current);
      }
    },
    [answerKey]
  );
  useEffect(() => {
    const countDownInterval = setInterval(() => {
      if (countDown === -1) {
        clearInterval(countDownInterval);
        setAnswerKey(0);
      }
      if (countDown > -2) {
        setCountDown(countDown - 1);
      }
    }, 1000);
    return () => {
      clearInterval(countDownInterval);
    };
  }, [countDown]);

  useEffect(() => {
    // キーイベントを追加
    document.addEventListener("keydown", escFunction, true);

    // 10秒カウントダウン
    const timer = setInterval(() => {
      setTime((prevTime) => (prevTime <= 0 ? 0 : prevTime - 1));
    }, 1000);

    const ani = anime({
      targets: ".timeBar",
      width: "100%",
      easing: "linear",
      duration: 10000,
    });
    return () => {
      document.removeEventListener("keydown", escFunction, true);
      ani.restart();
      clearInterval(timer);
    };
  }, [answerKey]);

  useEffect(() => {
    if (time == 0) {
      missCount.current.push(data.current?.[answerKey]?.shortcut_id ?? -1);
      setTime(10);
      setAnswerKey(answerKey + 1);
      if (answerKey == data.current!.length - 1) {
        console.log(correctCount.current);
        console.log(missCount.current);
        navigate(`/finish`, {
          state: {
            solved: correctCount, //正解した問題のid:正数配列
            notSolved: missCount, //正解できなかった問題のid:正数配列
            typoCount: typoCount, //タイプミスのカウント:正数
            // os: course, //osの種類:文字列
          },
        });
      }
    }
  }, [answerKey, time]);

  const countDownTag = (
    <div className="text-8xl text-white">
      {countDown == -1 ? "GO" : countDown}
    </div>
  );

  const mainGameTag = (
    <>
      <CornersFrame wid="50vw" hei="40vh" />
      <div className="absolute p-10 w-2/4 rounded-md">
        <div className="flex h-[88px] justify-around p-4">
          <div className="relative h-[45px]">
            <OctagonFrame wid="96px" hei="40px" hovered={false} />
            <p className="absolute top-0 left-0 flex justify-center items-center w-[96px] h-[42px] rounded-md text-white text-xl">
              {time}秒
            </p>
          </div>
          <div className="w-1/2 h-[40px] bg-slate-600">
            <div className="bg-[#00DAD9] w-0 h-full timeBar"></div>
          </div>
        </div>

        <div className="p-1">
          <div className="relative text-white text-2xl p-4 w-full text-center flex justify-center ">
            <UnderlineButton hei="60px" wid="85%" />
            <p className="absolute w-full top-1/3">
              {answerKey == -1 ? "" : data.current?.[answerKey]?.shortcut_name}
            </p>
          </div>
          <div className="w-full flex justify-center">
            <div className="p-2 w-[70%] text-center flex justify-around">
              <div className="relative">
                <KranoxButton wid="150px" hei="88px" />
                <div className="absolute top-1/3 left-0 w-full h-88 text-white inline rounded-md text-xl">
                  <p>
                    {answerKey == -1
                      ? ""
                      : data.current?.[answerKey]?.f_key1?.key}
                  </p>
                </div>
              </div>
              <div className="text-white text-3xl p-6 inline rounded-md">
                ＋
              </div>
              <div className="relative">
                <KranoxButton wid="88px" hei="88px" />
                <div className="absolute top-1/3 left-0 w-full h-full inline rounded-md text-xl">
                  <p
                    className={
                      data.current?.[answerKey]?.f_key2?.placeholder
                        ? ""
                        : "opacity-0"
                    }
                  >
                    {answerKey == -1
                      ? ""
                      : data.current?.[answerKey]?.f_key2?.key}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <BGDots />

      <header className="fixed top-0 flex justify-between items-center w-[100vw] h-[10vh] p-4">
        <Link to="/">
          <h1 className="text-xl font-bold text-white">
            ショートカットタイピング
          </h1>
        </Link>
      </header>
      <main className="flex justify-around items-center w-[100vw] h-[100vh">
        <div className="relative h-screen w-screen flex justify-center items-center">
          {answerKey == -1 ? countDownTag : mainGameTag}
        </div>
      </main>
    </>
  );
};

export default Game;
