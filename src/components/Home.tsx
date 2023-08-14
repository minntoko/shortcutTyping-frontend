import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <header className="flex items-center fixed top-0 w-full h-16">
        <button className="text-white ml-auto mr-5">サインイン</button>
        <button className="text-white mr-10">サインアップ</button>
      </header>
      <main className="flex justify-around items-center w-[100vw] h-[100vh] bg-slate-900">
        <div className="flex flex-col justify-between items-center bg-slate-800 w-[300px] h-[70vh] rounded-md">
          <h2 className="text-white text-xl text-center p-3">覚えてないショートカット</h2>
          <div className="w-[90%] h-auto rounded-md overflow-scroll">
            <div className="w-full p-5 mb-5 mx-auto bg-slate-600 rounded-md text-white">
              <p>コピーするショートカット</p>
              <p>Ctrl + C</p>
            </div>
            <div className="w-full p-5 mb-5 mx-auto bg-slate-600 rounded-md text-white">
              <p>ペーストするショートカット</p>
              <p>Ctrl + V</p>
            </div>
            <div className="w-full p-5 mb-5 mx-auto bg-slate-600 rounded-md text-white">
              <p>カットするショートカット</p>
              <p>Ctrl + X</p>
            </div>
            <div className="w-full p-5 mb-5 mx-auto bg-slate-600 rounded-md text-white">
              <p>前に戻るショートカット</p>
              <p>Ctrl + Z</p>
            </div>
            <div className="w-full p-5 mb-5 mx-auto bg-slate-600 rounded-md text-white">
              <p>保存するショートカット</p>
              <p>Ctrl + S</p>
            </div>
          </div>
          <button className="bg-slate-700 text-white w-[90%] h-12 p-3 my-3 rounded-md">覚えてないショートカット一覧へ</button>
        </div>
        <div className="flex flex-col justify-between h-[70vh]">
          <h1 className="text-white text-2xl text-center">ショートカットタイピング</h1>
          <div className="flex items-center justify-center w-[600px] h-96 bg-slate-800 rounded-md">
            <div className="flex flex-col items-center w-full">
              <h2 className="text-xl text-white -translate-y-5">コース選択</h2>
              <Link to="/game" className="flex justify-center items-center bg-slate-700 hover:bg-slate-600 duration-200 text-white w-1/2 h-12 rounded-md mt-6">Mac編</Link>
              <Link to="/game" className="flex justify-center items-center bg-slate-700 hover:bg-slate-600 duration-200 text-white w-1/2 h-12 rounded-md mt-6">Windows編</Link>
              <Link to="/game" className="flex justify-center items-center bg-slate-700 hover:bg-slate-600 duration-200 text-white w-1/2 h-12 rounded-md mt-6">Linux編</Link>
            </div>
          </div>
          <p className="text-white text-center">コースを選択してプレイ</p>
        </div>
        <div className="bg-slate-800 w-[300px] h-[70vh] rounded-md">
          <h1 className="text-white text-2xl text-center p-3">到達度</h1>
          <div className="overflow-scroll mt-6">
            <div className="w-[90%] mb-9 mx-auto rounded-md overflow-hidden bg-slate-600">
              <div className="flex justify-between">
                <p className="text-white p-4">全体</p>
                <p className="text-white p-4">70%</p>
              </div>
              <div className="bg-red-100 w-full h-4">
                <div className="bg-red-500 w-[70%] h-full text-center leading-[16px]"></div>
              </div>
            </div>
            <div className="w-[90%] mb-9 mx-auto rounded-md overflow-hidden bg-slate-600">
              <div className="flex justify-between">
                <p className="text-white p-4">Mac編</p>
                <p className="text-white p-4">80%</p>
              </div>
              <div className="bg-blue-100 w-full h-4">
                <div className="bg-blue-500 w-[80%] h-full text-center leading-[16px]"></div>
              </div>
            </div>
            <div className="w-[90%] mb-9 mx-auto rounded-md overflow-hidden bg-slate-600">
              <div className="flex justify-between">
                <p className="text-white p-4">Windows編</p>
                <p className="text-white p-4">71%</p>
              </div>
              <div className="bg-green-100 w-full h-4">
                <div className="bg-green-500 w-[71%] h-full text-center leading-[16px]"></div>
              </div>
            </div>
            <div className="w-[90%] mb-9 mx-auto rounded-md overflow-hidden bg-slate-600">
              <div className="flex justify-between">
                <p className="text-white p-4">Linux編</p>
                <p className="text-white p-4">60%</p>
              </div>
              <div className="bg-yellow-100 w-full h-4">
                <div className="bg-yellow-500 w-[60%] h-full text-center leading-[16px]"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex items-center justify-center fixed bottom-0 w-full h-16">
        <small className="text-slate-300">&copy; 2023 daipan-shortcut. All Rights Reserved</small>
      </footer>
    </>
  );
};

export default Home;
