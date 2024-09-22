import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

const CartInfo = ({ count, sum }) => (
  <div>
    {count === 0 ? (
      <div>
        В корзине: <span className="Controls-text">пусто</span>
      </div>
    ) : (
      <span>
        В корзине:&nbsp;
        <span className="Controls-text">{`${count} ${plural(count, {
          one: 'товар',
          few: 'товара',
          many: 'товаров',
        })} / ${sum > 0 || count ? `${sum.toLocaleString('ru-RU', { useGrouping: true, minimumFractionDigits: 0 })} ₽` : ''}`}</span>
      </span>
    )}
  </div>
);

function Controls({ cart = [], goToCart = () => {} }) {
  const count = cart.length;
  const sum = cart.reduce((acc, item) => acc + item.price * item.count, 0);

  return (
    <div className="Controls">
      <CartInfo count={count} sum={sum} />
      <button className="Controls-button" onClick={() => goToCart()}>
        Перейти
      </button>
    </div>
  );
}

Controls.propTypes = {
  cart: PropTypes.array,
  goToCart: PropTypes.func,
};

export default React.memo(Controls);
