import { useState, useEffect } from 'react';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
  // 25 minutos em segundos, para irmos reduzindo o countdown a cada segundo
  const [time, setTime] = useState(25 * 60);

  // Vai definir se o countdown está ativo ou parado
  const [active, setActive] = useState(false); 

  // Vamos calcular os minutos, mas sem o floor só funcionaria com minutos perfeitos, o floor
  // arrendonda pra baixo.
  const minutes = Math.floor(time / 60);
  
  // Pegando o resto da divisão
  const seconds = time % 60;

  // o padStart vai verificar se a nossa string não tiver 2 caracteres, ele vai preencher o restante para a esquerda com o 0
  // o split vai dividir o 25 em 2 e 5
  const [ minuteLeft, minuteRight ] = String(minutes).padStart(2, '0').split('');
  const [ secondLeft, secondRight ] = String(seconds).padStart(2, '0').split('');


  function startCountdown() {
    setActive(true);

  }

  useEffect(() => {
    if (active && time > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
  }, [active, time])
  
  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      <button 
      type="button" 
      className={styles.countdownButton}
      onClick={startCountdown}
      >
        Iniciar um ciclo
      </button>
    </div>
  );
}