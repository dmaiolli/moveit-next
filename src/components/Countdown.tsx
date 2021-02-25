import { useState, useEffect } from 'react';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
  // 25 minutos em segundos, para irmos reduzindo o countdown a cada segundo
  const [time, setTime] = useState(0.1 * 60);

  // Vai definir se o countdown está ativo ou parado
  const [isActive, setIsActive] = useState(false); 

  // Definir se o countdown ja finalizou
  const [hasFinished, setHasFinished] = useState(false)

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
    setIsActive(true);
  }

  function resetCountdown() {
    // Usado para evitar que a função dispare mais uma vez, pois ela demora 1 segundo para executar
    clearTimeout(countdownTimeout);
    setIsActive(false);

    setTime(25 * 60);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
      // Caso o countdown chegue a 0
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
    }
  }, [isActive, time])
  
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

      {/* Se o countdown chegou a 0, mostrar ciclo encerrado
            Se não chegou a 0 e ainda está ativo, mostrar abandonar ciclo
            Se não chegou a 0 e não está ativo, mostrar iniciar ciclo */}
      { hasFinished ?  (
        <button 
          disabled
          type="button" 
          className={styles.countdownButton}
        >
          Ciclo encerrado
        </button>
      ) : (
        <>
        { isActive ? (
          <button 
            type="button" 
            className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
            onClick={resetCountdown}
          >
            Abandonar ciclo
          </button>

      ) : (

          <button 
            type="button" 
            className={styles.countdownButton}
            onClick={startCountdown}
          >
            Iniciar um ciclo
          </button>
      )}
        </>
      )}

    



    </div>
  );
}