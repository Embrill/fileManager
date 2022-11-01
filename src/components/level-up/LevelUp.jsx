import React from 'react';
import './level-up.scss';

const LevelUp = ({ clickHandlerArrowUp }) => {
  return (
    <div className="level-up">
      <div className="level-up__body" onClick={clickHandlerArrowUp}>
        <span className="level-up__icon material-icons">&#xe5d8;</span>
        <span className="level-up__text">LEVEL UP</span>
      </div>
    </div>
  );
};

export default LevelUp;
