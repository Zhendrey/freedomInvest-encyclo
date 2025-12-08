import '../css/style.css';
import { useUserInfo } from '../context/UserProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRef } from 'react';

export default function Login() {
  const [user,setUser] = useUserInfo();
  const navigate = useNavigate();
  const location = useLocation();
  const name = useRef(null);
  const password = useRef(null);
  const email = useRef(null);
  const inputFields = [name,password,email];

  function handleSubmit(e){
    e.preventDefault();
    const isAllFilled = inputFields.every(({current})=>current.value);
    console.log(isAllFilled);
    if(isAllFilled) {
      setUser({
          name: name.current.value,
          password: password.current.value,
          email: email.current.value,
        })
      navigate('/stocks', {state: {from: location.pathname}, replace: true})
    }
  }

  return (
    <main className="login page">
      <div className='page__container'>
        <h1 className='h1'>Login into your account</h1>
        <form onSubmit={(e)=>handleSubmit(e)} className="login__form form">
          <div className="form__input">
            <label className='h3' htmlFor="name">Your name</label>
            <input className='p' ref={name} type="text" value={user?.name} placeholder='e.g. Mary Sue' name="name" id="name" />
          </div>
          <div className="form__input">
            <label className='h3' htmlFor="name">Your password</label>
            <input className='p' ref={password} type="password" value={user?.password} placeholder='at least 6 digits' minLength={6} name="password" id="password" />
          </div>
          <div className="form__input">
            <label className='h3' htmlFor="email">Your email</label>
            <input className="p" ref={email} type="email" value={user?.email} placeholder='mary.sue@gmail.com' name="email" id="email" />
          </div>
          <button className='button p' type="submit">Login</button>
        </form>
      </div>
    </main>
  );
}
