import React, { useState } from 'react';
import { Button, Card, CardContent, Typography, Grid } from '@mui/material';
import './ThreeCardGame.css';

const suits = ['hearts', 'spades', 'clubs', 'diamonds'];
const values = [
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
  { value: 9, label: '9' },
  { value: 10, label: '10' },
  { value: 11, label: 'J' },
  { value: 12, label: 'Q' },
  { value: 13, label: 'K' },
  { value: 14, label: 'A' },
];

const getRandomCard = () => {
  const randomSuit = suits[Math.floor(Math.random() * suits.length)];
  const randomValue = values[Math.floor(Math.random() * values.length)];
  return { ...randomValue, suit: randomSuit };
};

const CardGame = () => {
  const [player1Cards, setPlayer1Cards] = useState([]);
  const [player2Cards, setPlayer2Cards] = useState([]);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [winner, setWinner] = useState('');

  const drawCards = () => {
    const newPlayer1Cards = [getRandomCard(), getRandomCard(), getRandomCard()];
    const newPlayer2Cards = [getRandomCard(), getRandomCard(), getRandomCard()];
    setPlayer1Cards(newPlayer1Cards);
    setPlayer2Cards(newPlayer2Cards);

    const player1Total = newPlayer1Cards.reduce((sum, card) => sum + card.value, 0);
    const player2Total = newPlayer2Cards.reduce((sum, card) => sum + card.value, 0);

    setPlayer1Score(player1Total > player2Total ? player1Score + 1 : player1Score);
    setPlayer2Score(player2Total > player1Total ? player2Score + 1 : player2Score);

    if (player1Total > player2Total) {
      setWinner('Player 1 Wins!');
    } else if (player1Total < player2Total) {
      setWinner('Player 2 Wins!');
    } else {
      setWinner('It\'s a Draw!');
    }
  };

  return (
    <div className="three-card-game">
      <Typography variant="h4" gutterBottom className="title">
        CASINO: THREE CARD GAME
      </Typography>
      <Grid container spacing={2} className="cards-container">
        {/* Player 1 Section */}
        <Grid item xs={6}>
          <Card className="player-card">
            <CardContent>
              <Typography variant="h6">Player 1</Typography>
              <div className="cards">
                {player1Cards.map((card, index) => (
                  <div key={index} className="card">
                    <img
                      src={`/cards/${card.label}_of_${card.suit}.png`}
                      alt={`${card.label} of ${card.suit}`}
                      className="card-image"
                    />
                  </div>
                ))}
              </div>
              <Typography variant="h5">Score: {player1Score}</Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Player 2 Section */}
        <Grid item xs={6}>
          <Card className="player-card">
            <CardContent>
              <Typography variant="h6">Player 2</Typography>
              <div className="cards">
                {player2Cards.map((card, index) => (
                  <div key={index} className="card">
                    <img
                      src={`/cards/${card.label}_of_${card.suit}.png`}
                      alt={`${card.label} of ${card.suit}`}
                      className="card-image"
                    />
                  </div>
                ))}
              </div>
              <Typography variant="h5">Score: {player2Score}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" className="draw-button" onClick={drawCards}>
        DRAW CARDS
      </Button>
      {winner && <Typography variant="h5" className="winner-message">{winner}</Typography>}
    </div>
  );
};

export default CardGame;
