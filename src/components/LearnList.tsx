import { Link } from "react-router-dom"
import BGDots from "./layouts/BGDots"

const LearnList = () => {
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
          <div className="flex flex-col w-[26%] h-[70vh] bg-slate-800 rounded-md">
            <div className="mb-5 mx-4 bg-slate-700 mt-4">
              <div className="flex justify-between border-l-8 border-blue-500">
                <p className="text-white p-4">Mac編</p>
                <p className="text-white p-4">6 / 30</p>
              </div>
            </div>
            <div className="overflow-scroll rounded-md w-[90%] mx-auto">
              <div className="w-[100%] p-5 mb-5 mx-auto bg-slate-600 rounded-md text-white">
                  <p>コピーするショートカット</p>
                  <p>Command + C</p>
              </div>
              <div className="w-full p-5 mb-5 mx-auto bg-slate-600 rounded-md text-white">
                  <p>ペーストするショートカット</p>
                  <p>Command + V</p>
              </div>
              <div className="w-full p-5 mb-5 mx-auto bg-slate-600 rounded-md text-white">
                  <p>カットするショートカット</p>
                  <p>Command + X</p>
              </div>
              <div className="w-full p-5 mb-5 mx-auto bg-slate-600 rounded-md text-white">
                  <p>全選択するショートカット</p>
                  <p>Command + A</p>
              </div>
              <div className="w-full p-5 mb-5 mx-auto bg-slate-600 rounded-md text-white">
                  <p>保存するショートカット</p>
                  <p>Command + S</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-[26%] h-[70vh] bg-slate-800 rounded-md">
            <div className="mb-5 mx-4 bg-slate-700 mt-4">
              <div className="flex justify-between border-l-8 border-green-500">
                <p className="text-white p-4">Windows編</p>
                <p className="text-white p-4">8 / 27</p>
              </div>
            </div>
            <div className="overflow-scroll rounded-md w-[90%] mx-auto">
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
                  <p>全選択するショートカット</p>
                  <p>Ctrl + A</p>
              </div>
              <div className="w-full p-5 mb-5 mx-auto bg-slate-600 rounded-md text-white">
                  <p>保存するショートカット</p>
                  <p>Ctrl + S</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-[26%] h-[70vh] bg-slate-800 rounded-md">
            <div className="mb-5 mx-4 bg-slate-700 mt-4">
              <div className="flex justify-between border-l-8 border-yellow-500">
                <p className="text-white p-4">Linux編</p>
                <p className="text-white p-4">18 / 43</p>
              </div>
            </div>
            <div className="overflow-scroll rounded-md w-[90%] mx-auto">
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
                  <p>全選択するショートカット</p>
                  <p>Ctrl + A</p>
              </div>
              <div className="w-full p-5 mb-5 mx-auto bg-slate-600 rounded-md text-white">
                  <p>保存するショートカット</p>
                  <p>Ctrl + S</p>
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