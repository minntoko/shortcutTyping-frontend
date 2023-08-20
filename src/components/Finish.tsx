// Todo_問題一覧とゲームから取得した覚えてないショートカットと一致したものを表示させる
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import BGDots from "./layouts/BGDots";
import { useEffect, useState } from "react";
import CornersFrame from "./layouts/CornersFrame";
import LinesFrame from "./layouts/LinesFrame";
import KranoxButton from "./buttons/KranoxButton";
import OctagonFrame from "./layouts/OctagonFrame";

interface State {
  state: {
    soluve: number[];
    notSolved: number[];
    typoCount: number;
    os: string;
  }
}

// ゲームから取得できるデータ
const states = {
  soluve: [1, 2, 3],
  notSolved: [4, 5, 6],
  typoCount: 2,
  os: "Windows"
}
const Finish = () => {
  const [shortcutsData, setShortcutsData] = useState([]) as any[];
  const location = useLocation();
  try {
    const { state } = location.state as State;
    console.log(state);
  
    // const { _soluve, notSolved, typoCount, os } = state;
  } catch (error) {
    console.log("ゲームから来てください");
  }

  const {soluve, notSolved, typoCount, os} = states;

  const fetchData = async () => {
    try {
      const response = await fetch(`https://shortcutgame.kumaa9.dev/api/shortcut/${os}/`);
      const jsonData = await response.json();
      setShortcutsData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

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
      <main className="flex justify-evenly items-center w-[100vw] h-[100vh]">
        <div className="relative">
          <LinesFrame wid="280px" hei="455px" />
          <div className="absolute top-0 flex flex-col w-[280px] h-full rounded-md overflow-hidden">
            <div className="flex flex-col justify-evenly items-center py-4 grow">
              <Link to="/" className="text-xl text-white hover:bg-slate-400/20 px-6 py-3 my-1 duration-200 rounded-lg">
                ホーム
              </Link>
              <Link to="/game" className="text-xl text-white hover:bg-slate-400/20 px-6 py-3 my-1 duration-200 rounded-lg">
                Mac編
              </Link>
              <Link to="/game" className="text-xl text-white hover:bg-slate-400/20 px-6 py-3 my-1 duration-200 rounded-lg">
                Windows編
              </Link>
              <Link to="/game" className="text-xl text-white hover:bg-slate-400/20 px-6 py-3 my-1 duration-200 rounded-lg">
                Linux編
              </Link>
              <Link to="/learnList" className="text-xl text-white hover:bg-slate-400/20 px-6 py-3 my-1 duration-200 rounded-lg">
                覚えてないリスト
              </Link>
            </div>
          </div>
        </div>
        <div className="relative">
          <CornersFrame wid="550px" hei="384px" />
          <div className="absolute top-0 flex flex-col items-center justify-evenly w-[550px] h-96 rounded-md overflow-hidden">
            <div className="relative block">
              <LinesFrame wid="350px" hei="64px" />
              <div className="w-full py-4 text-center text-xl absolute top-0">
                <h1 className="text-white text-2xl">結果発表</h1>
              </div>
            </div>
            <div className="relative">
              <KranoxButton wid="370px" hei="220px" />
              <div className="absolute top-0 flex flex-col justify-center items-center w-[370px] h-[220px] p-5 mb-4 rounded-sm">
                <div>
                  <p className="mb-3 text-lg font-bold text-white">入力ミス：20</p>
                  <p className="text-lg font-bold text-white">達成度：2% UP</p>
                </div>
                <div className="mt-10 flex justify-evenly w-full">
                  <div className="relative">
                    <OctagonFrame hovered={false} wid="120px" hei="40px" />
                    <Link to="/game" className="absolute top-0 flex justify-center items-center w-[120px] h-[40px] font-bold rounded-full text-white">
                      もう一度
                    </Link>
                  </div>
                  <div className="relative">
                    <OctagonFrame hovered={false} wid="120px" hei="40px" />
                    <Link to="/" className="absolute top-0 flex justify-center items-center w-[120px] h-[40px] font-bold rounded-full text-white">
                      コース選択
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <LinesFrame wid="300px" hei="75vh" />
          <div className="absolute top-0 flex flex-col items-center justify-between w-[300px] h-full rounded-md overflow-hidden">
            <div className="w-full py-4 text-center text-xl absolute top-3">
              <h1 className="text-white">達成度 77%</h1>
            </div>
            <div>
              <h2 className="text-white mt-14 p-5">覚えてないショートカット 5 / 10</h2>
            </div>
            <div className="w-[90%] rounded-md mb-5 grow overflow-scroll scrollContainer">
              {shortcutsData.map((shortcut: any, index: number) => {
                return (
                  <div key={index} className="relative mb-2">
                    <KranoxButton wid="100%" hei="112px" />
                    <div className="absolute flex flex-col justify-center h-[112px] top-0 p-5 mx-auto rounded-md text-white">
                      <p>{shortcut.shortcut_name}</p>
                      <p>
                        <span>{shortcut.f_key1.key}</span>
                        {shortcut.f_key2 && <span> + {shortcut.f_key2.key}</span>}
                        {shortcut.f_key3 && <span> + {shortcut.f_key3.key}</span>}
                      </p>
                    </div>
                  </div>
                )
              })}
              {/* <div className="p-5 mb-5 mx-auto bg-slate-600 rounded-md text-white">
                <p>ペーストするショートカット</p>
                <p>Command + V</p>
              </div> */}
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

export default Finish;
