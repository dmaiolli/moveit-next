import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
  
  const { 
    minutes, 
    seconds, 
    hasFinished, 
    isActive, 
    resetCountdown, 
    startCountdown 
  } = useContext(CountdownContext)

  // o padStart vai verificar se a nossa string não tiver 2 caracteres, ele vai preencher o restante para a esquerda com o 0
  // o split vai dividir o 25 em 2 e 5
  const [ minuteLeft, minuteRight ] = String(minutes).padStart(2, '0').split('');
  const [ secondLeft, secondRight ] = String(seconds).padStart(2, '0').split('');


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