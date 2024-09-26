import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';
import { Link } from 'react-router-dom';

function Item({ onAdd = () => {}, item = {} }) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: e => onAdd(item._id),
  };

  return (
    <Link to={`/details/${item._id}`} className={cn()}>
      {/*<div className={cn('code')}>{item._id}</div>*/}
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </Link>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

export default memo(Item);
