import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState, loginToken } from "../state/atoms/userLoginAtom";
import BGDots from "./layouts/BGDots";
import LinesFrame from "./layouts/LinesFrame";
import CornersFrame from "./layouts/CornersFrame";
import OctagonFrame from "./layouts/OctagonFrame";
import { useEffect, useState } from "react";
import CornersButton from "./buttons/CornersButton";
import UnderlineButton from "./buttons/UnderlineButton";
import KranoxButton from "./buttons/KranoxButton";

interface Arrival {
  arrival: {
    Mac: number;
    Windows: number;
    Linux: number;
  };
  missanswer: {
    Mac: number;
    Windows: number;
    Linux: number;
  };
  question: {
    Mac: number;
    Windows: number;
    Linux: number;
  };
}

const defaultArrival = {
  arrival: {
    Mac: 0,
    Windows: 0,
    Linux: 0,
  },
  missanswer: {
    Mac: 0,
    Windows: 0,
    Linux: 0,
  },
  question: {
    Mac: 0,
    Windows: 0,
    Linux: 0,
  },
};

const Home = () => {
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [token, setToken] = useRecoilState(loginToken);
  // const [shortcutsData, setShortcutsData] = useState<Shortcut[]>([]);
  const [macShortcuts, setMacShortcuts] = useState([]);
  const [windowsShortcuts, setWindowsShortcuts] = useState([]);
  const [linuxShortcuts, setLinuxShortcuts] = useState([]);
  const [arrivalData, setArrivalData] = useState<Arrival>(defaultArrival);
  const [progress, setProgress] = useState(0);
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (progress / 100) * circumference;
  const [hoveredMac, setHoveredMac] = useState(false);
  const [hoveredWindows, setHoveredWindows] = useState(false);
  const [hoveredLinux, setHoveredLinux] = useState(false);
  const [hoveredKey, setHoveredKey] = useState(false);
  const logoutFunc = () => {
    setIsLogin(false);
    setToken("");
  };

  const userId = 1;

  const fetchRemember = async () => {
    try {
      const macResponse = await fetch(`https://shortcutgame.kumaa9.dev/api/remember/${userId}/Mac/`);
      const windowsResponse = await fetch(`https://shortcutgame.kumaa9.dev/api/remember/${userId}/Windows/`);
      const linuxResponse = await fetch(`https://shortcutgame.kumaa9.dev/api/remember/${userId}/Linux/`);
      // ステータスコードが200番台のときに配列に追加
      if (macResponse.status === 200) {
        const macJsonData = await macResponse.json();
        setMacShortcuts(macJsonData.shortcuts);
      }
      if (windowsResponse.status === 200) {
        const windowsJsonData = await windowsResponse.json();
        setWindowsShortcuts(windowsJsonData.shortcuts);
      }
      if (linuxResponse.status === 200) {
        const linuxJsonData = await linuxResponse.json();
        setLinuxShortcuts(linuxJsonData.shortcuts);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    fetchRemember();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://shortcutgame.kumaa9.dev/api/arrival/${userId}/`
      );
      const jsonData = await response.json();
      
      setArrivalData(jsonData);

      const platforms = Object.keys(jsonData.question);
      let totalCorrect = 0;
      let totalQuestions = 0;

      platforms.forEach((platform) => {
        if(jsonData.missanswer[platform] == null) return;
        const correct = jsonData.question[platform] - jsonData.missanswer[platform];
        totalCorrect += correct;
        totalQuestions += jsonData.question[platform];
      });
      if (totalQuestions == 0 || totalQuestions == null) return;
      
      const overallRate = (totalCorrect / totalQuestions) * 100;
      setProgress(overallRate);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <BGDots />
      <header className="flex items-center fixed top-0 w-full h-16">
        {isLogin ? (
          <button
            className="text-white ml-auto mr-10"
            onClick={() => logoutFunc()}
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
            <div className="w-[90%] h-auto rounded-md overflow-scroll scrollContainer">
              {isLogin ? (
                <>
                  {macShortcuts.map((shortcut: any, index: number) => {
                    return (
                      <div key={index} className="relative mb-4">
                        <KranoxButton wid="270px" hei="112px" />
                        <div className="absolute flex flex-col justify-center top-0 w-full h-[112px] text-center p-5 rounded-md text-white">
                          <p>{shortcut.shortcut_name}</p>
                          <p>Command + C</p>
                        </div>
                      </div>
                    );
                  })}
                  {windowsShortcuts.map((shortcut: any, index: number) => {
                    return (
                      <div key={index} className="relative mb-4">
                        <KranoxButton wid="270px" hei="112px" />
                        <div className="absolute flex flex-col justify-center top-0 w-full h-[112px] text-center p-5 rounded-md text-white">
                          <p>{shortcut.shortcut_name}</p>
                          <p>Command + C</p>
                        </div>
                      </div>
                    );
                  })}
                  {linuxShortcuts.map((shortcut: any, index: number) => {
                    return (
                      <div key={index} className="relative mb-4">
                        <KranoxButton wid="270px" hei="112px" />
                        <div className="absolute flex flex-col justify-center top-0 w-full h-[112px] text-center p-5 rounded-md text-white">
                          <p>{shortcut.shortcut_name}</p>
                          <p>Command + C</p>
                        </div>
                      </div>
                    );
                  })}
                  {/* <div className="relative mb-4">
                    <KranoxButton wid="270px" hei="112px" />
                    <div className="absolute flex flex-col justify-center top-0 w-full h-[112px] text-center p-5 rounded-md text-white">
                      <p>コピーするショートカット</p>
                      <p>Command + C</p>
                    </div>
                  </div> */}
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
                    state={{ cource: "Mac" }}
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
                    state={{ cource: "Windows" }}
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
                    state={{ cource: "Linux" }}
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
          <div className="absolute top-0 left-0 flex flex-col justify-between items-center w-[300px] h-[70vh] rounded-md overflow-hidden">
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
                          {progress == 100 ? 100 : progress.toFixed(1)}
                          <span className="text-base ml-1">%</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="relative px-[15px] mb-[18px]">
                    <UnderlineButton wid="270px" hei="70px" />
                    <div className="absolute top-0 flex justify-between items-center w-[90%] mx-auto px-4 py-[23px]">
                      <p className="text-white">Mac編</p>
                      <p className="text-white text-2xl">{arrivalData.arrival.Mac ? arrivalData.arrival.Mac : "0"}%</p>
                    </div>
                  </div>
                  <div className="relative px-[15px] mb-[18px]">
                    <UnderlineButton wid="270px" hei="70px" />
                    <div className="absolute top-0 flex justify-between items-center w-[90%] mx-auto px-4 py-[23px]">
                      <p className="text-white">Windows編</p>
                      <p className="text-white text-2xl">{arrivalData.arrival.Windows ? arrivalData.arrival.Windows : "0"}%</p>
                    </div>
                  </div>
                  <div className="relative px-[15px] mb-[30px]">
                    <UnderlineButton wid="270px" hei="70px" />
                    <div className="absolute top-0 flex justify-between items-center w-[90%] mx-auto px-4 py-[23px]">
                      <p className="text-white">Linux編</p>
                      <p className="text-white text-2xl">{arrivalData.arrival.Linux ? arrivalData.arrival.Linux : "0"}%</p>
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
