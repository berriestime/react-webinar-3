import { memo, useCallback } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import { Link } from 'react-router-dom';

function ItemBasket({ onRemove = () => {}, item = {} }) {
  const cn = bem('ItemBasket');

  const callbacks = {
    onRemove: e => onRemove(item._id),
  };

  return (
    <div className={cn()}>
      <Link to={`/details/${item._id}`} className={cn()}>
        {/*<div className={cn('code')}>{item._id}</div>*/}
        <div className={cn('title')}>{item.title}</div>
      </Link>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(item.amount || 0)} шт</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>Удалить</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
};

export default memo(ItemBasket);
