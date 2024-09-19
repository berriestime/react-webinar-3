import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function Controls({ cart = {}, goToCart }) {
  const count = Object.keys(cart).length;
  const sum = Object.values(cart).reduce((acc, item) => acc + item.price * item.count, 0);

  return (
    <div className="Controls">
      <div>
        {count === 0
          ? 'В корзине: пусто'
          : `В корзине: ${count} ${plural(count, {
              one: 'товар',
              few: 'товара',
              many: 'товаров',
            })} / ${sum > 0 ? `${sum.toLocaleString()} ₽` : ''}`}
      </div>
      <button className="Controls-button" onClick={() => goToCart()}>
        Перейти
      </button>
    </div>
  );
}

Controls.propTypes = {
  cart: PropTypes.object,
  goToCart: PropTypes.func,
};

Controls.defaultProps = {
  goToCart: () => {},
};

export default React.memo(Controls);
