import React from 'react';
import Lotto from './Lotto';
import './App.css';

function App() {
  return (
    <div className="App">
      <Lotto 
        gameTitle="Mega Millions"
        numBalls={5}
        minimum={1}
        maximum={70}
        bonusBall
        bonusMinimum={1}
        bonusMaximum={25}
        bonusBallClassname="megaBall"
        noRepeat
        sort
        twoDigits
      />
      <Lotto 
        gameTitle="Power Ball"
        numBalls={5}
        minimum={1}
        maximum={69}
        bonusBall
        bonusMinimum={1}
        bonusMaximum={26}
        bonusBallClassname="powerBall"
        noRepeat
        sort
        twoDigits
      />
      <Lotto 
        gameTitle="Pick 6" 
        numBalls={6} 
        minimum={1} 
        maximum={49} 
        noRepeat
        sort 
        twoDigits
      />
      <Lotto 
        gameTitle="Cash 5" 
        numBalls={5} 
        minimum={1} 
        maximum={43} 
        noRepeat
        sort 
        twoDigits
      />
      <Lotto 
        gameTitle="Pick 4" 
        numBalls={4} 
        minimum={0} 
        maximum={9} 
      />
      <Lotto 
        gameTitle="Pick 3" 
        numBalls={3} 
        minimum={0} 
        maximum={9} 
      />
    </div>
  );
}

export default App;
