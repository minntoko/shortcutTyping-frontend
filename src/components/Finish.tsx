import { Link } from "react-router-dom";
import BGDots from "./layouts/BGDots";
import { useEffect } from "react";

const Finish = () => {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://shortcutgame.kumaa9.dev/api/shortcut/');
      const jsonData = await response.json();
      console.log(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
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
        <div className="flex flex-col w-[280px] max-h-[455px] h-[60%] bg-slate-800 rounded-md overflow-hidden">
          <div className="bg-blue-500 w-full py-4 text-center text-xl">
            <h1 className="text-white">リンク</h1>
          </div>
          <div className="flex flex-col justify-evenly items-center py-4 grow">
            <Link to="/" className="text-xl text-white hover:bg-slate-400/50 px-6 py-3 my-1 duration-200 rounded-full">
              ホーム
            </Link>
            <Link to="/game" className="text-xl text-white hover:bg-slate-400/50 px-6 py-3 my-1 duration-200 rounded-full">
              Mac編
            </Link>
            <Link to="/game" className="text-xl text-white hover:bg-slate-400/50 px-6 py-3 my-1 duration-200 rounded-full">
              Windows編
            </Link>
            <Link to="/game" className="text-xl text-white hover:bg-slate-400/50 px-6 py-3 my-1 duration-200 rounded-full">
              Linux編
            </Link>
            <Link to="/learnList" className="text-xl text-white hover:bg-slate-400/50 px-6 py-3 my-1 duration-200 rounded-full">
              覚えてないリスト
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-[550px] h-96 bg-slate-800 rounded-md overflow-hidden relative">
          <div className="bg-blue-500 w-full py-4 text-center text-xl absolute top-0">
            <h1 className="text-white">結果発表</h1>
          </div>
          <div className="bg-slate-200 p-10 mt-14 rounded-sm">
            <div>
              <p className="mb-3 text-lg font-bold">入力ミス：20</p>
              <p className="text-lg font-bold">達成度：2% UP</p>
            </div>
            <div className="mt-10">
              <Link to="/game" className="bg-blue-500 font-bold px-4 py-2 mx-4 rounded-full text-white">
                もう一度
              </Link>
              <Link to="/" className="bg-red-500 font-bold px-4 py-2 mx-4 rounded-full text-white">
                コース選択
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between w-[300px] h-[80%] bg-slate-800 rounded-md overflow-hidden relative">
          <div className="bg-blue-500 w-full py-4 text-center text-xl absolute top-0">
            <h1 className="text-white">達成度 77%</h1>
          </div>
          <div>
            <h2 className="text-white mt-14 p-5">覚えてないショートカット</h2>
          </div>
          <div className="w-[90%] rounded-md mb-5 grow overflow-scroll">
            <div className="p-5 mb-5 mx-auto bg-slate-600 rounded-md text-white">
              <p>コピーするショートカット</p>
              <p>Command + C</p>
            </div>
            <div className="p-5 mb-5 mx-auto bg-slate-600 rounded-md text-white">
              <p>ペーストするショートカット</p>
              <p>Command + V</p>
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
