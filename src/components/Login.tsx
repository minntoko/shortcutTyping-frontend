import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loginState, loginToken, userIdState } from "../state/atoms/userLoginAtom";
import BGDots from "./layouts/BGDots";
import CornersFrame from "./layouts/CornersFrame";
import OctagonFrame from "./layouts/OctagonFrame";
import jwt_decode from "jwt-decode";

interface Jwt {
  random_string: string;
  userid: string;
}

const Login = () => {
  const setIsLgoin = useSetRecoilState(loginState);
  const [_token, setToken] = useRecoilState(loginToken);
  const [_userId, setUserId] = useRecoilState(userIdState);
  const [emailValue, setEmailValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const navigate = useNavigate();
  
  const longinFunc = async () => {
    try {
      const formParams = new URLSearchParams();
      formParams.append("email", emailValue);
      formParams.append("password", passValue);
      const result = await fetch(
        "https://shortcutgame.kumaa9.dev/api/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formParams
        }
      );

      // ステータスコードが200の時に成功のメッセージを表示
      if (result.status === 200) {
        const data = await result.json();
        setToken(data.token);
        setIsLgoin(true);
        navigate("/");
        try {
          const decoded: Jwt = jwt_decode(data.token);
          setUserId(decoded.userid);
        } catch (error) {
          console.log("トークンがありません。");
        }
        return;
      }

      // ステータスコードが200以外のときに失敗のメッセージを表示
      if (result.status !== 200) {
        setPassValue("");
        window.alert("ログインに失敗しました");
      }
    } catch (error) {
      window.alert("ログインに失敗しました");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    longinFunc();
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
      <main className="flex justify-around items-center w-[100vw] h-[100vh]">
        <div className="flex flex-col justify-center h-[70vh]">
          <div className="relative">
            <CornersFrame wid="600px" hei="400px" />
            <div className="absolute top-0 flex flex-col items-center justify-evenly w-[600px] h-[400px] rounded-md">
              <div className="relative">
                <OctagonFrame hovered={false} wid="270px" hei="44px" />
                <h2 className="absolute flex items-center justify-center top-0 text-2xl text-center text-white w-[270px] h-[44px]">
                  ログイン
                </h2>
              </div>
              <p className="text-white text-sm text-start">
                登録したメールアドレスとパスワードを入力してください
              </p>
              <form
                onSubmit={(e) => handleSubmit(e)}
                className="flex flex-col justify-center items-start w-[300px]"
              >
                <input
                  type="email"
                  className="w-[300px] h-10 mb-6 px-2 outline-none rounded-md"
                  placeholder="メールアドレス"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                />
                <input
                  type="password"
                  className="w-[300px] h-10 mb-8 px-2 outline-none rounded-md"
                  placeholder="パスワード"
                  value={passValue}
                  onChange={(e) => setPassValue(e.target.value)}
                />
                <button className="w-[100px] h-10 px-2 outline-none rounded-md bg-blue-500 text-white">
                  ログイン
                </button>
              </form>
              <Link to="/signup">
                <p className="text-white text-sm">
                  アカウントをお持ちでない方はこちら
                </p>
              </Link>
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

export default Login;
