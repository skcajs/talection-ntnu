import React, { useState, useEffect, useRef } from 'react';

/**
 * Spatial Pattern Game in React
 * - 1 minute timer
 * - Start -> Game -> Results flow
 * - 5x5 pattern, random symbols
 * - One of three alternatives is the rotated-180° version
 * - Score tracking
 */
export default function SpatialPatternGame() {
  const [phase, setPhase] = useState("start");
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  const [mainPattern, setMainPattern] = useState([]);
  // we store 3 arrays for the 3 options
  const [option0, setOption0] = useState([]);
  const [option1, setOption1] = useState([]);
  const [option2, setOption2] = useState([]);

  const [correctOptionIndex, setCorrectOptionIndex] = useState(0);

  const timerRef = useRef(null);

  const symbols = ["○","□","△","×"];
  const gameDuration = 60; // seconds

  // Start the game
  function startGame() {
    setCorrect(0);
    setTotal(0);
    setTimeLeft(60);
    setPhase("game");
    pickNewPattern();

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

  function pickNewPattern() {
    // 1) random 5x5
    const mainArr = generateRandomPattern(25);
    setMainPattern(mainArr);

    // 2) rotate 180 for correct
    const rotatedArr = rotate180(mainArr);

    // 3) random index for correct
    const idx = Math.floor(Math.random() * 3);
    setCorrectOptionIndex(idx);

    // fill the correct
    if (idx === 0) setOption0(rotatedArr);
    else setOption0(generateRandomPattern(25));

    if (idx === 1) setOption1(rotatedArr);
    else setOption1(generateRandomPattern(25));

    if (idx === 2) setOption2(rotatedArr);
    else setOption2(generateRandomPattern(25));
  }

  function handleSelectOption(num) {
    setTotal(prev => prev + 1);
    if (num === correctOptionIndex) {
      setCorrect(prev => prev + 1);
    }
    pickNewPattern();
  }

  // For the progress bar
  const progressPercent = 100 * (1 - timeLeft / gameDuration);

  if (phase === "start") {
    // START PAGE
    return (
      <div style={styles.container}>
        <h2>Spatial Pattern - Instructions</h2>
        <p>Press on the correct option (out of 3) that is the same as the main one but rotated 180°.</p>
        <p>The game lasts for 1 minute.</p>
        <button onClick={startGame} style={styles.btn}>Start</button>
      </div>
    );
  }

  if (phase === "game") {
    // GAME PAGE
    return (
      <div style={styles.container}>
        {/* progress bar */}
        <div style={styles.progressBar}>
          <div style={{...styles.progressFill, width: `${progressPercent}%`}} />
        </div>
        <h2>Spatial Pattern</h2>

        <div style={styles.layoutContainer}>
          <h3>Main Pattern</h3>
          <div style={styles.patternGrid}>
            {mainPattern.map((sym, i) => (
              <div key={i} style={styles.cell}>{sym}</div>
            ))}
          </div>

          <h3>Pick which one matches (rotated 180°)</h3>
          <div style={styles.alternativesRow}>
            <div style={styles.patternOption} onClick={() => handleSelectOption(0)}>
              <div style={styles.patternGrid}>
                {option0.map((sym, i) => (
                  <div key={i} style={styles.cell}>{sym}</div>
                ))}
              </div>
            </div>
            <div style={styles.patternOption} onClick={() => handleSelectOption(1)}>
              <div style={styles.patternGrid}>
                {option1.map((sym, i) => (
                  <div key={i} style={styles.cell}>{sym}</div>
                ))}
              </div>
            </div>
            <div style={styles.patternOption} onClick={() => handleSelectOption(2)}>
              <div style={styles.patternGrid}>
                {option2.map((sym, i) => (
                  <div key={i} style={styles.cell}>{sym}</div>
                ))}
              </div>
            </div>
          </div>
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

// ------------------ Helper Functions ------------------
function generateRandomPattern(n) {
  const symbols = ["○","□","△","×"];
  let arr = [];
  for (let i=0; i<n; i++){
    arr.push(symbols[Math.floor(Math.random()*symbols.length)]);
  }
  return arr;
}

function rotate180(arr) {
  let size = 5;
  let rotated = new Array(size*size).fill(null);
  for(let i=0; i<arr.length; i++){
    const r = Math.floor(i/size);
    const c = i % size;
    const newR = (size-1) - r;
    const newC = (size-1) - c;
    rotated[newR*size + newC] = arr[i];
  }
  return rotated;
}

// ------------------ Inline Styles ------------------
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
  layoutContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10
  },
  patternGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: 3,
    border: '1px solid #ccc',
    padding: 5,
    width: 'fit-content',
    margin: '0 auto'
  },
  cell: {
    width: '2vw',
    height: '2vw',
    maxWidth: 25,
    maxHeight: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2vw',
    minFontSize: 10,
    border: '1px solid #ddd'
  },
  alternativesRow: {
    display: 'flex',
    gap: '2vw',
    marginTop: 10,
    marginBottom: 40,
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  patternOption: {
    cursor: 'pointer',
    transition: 'transform 0.2s'
  },
  scoreBox: {
    marginTop: 20,
    fontSize: '1.2em',
    fontWeight: 'bold'
  },
  btn: {
    backgroundColor: '#9b59b6',
    color: '#fff',
    border: 'none',
    borderRadius: 5,
    fontSize: '1em',
    padding: '8px 15px',
    margin: 5,
    cursor: 'pointer'
  }
};
