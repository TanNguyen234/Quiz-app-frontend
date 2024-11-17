import './App.css';
import AllRoutes from './components/Allroutes';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';

import { useDispatch } from 'react-redux';
import { autoLogin } from './actions/user';
import { getCookie } from './helpers/cookie';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

function App() {
  const dispatch = useDispatch()
  const token = getCookie('token');

  if(token) {
   dispatch(autoLogin(token));
  }

  return (
    <>
      <AllRoutes />
    </>
  );
}

export default App;