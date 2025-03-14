import React, { useState, useEffect, useRef } from 'react';

/**
 * True Color Game in React.
 * 
 * - 1 minute timer
 * - Start -> Game -> Results flow
 * - 50% chance "Yes" condition (meaning == color) vs "No"
 * - Score tracking
 */
export default function TrueColorGame() {
  // ------------------ State ------------------
  const [phase, setPhase] = useState("start"); 
  // "start", "game", or "end"

  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  // For the top word
  const [topMeaning, setTopMeaning] = useState("");
  const [topColor, setTopColor] = useState("");
  // For the bottom word
  const [bottomMeaning, setBottomMeaning] = useState("");
  const [bottomColor, setBottomColor] = useState("");

  const timerRef = useRef(null);

  const words = ["RED","BLUE","GREEN","ORANGE","YELLOW","PURPLE","BLACK","WHITE"];
  const colors = ["red","blue","green","orange","yellow","purple","black","white","gray"];

  // ------------------ Start the Game ------------------
  function startGame() {
    setCorrect(0);
    setTotal(0);
    setTimeLeft(60);
    pickNewWords();
    setPhase("game");

    // Clear any previous interval
    if (timerRef.current) clearInterval(timerRef.current);

    // 1-second interval
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // time up
          clearInterval(timerRef.current);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  // ------------------ End the Game ------------------
  function endGame() {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    setPhase("end");
  }

  // Cleanup if component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // ------------------ Pick New Words ------------------
  function pickNewWords() {
    const doMatch = Math.random() < 0.5;

    // top
    const tm = words[Math.floor(Math.random() * words.length)];
    const tc = colors[Math.floor(Math.random() * colors.length)];
    setTopMeaning(tm);
    setTopColor(tc);

    // bottom
    let bc;
    if (doMatch) {
      bc = tm.toLowerCase();
    } else {
      // pick color not matching top meaning
      let tmp;
      do {
        tmp = colors[Math.floor(Math.random() * colors.length)];
      } while (tmp === tm.toLowerCase());
      bc = tmp;
    }
    const bm = words[Math.floor(Math.random() * words.length)];
    setBottomMeaning(bm);
    setBottomColor(bc);
  }

  // ------------------ Handle Yes/No ------------------
  function handleAnswer(userSaidYes) {
    setTotal(prev => prev + 1);

    // check if topMeaning.toLowerCase() == bottomColor
    const isMatch = (topMeaning.toLowerCase() === bottomColor);

    if (userSaidYes === isMatch) {
      setCorrect(prev => prev + 1);
    }
    pickNewWords();
  }

  // ------------------ Render ------------------
  const progressPercent = 100 * (1 - timeLeft / 60); 

  if (phase === "start") {
    // START PAGE
    return (
      <div style={styles.container}>
        <h2>True Color - Instructions</h2>
        <p>Press "Yes" if the meaning (top word) and the ink color (bottom word) are the same; otherwise press "No".</p>
        <p>The game lasts for 1 minute.</p>
        <button onClick={startGame}>Start</button>
      </div>
    );
  }

  if (phase === "game") {
    // GAME PAGE
    return (
      <div style={styles.container}>
        <div style={{...styles.progressBarWrapper}}>
          <div style={{
            ...styles.progressBarFill, 
            width: `${progressPercent}%`
          }} />
        </div>

        <h2>True Color</h2>
        
        <div style={{...styles.wordBox, color: topColor}}>
          {topMeaning}
        </div>
        <div style={{...styles.wordBox, color: bottomColor}}>
          {bottomMeaning}
        </div>
        
        <div>
          <button onClick={() => handleAnswer(true)} style={styles.btn}>Yes</button>
          <button onClick={() => handleAnswer(false)} style={styles.btn}>No</button>
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

// Example inline styles (could be extracted to a CSS file)
const styles = {
  container: {
    width: '80%', 
    margin: '0 auto', 
    textAlign: 'center',
    padding: 20,
  },
  progressBarWrapper: {
    width: '100%',
    backgroundColor: '#e2d3ec',
    height: 20,
    position: 'relative',
    marginBottom: 10
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#9b59b6',
    transition: 'width 0.1s'
  },
  wordBox: {
    fontSize: '7vw', 
    fontWeight: 'bold',
    margin: '40px 0',
    lineHeight: 1.2,
    textShadow: `-1px -1px 0 #000,
                  1px -1px 0 #000,
                 -1px  1px 0 #000,
                  1px  1px 0 #000`
  },
  btn: {
    backgroundColor: '#9b59b6',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    fontSize: '1.2em',
    padding: '10px 20px',
    margin: 5,
    cursor: 'pointer'
  },
  scoreBox: {
    marginTop: 20,
    fontSize: '1.2em',
    fontWeight: 'bold'
  }
};
