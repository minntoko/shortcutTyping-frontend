import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "../state/atoms/userLoginAtom";
import BGDots from "./layouts/BGDots";
import LinesFrame from "./layouts/LinesFrame";
import CornersFrame from "./layouts/CornersFrame";
import OctagonFrame from "./layouts/OctagonFrame";
import { useState } from "react";
import CornersButton from "./buttons/CornersButton";
import UnderlineButton from "./buttons/UnderlineButton";
import KranoxButton from "./buttons/KranoxButton";

const Home = () => {
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const progress = 70;
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (progress / 100) * circumference;
  const [hoveredMac, setHoveredMac] = useState(false);
  const [hoveredWindows, setHoveredWindows] = useState(false);
  const [hoveredLinux, setHoveredLinux] = useState(false);
  const [hoveredKey, setHoveredKey] = useState(false);
  return (
    <>
      <BGDots />
      <header className="flex items-center fixed top-0 w-full h-16">
        {isLogin ? (
          <button
            className="text-white ml-auto mr-10"
            onClick={() => setIsLogin(false)}
          >
            ログアウト
          </button>
        ) : (
          <Link to="/login" className="text-white ml-auto mr-10">
            ログイン
          </Link>
        )}
      </header>
      <main className="flex justify-around items-center w-[100vw] h-[100vh]">
        <div className="relative">
          <LinesFrame wid="300px" hei="70vh" />
          <div className="absolute top-0 left-0 flex flex-col justify-between items-center w-[300px] h-[70vh]">
            <h2 className="text-white text-xl text-center my-5">
              覚えてないショートカット
            </h2>
            <div className="w-[90%] h-auto rounded-md overflow-scroll">
              {isLogin ? (
                <>
                  <div className="relative mb-4">
                    <KranoxButton wid="270px" hei="88px" />
                    <div className="absolute top-0 w-full text-center p-5 rounded-md text-white">
                      <p>コピーするショートカット</p>
                      <p>Command + C</p>
                    </div>
                  </div>
                  <div className="relative mb-4">
                    <KranoxButton wid="270px" hei="88px" />
                    <div className="absolute top-0 w-full text-center p-5 rounded-md text-white">
                      <p>ペーストするショートカット</p>
                      <p>Command + V</p>
                    </div>
                  </div>
                  <div className="relative mb-4">
                    <KranoxButton wid="270px" hei="88px" />
                    <div className="absolute top-0 w-full text-center p-5 rounded-md text-white">
                      <p>カットするショートカット</p>
                      <p>Command + X</p>
                    </div>
                  </div>
                  <div className="relative mb-4">
                    <KranoxButton wid="270px" hei="88px" />
                    <div className="absolute top-0 w-full text-center p-5 rounded-md text-white">
                      <p>全選択するショートカット</p>
                      <p>Command + A</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-white text-center text-xs w-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                  ログインしたら表示されます
                </div>
              )}
            </div>
            {isLogin && (
              <div
                className="relative my-4"
                onMouseEnter={() => setHoveredKey(true)}
                onMouseLeave={() => setHoveredKey(false)}
              >
                <OctagonFrame wid="270px" hei="48px" hovered={hoveredKey} />
                <Link
                  to={"/learnList"}
                  className="absolute top-0 text-center text-white w-[270px] h-12 p-3 rounded-md"
                >
                  覚えてないショートカット一覧へ
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-between h-[70vh]">
          <Link to="/">
            <h1 className="text-white text-2xl text-center">
              ショートカットタイピング
            </h1>
          </Link>
          <div className="relative">
            <CornersFrame wid="600px" hei="384px" />
            <div className="absolute top-0 left-0 flex items-center justify-center w-[600px] h-96">
              <div className="flex flex-col items-center w-full">
                <h2 className="text-xl text-white -translate-y-5">
                  コース選択
                </h2>
                <div
                  className="relative mt-6"
                  onMouseEnter={() => setHoveredMac(true)}
                  onMouseLeave={() => setHoveredMac(false)}
                >
                  <OctagonFrame wid="300px" hei="48px" hovered={hoveredMac} />
                  <Link
                    to="/game"
                    className="absolute top-0 left-0 flex justify-center items-center w-[300px] h-12 duration-200 text-white rounded-md"
                  >
                    Mac編
                  </Link>
                </div>
                <div
                  className="relative mt-6"
                  onMouseEnter={() => setHoveredWindows(true)}
                  onMouseLeave={() => setHoveredWindows(false)}
                >
                  <OctagonFrame
                    wid="300px"
                    hei="48px"
                    hovered={hoveredWindows}
                  />
                  <Link
                    to="/game"
                    className="absolute top-0 left-0 flex justify-center items-center w-[300px] h-12 duration-200 text-white rounded-md"
                  >
                    Windows編
                  </Link>
                </div>
                <div
                  className="relative mt-6"
                  onMouseEnter={() => setHoveredLinux(true)}
                  onMouseLeave={() => setHoveredLinux(false)}
                >
                  <OctagonFrame wid="300px" hei="48px" hovered={hoveredLinux} />
                  <Link
                    to="/game"
                    className="absolute top-0 left-0 flex justify-center items-center w-[300px] h-12 duration-200 text-white rounded-md"
                  >
                    Linux編
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <p className="text-white text-center">コースを選択してプレイ</p>
        </div>
        <div className="relative">
          <LinesFrame wid="300px" hei="70vh" />
          <div className="absolute top-0 left-0 flex flex-col justify-between items-center w-[300px] h-[70vh] rounded-md">
            <h1 className="text-white text-2xl text-center my-5">達成度</h1>
            <div className="overflow-scroll w-full">
              {isLogin ? (
                <>
                  <div className="relative px-[15px] mb-2">
                    <CornersButton wid="270px" hei="174px" />
                    <div className="w-[90%] h-[174px] mx-auto rounded-md overflow-hidden p-1 absolute top-0">
                      <svg className="w-full h-full fill-transparent rotate-[-90deg]">
                        <circle
                          className="stroke-sky-100"
                          cx="129"
                          cy="81"
                          r="70"
                          strokeWidth="12"
                          fill="transparent"
                          strokeDasharray={circumference}
                          strokeDashoffset={0}
                          strokeLinecap="round"
                        />
                        <circle
                          className="stroke-sky-500"
                          cx="129"
                          cy="81"
                          r="70"
                          strokeWidth="12.5"
                          fill="transparent"
                          strokeDasharray={circumference}
                          strokeDashoffset={offset}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
                        <p className="text-white">トータル</p>
                        <p className="text-white text-3xl mb-1">
                          70<span className="text-base ml-1">%</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="relative px-[15px] mb-[18px]">
                    <UnderlineButton wid="270px" hei="70px" />
                    <div className="absolute top-0 flex justify-between items-center w-[90%] mx-auto px-4 py-[23px]">
                      <p className="text-white">Mac編</p>
                      <p className="text-white text-2xl">80%</p>
                    </div>
                  </div>
                  <div className="relative px-[15px] mb-[18px]">
                    <UnderlineButton wid="270px" hei="70px" />
                    <div className="absolute top-0 flex justify-between items-center w-[90%] mx-auto px-4 py-[23px]">
                      <p className="text-white">Windows編</p>
                      <p className="text-white text-2xl">70%</p>
                    </div>
                  </div>
                  <div className="relative px-[15px] mb-[30px]">
                    <UnderlineButton wid="270px" hei="70px" />
                    <div className="absolute top-0 flex justify-between items-center w-[90%] mx-auto px-4 py-[23px]">
                      <p className="text-white">Linux編</p>
                      <p className="text-white text-2xl">60%</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-white text-center text-xs w-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                  ログインしたら表示されます
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <footer className="flex items-center justify-center fixed bottom-0 w-full h-16">
        <small className="text-slate-300">
          &copy; 2023 daipan-shortcut. All Rights Reserved
        </small>
      </footer>
    </>
  );
};

export default Home;
