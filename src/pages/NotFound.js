import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

function NotFound() {

    const [timer,setTimer]  = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const customInterval = setInterval(() =>{
            if (timer === 0) {
                navigate('/');
            }
            setTimer(timer - 1);
        },1000)
        return () => {
            clearInterval(customInterval);
        }
    },[timer]);

  return (
    <div>
      sayfa bulunumadı 404 not found 
      <h1>{timer} saniye sonra anasayfaya gideceksiniz</h1>
    </div>
  )
}

export default NotFound
