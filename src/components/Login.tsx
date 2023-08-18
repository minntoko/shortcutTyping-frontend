import { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil';
import { loginState } from '../state/atoms/userLoginAtom';
import BGDots from './layouts/BGDots';

const Login = () => {
  const setIsLgoin = useSetRecoilState(loginState);
  const navigate = useNavigate();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLgoin(true);
    navigate('/');
  }
  return (
    <>
      <BGDots />
      <header className="fixed top-0 flex justify-between items-center w-[100vw] h-[10vh] p-4">
        <Link to="/">
          <h1 className="text-xl font-bold text-white">ショートカットタイピング</h1>
        </Link>
      </header>
      <main className="flex justify-around items-center w-[100vw] h-[100vh]">
        <div className="flex flex-col justify-center h-[70vh]">
          <div className="flex flex-col items-center justify-evenly w-[600px] h-96 bg-slate-800 rounded-md">
            <p className="text-white text-sm text-start">登録したメールアドレスとパスワードを入力してください</p>
            <form onSubmit={(e) => handleSubmit(e)}  className="flex flex-col justify-center items-start w-[300px]">
              <input type='email' className="w-[300px] h-10 mb-6 px-2 outline-none rounded-md" placeholder="メールアドレス" />
              <input type='password' className="w-[300px] h-10 mb-8 px-2 outline-none rounded-md" placeholder="パスワード" />
              <button className="w-[100px] h-10 px-2 outline-none rounded-md bg-blue-500 text-white">ログイン</button>
            </form>
            <Link to="/signup">
              <p className="text-white text-sm">アカウントをお持ちでない方はこちら</p>
            </Link>
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

export default Login