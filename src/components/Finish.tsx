// Todo_問題一覧とゲームから取得した覚えてないショートカットと一致したものを表示させる
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import BGDots from "./layouts/BGDots";
import { useEffect, useState } from "react";
import CornersFrame from "./layouts/CornersFrame";
import LinesFrame from "./layouts/LinesFrame";
import KranoxButton from "./buttons/KranoxButton";
import OctagonFrame from "./layouts/OctagonFrame";
import { loginState, userIdState } from "../state/atoms/userLoginAtom";
import { useRecoilState } from "recoil";

interface State {
  solved: { current: number[] };
  notSolved: { current: number[] };
  typoCount: { current: number };
  os: string;
}

enum OS {
  Windows = 1,
  Mac = 2,
  Linux = 3
}

const Finish = () => {
  const location = useLocation();
  const { solved, notSolved, typoCount, os } = location.state;
  const [isLogin, _setIsLogin] = useRecoilState(loginState);
  const [shortcutsData, setShortcutsData] = useState([]) as any[];
  const [userId, _setUserId] = useRecoilState(userIdState);

  const fetchData = async () => {
    try {
      if (notSolved.current.length === 0) {
        return;
      }
      const response = await fetch(
        `https://shortcutgame.kumaa9.dev/api/shortcutdetail/${notSolved.current.join(
          "/"
        )}/`
      );
      const jsonData = await response.json();
      setShortcutsData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const successFunc = async () => {
    try {
      const result = await fetch(
        "https://shortcutgame.kumaa9.dev/api/success/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            f_user: userId,
            f_os: OS[os],
            shortcuts: solved.current,
          }),
        }
      );
      // ステータスコードが201の時に成功のメッセージを表示
      if (result.status === 201) {
        const data = await result.json();
      }
      // ステータスコード400の時に失敗のメッセージを表示
      if (result.status === 400) {
        console.log("通信に失敗しました");
      }
    } catch (error) {
      console.log("通信に失敗しました");
    }
  };

  const rememberFunc = async () => {
    try {
      const result = await fetch(
        "https://shortcutgame.kumaa9.dev/api/remember/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            f_user: userId,
            f_os: OS[os],
            shortcuts: notSolved.current,
          }),
        }
      );
      // ステータスコードが201の時に成功のメッセージを表示
      if (result.status === 201) {
        const data = await result.json();
      }
      // ステータスコード400の時に失敗のメッセージを表示
      if (result.status === 400) {
        console.log("通信に失敗しました");
      }
    } catch (error) {
      console.log("通信に失敗しました");
    }
  };

  useEffect(() => {
    isLogin && (
      successFunc(),
      rememberFunc()
    )
  }, [location.state]);

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
              <Link
                to="/"
                className="text-xl text-white hover:bg-slate-400/20 px-6 py-3 my-1 duration-200 rounded-lg"
              >
                ホーム
              </Link>
              <Link
                to="/game"
                state={{ cource: "Mac" }}
                className="text-xl text-white hover:bg-slate-400/20 px-6 py-3 my-1 duration-200 rounded-lg"
              >
                Mac編
              </Link>
              <Link
                to="/game"
                className="text-xl text-white hover:bg-slate-400/20 px-6 py-3 my-1 duration-200 rounded-lg"
              >
                Windows編
              </Link>
              <Link
                to="/game"
                state={{ cource: "Windows" }}
                className="text-xl text-white hover:bg-slate-400/20 px-6 py-3 my-1 duration-200 rounded-lg"
              >
                Linux編
              </Link>
              <Link
                to="/learnList"
                state={{ cource: "Linux" }}
                className="text-xl text-white hover:bg-slate-400/20 px-6 py-3 my-1 duration-200 rounded-lg"
              >
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
                  <p className="text-lg font-bold text-center text-white">
                    正答数：{solved.current.length}
                  </p>
                  <p className="mt-3 text-lg font-bold text-center text-white">
                    入力ミス：{typoCount.current}
                  </p>
                </div>
                <div className="mt-8 flex justify-evenly w-full">
                  <div className="relative">
                    <OctagonFrame hovered={false} wid="120px" hei="40px" />
                    <Link
                      to="/game"
                      state={{ cource: os }}
                      className="absolute top-0 flex justify-center items-center w-[120px] h-[40px] font-bold rounded-full text-white"
                    >
                      もう一度
                    </Link>
                  </div>
                  <div className="relative">
                    <OctagonFrame hovered={false} wid="120px" hei="40px" />
                    <Link
                      to="/"
                      className="absolute top-0 flex justify-center items-center w-[120px] h-[40px] font-bold rounded-full text-white"
                    >
                      コース選択
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <LinesFrame wid="300px" hei="70vh" />
          <div className="absolute top-0 flex flex-col items-center justify-between w-[300px] h-full rounded-md overflow-hidden">
            <div>
              <h2 className="text-white p-5">
                覚えてないショートカット {notSolved.current.length} / 10
              </h2>
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
                        {shortcut.f_key2 && (
                          <span> + {shortcut.f_key2.key}</span>
                        )}
                        {shortcut.f_key3 && (
                          <span> + {shortcut.f_key3.key}</span>
                        )}
                      </p>
                    </div>
                  </div>
                );
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
