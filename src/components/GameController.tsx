import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import GameEmbed from "./GameEmbed";

const games = [
  { id: "game1", name: "Game 1" },
  { id: "game2", name: "Game 2" },
  // Add more games as needed
];

const GameController: React.FC = () => {
  const { gameType } = useParams<{ gameType: string }>();
  const navigate = useNavigate();

  const [selectedGame, setSelectedGame] = useState<string>(() => {
    return gameType || "";
  });

  useEffect(() => {
    if (gameType) {
      setSelectedGame(gameType);
    }
  }, [gameType]);

  const handleGameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newGame = e.target.value;
    setSelectedGame(newGame);
    if (newGame) {
      navigate(`/game/${newGame}`);
    }
  };

  const renderGame = () => {
    const game = games.find((g) => g.id === selectedGame);
    if (!game) {
      return <div>Please select a game from the dropdown above.</div>;
    }
    return <GameEmbed gameId={game.id} />;
  };

  return (
    <div>
      <h1>Game Controller</h1>
      <select onChange={handleGameChange} value={selectedGame}>
        <option value="">-- Choose Game --</option>
        {games.map((game) => (
          <option key={game.id} value={game.id}>
            {game.name}
          </option>
        ))}
      </select>

      {renderGame()}
    </div>
  );
};

export default GameController;
