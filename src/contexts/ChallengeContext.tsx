import { createContext, ReactNode, useState } from 'react';
import challenges from '../../challenges.json';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  experienceToNextLevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  finishedChallenge: () => void;
}

interface ChallengesProviderProps {
  // React node aceita qualquer tipo, seja ele um componente, tag HTML...
  children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {

  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  function levelUp() {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    
    setActiveChallenge(challenge);
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function finishedChallenge() {
    setChallengesCompleted(challengesCompleted + 1)
    setActiveChallenge(null)
  }

  return (
    // Todos os elementos dentro do provider, vai ter acesso aos dados de dentro do contexto
    <ChallengesContext.Provider 
      value={{ 
          level, 
          currentExperience, 
          challengesCompleted, 
          levelUp,
          startNewChallenge,
          activeChallenge,
          resetChallenge,
          experienceToNextLevel,
          finishedChallenge }}
      >
      {children}
    </ChallengesContext.Provider>
  );
}