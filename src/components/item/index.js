import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';
import { Link } from 'react-router-dom';

function Item({ onAdd = () => {}, item = {}, prefix = '/details/' }) {
  const cn = bem('Item');

  const callbacks = {
    onAdd: e => {
      e.preventDefault();
      return onAdd(item._id);
    },
  };

  return (
    <div className={cn()}>
      <Link to={`${prefix}${item._id}`}>
        {/*<div className={cn('code')}>{item._id}</div>*/}
        <div className={cn('title')}>{item.title}</div>
      </Link>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
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
