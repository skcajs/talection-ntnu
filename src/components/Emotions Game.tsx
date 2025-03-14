import React, { useState, useEffect, useRef } from 'react';

/**
 * Emotions Game in React
 * - 1 minute timer
 * - Start -> Game -> Results flow
 * - If correct, move on (and ensure we pick a different emotion next time if desired)
 * - Score tracking
 */
export default function EmotionsGame() {
  const [phase, setPhase] = useState("start");
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentEmotion, setCurrentEmotion] = useState("");
  const [currentImage, setCurrentImage] = useState("");

  const timerRef = useRef(null);

  // Provided image links
  const emotionImages = {
    "Angry":      ["https://www.talection.com/zone/game/img/emotions/man1_angry1.jpg"],
    "Happy":      ["https://www.talection.com/zone/game/img/emotions/man1_happy1.jpg"],
    "Sad":        ["https://www.talection.com/zone/game/img/emotions/man1_sad1.jpg"],
    "Surprised":  ["https://www.talection.com/zone/game/img/emotions/woman1_surprised1.jpg"]
  };

  function startGame() {
    setCorrect(0);
    setTotal(0);
    setTimeLeft(60);
    setPhase("game");
    pickNewEmotion(/*forceDifferent=*/false);

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function endGame() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    setPhase("end");
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  function pickNewEmotion(forceDifferent) {
    const keys = Object.keys(emotionImages);
    let newEmotion;
    do {
      newEmotion = keys[Math.floor(Math.random() * keys.length)];
    } while(forceDifferent && newEmotion === currentEmotion);

    setCurrentEmotion(newEmotion);
    const arr = emotionImages[newEmotion];
    const idx = Math.floor(Math.random() * arr.length);
    setCurrentImage(arr[idx]);
  }

  function handleAnswer(selected) {
    setTotal(prev => prev + 1);
    if (selected === currentEmotion) {
      setCorrect(prev => prev + 1);
      // Move on to next (different) emotion
      pickNewEmotion(true);
    }
    // If wrong => do not proceed, just increment total
  }

  const progressPercent = 100 * (1 - timeLeft / 60);

  if (phase === "start") {
    // START PAGE
    return (
      <div style={styles.container}>
        <h2>Emotions - Instructions</h2>
        <p>Press the button (Angry, Happy, Sad, or Surprised) that matches the expression shown.</p>
        <p>The game lasts for 1 minute.</p>
        <button onClick={startGame} style={styles.btn}>Start</button>
      </div>
    );
  }

  if (phase === "game") {
    // GAME PAGE
    return (
      <div style={styles.container}>
        <div style={styles.progressBar}>
          <div style={{...styles.progressFill, width: `${progressPercent}%`}} />
        </div>
        <h2>Emotion Recognition</h2>

        <img 
          src={currentImage} 
          alt="emotion" 
          style={styles.image}
        />

        <div style={styles.btnRow}>
          <button onClick={() => handleAnswer('Angry')} style={styles.btn}>Angry</button>
          <button onClick={() => handleAnswer('Happy')} style={styles.btn}>Happy</button>
          <button onClick={() => handleAnswer('Sad')} style={styles.btn}>Sad</button>
          <button onClick={() => handleAnswer('Surprised')} style={styles.btn}>Surprised</button>
        </div>

        <div style={styles.scoreBox}>
          Correct: {correct} | Total: {total}
        </div>
      </div>
    );
  }

  // END PAGE
  return (
    <div style={styles.container}>
      <h2>Game Over!</h2>
      <h3>Your Score</h3>
      <p>You got {correct} correct out of {total} in 1 minute.</p>
      <button onClick={startGame} style={styles.btn}>Retry</button>
      <button style={styles.btn}>Try Another Game</button>
      <button style={styles.btn}>Go Home</button>
    </div>
  );
}

const styles = {
  container: {
    width: '80%',
    margin: '0 auto',
    textAlign: 'center',
    padding: 20
  },
  progressBar: {
    width: '100%',
    backgroundColor: '#e2d3ec',
    height: 20,
    marginBottom: 10,
    position: 'relative'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#9b59b6',
    transition: 'width 0.1s'
  },
  image: {
    width: 300,
    height: 'auto',
    margin: '30px 0',
    border: '2px solid #ccc',
    borderRadius: 5,
    backgroundColor: '#fff'
  },
  btnRow: {
    margin: 20,
    display: 'flex',
    justifyContent: 'center',
    gap: 20,
    flexWrap: 'wrap'
  },
  btn: {
    backgroundColor: '#9b59b6',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    fontSize: '1.2em',
    padding: '10px 25px',
    margin: 5,
    cursor: 'pointer'
  },
  scoreBox: {
    marginTop: 20,
    fontSize: '1.2em',
    fontWeight: 'bold'
  }
};
