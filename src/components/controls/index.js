import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ goToCart }) {
  return (
    <div className="Controls">
      <div>В корзине: пусто</div>
      <button onClick={() => goToCart()}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  goToCart: PropTypes.func,
};

Controls.defaultProps = {
  goToCart: () => {},
};

export default React.memo(Controls);
