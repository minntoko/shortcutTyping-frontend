import { Link } from "react-router-dom"
import BGDots from "./layouts/BGDots"
import { useEffect, useState } from "react";
import { userIdState } from "../state/atoms/userLoginAtom";
import { useRecoilState } from "recoil";
import KranoxButton from "./buttons/KranoxButton";
import LinesFrame from "./layouts/LinesFrame";
import OctagonFrame from "./layouts/OctagonFrame";

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

const LearnList = () => {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const [arrivalData, setArrivalData] = useState<Arrival>(defaultArrival);
  const [userId, _setUserId] = useRecoilState(userIdState);
  const [macShortcuts, setMacShortcuts] = useState([]);
  const [windowsShortcuts, setWindowsShortcuts] = useState([]);
  const [linuxShortcuts, setLinuxShortcuts] = useState([]);
  const fetchRemember = async () => {
    try {
      const macResponse = await fetch(`${baseUrl}remember/${userId}/Mac/`);
      const windowsResponse = await fetch(`${baseUrl}remember/${userId}/Windows/`);
      const linuxResponse = await fetch(`${baseUrl}remember/${userId}/Linux/`);
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

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${baseUrl}arrival/${userId}/`
      );
      const jsonData = await response.json();
      
      setArrivalData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    fetchRemember();
  }, []);
  return (
    <>
      <BGDots />
      <header className="fixed top-0 flex justify-between items-center w-[100vw] h-[10vh] p-4">
        <Link to="/">
          <h1 className="text-xl font-bold text-white">ショートカットタイピング</h1>
        </Link>
      </header>
      <main className="flex flex-col justify-center items-center w-[100vw] h-[100vh]">
        <h2 className="text-2xl font-bold text-white mb-10">覚えてないショートカットのリスト</h2>
        <div className="flex justify-evenly items-center w-full">
          <div className="relative w-[25vw]">
            <LinesFrame wid="25vw" hei="70vh" />
            <div className="absolute top-0 flex flex-col w-full h-[70vh] rounded-md z-0">
              <div className="relative mb-5 mx-4 mt-4">
                <OctagonFrame wid="100%" hei="56px" hovered={false} />
                <div className="absolute top-0 w-full px-4">
                  <div className="flex justify-between">
                    <p className="text-white p-4">Mac編</p>
                    <p className="text-white p-4">{arrivalData.missanswer.Mac == null ? 0 : arrivalData.missanswer.Mac} / {arrivalData.question.Mac}</p>
                  </div>
                </div>
              </div>
              <div className="overflow-scroll rounded-md w-[90%] mx-auto scrollContainer">
                {macShortcuts.map((shortcut: any, index: number) => {
                  return (
                    <div key={index} className="relative mb-4">
                      <KranoxButton wid="100%" hei="112px" />
                      <div className="absolute flex flex-col justify-center top-0 w-full h-[112px] text-center p-5 rounded-md text-white">
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
                {macShortcuts.length === 0 && <p className="text-white text-center mt-[50%]">覚えてないショートカットはありません</p>}
              </div>
            </div>
          </div>
          <div className="relative w-[25vw]">
            <LinesFrame wid="25vw" hei="70vh" />
            <div className="absolute top-0 flex flex-col w-full h-[70vh] rounded-md z-0">
              <div className="relative mb-5 mx-4 mt-4">
                <OctagonFrame wid="100%" hei="56px" hovered={false} />
                <div className="absolute top-0 w-full px-4">
                  <div className="flex justify-between">
                    <p className="text-white p-4">Windows編</p>
                    <p className="text-white p-4">{arrivalData.missanswer.Windows == null ? 0 : arrivalData.missanswer.Windows} / {arrivalData.question.Windows}</p>
                  </div>
                </div>
              </div>
              <div className="overflow-scroll rounded-md w-[90%] mx-auto scrollContainer">
                {windowsShortcuts.map((shortcut: any, index: number) => {
                  return (
                    <div key={index} className="relative mb-4">
                      <KranoxButton wid="100%" hei="112px" />
                      <div className="absolute flex flex-col justify-center top-0 w-full h-[112px] text-center p-5 rounded-md text-white">
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
              {windowsShortcuts.length === 0 && <p className="text-white text-center mt-[50%]">覚えてないショートカットはありません</p>}
              </div>
            </div>
          </div>
          <div className="relative w-[25vw]">
            <LinesFrame wid="25vw" hei="70vh" />
            <div className="absolute top-0 flex flex-col w-full h-[70vh] rounded-md z-0">
              <div className="relative mb-5 mx-4 mt-4">
                <OctagonFrame wid="100%" hei="56px" hovered={false} />
                <div className="absolute top-0 w-full px-4">
                  <div className="flex justify-between">
                    <p className="text-white p-4">Linux編</p>
                    <p className="text-white p-4">{arrivalData.missanswer.Linux == null ? 0 : arrivalData.missanswer.Linux} / {arrivalData.question.Linux}</p>
                  </div>
                </div>
              </div>
              <div className="overflow-scroll rounded-md w-[90%] mx-auto scrollContainer">
                {linuxShortcuts.map((shortcut: any, index: number) => {
                  return (
                    <div key={index} className="relative mb-4">
                      <KranoxButton wid="100%" hei="112px" />
                      <div className="absolute flex flex-col justify-center top-0 w-full h-[112px] text-center p-5 rounded-md text-white">
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
                {linuxShortcuts.length === 0 && <p className="text-white text-center mt-[50%]">覚えてないショートカットはありません</p>}
              </div>
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
  )
}

export default LearnList