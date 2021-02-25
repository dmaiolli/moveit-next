import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
  const { level } = useContext(ChallengesContext);
  
  return (
    <div className={styles.profileContainer}>
      <img src="https://avatars.githubusercontent.com/u/69089729?s=460&u=cc306cce7dfffcdb91853bb23f49ee95996adb85&v=4" alt="Diego fernandes"/>
      <div>
        <strong>Denys Maiolli</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level { level }
        </p>
      </div>
    </div>
  );
}