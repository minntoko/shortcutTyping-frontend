import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState } from "../state/atoms/userLoginAtom";

const Home = () => {
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const progress = 70;
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (progress / 100) * circumference;
  return (
    <>
      <header className="flex items-center fixed top-0 w-full h-16">
        {isLogin ? (
          <button className="text-white ml-auto mr-10" onClick={() => setIsLogin(false)}>ログアウト</button>
        ) : (
          <Link to="/login" className="text-white ml-auto mr-10">
            ログイン
          </Link>
        )}
      </header>
      <main className="flex justify-around items-center w-[100vw] h-[100vh] bg-slate-900">
        <div className="flex flex-col justify-between items-center bg-slate-800 w-[300px] h-[70vh] rounded-md relative">
          <h2 className="text-white text-xl text-center p-3">
            覚えてないショートカット
          </h2>
          <div className="w-[90%] h-auto rounded-md overflow-scroll">
            {isLogin ? (
              <>
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
              </>
            ) : (
              <div className="text-white text-center text-xs w-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                ログインしたら表示されます
              </div>
            )}
          </div>
          {isLogin && (
            <button className="bg-slate-700 text-white w-[90%] h-12 p-3 my-3 rounded-md">
              覚えてないショートカット一覧へ
            </button>
          )}
        </div>
        <div className="flex flex-col justify-between h-[70vh]">
          <h1 className="text-white text-2xl text-center">
            ショートカットタイピング
          </h1>
          <div className="flex items-center justify-center w-[600px] h-96 bg-slate-800 rounded-md">
            <div className="flex flex-col items-center w-full">
              <h2 className="text-xl text-white -translate-y-5">コース選択</h2>
              <Link
                to="/game"
                className="flex justify-center items-center bg-slate-700 hover:bg-slate-600 duration-200 text-white w-1/2 h-12 rounded-md mt-6"
              >
                Mac編
              </Link>
              <Link
                to="/game"
                className="flex justify-center items-center bg-slate-700 hover:bg-slate-600 duration-200 text-white w-1/2 h-12 rounded-md mt-6"
              >
                Windows編
              </Link>
              <Link
                to="/game"
                className="flex justify-center items-center bg-slate-700 hover:bg-slate-600 duration-200 text-white w-1/2 h-12 rounded-md mt-6"
              >
                Linux編
              </Link>
            </div>
          </div>
          <p className="text-white text-center">コースを選択してプレイ</p>
        </div>
        <div className="flex flex-col justify-between items-center bg-slate-800 w-[300px] h-[70vh] rounded-md relative">
          <h1 className="text-white text-2xl text-center p-3">到達率</h1>
          <div className="overflow-scroll w-full">
            {isLogin ? (
              <>
                <div className="w-[90%] h-[188px] mb-5 mx-auto rounded-md overflow-hidden p-4 bg-slate-600 relative">
                  <svg className="w-full h-full fill-transparent rotate-[-90deg]">
                    <circle
                      className="stroke-sky-100"
                      cx="119"
                      cy="78"
                      r="70"
                      strokeWidth="12"
                      fill="transparent"
                      strokeDasharray={circumference}
                      strokeDashoffset={0}
                      strokeLinecap="round"
                    />
                    <circle
                      className="stroke-sky-500"
                      cx="119"
                      cy="78"
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
                <div className="w-[90%] mb-5 mx-auto rounded-md overflow-hidden bg-slate-600">
                  <div className="flex justify-between">
                    <p className="text-white p-4">Mac編</p>
                    <p className="text-white p-4">80%</p>
                  </div>
                  <div className="bg-red-100 w-full h-3">
                    <div className="bg-red-500 w-[80%] h-full text-center leading-[12px]"></div>
                  </div>
                </div>
                <div className="w-[90%] mb-5 mx-auto rounded-md overflow-hidden bg-slate-600">
                  <div className="flex justify-between">
                    <p className="text-white p-4">Windows編</p>
                    <p className="text-white p-4">71%</p>
                  </div>
                  <div className="bg-green-100 w-full h-3">
                    <div className="bg-green-500 w-[71%] h-full text-center leading-[12px]"></div>
                  </div>
                </div>
                <div className="w-[90%] mb-5 mx-auto rounded-md overflow-hidden bg-slate-600">
                  <div className="flex justify-between">
                    <p className="text-white p-4">Linux編</p>
                    <p className="text-white p-4">60%</p>
                  </div>
                  <div className="bg-yellow-100 w-full h-3">
                    <div className="bg-yellow-500 w-[60%] h-full text-center leading-[12px]"></div>
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
