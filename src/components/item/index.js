import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item(props) {
  const { onSelect = () => {}, onAddToCart = () => {} } = props;

  // Счётчик выделений
  const [count, setCount] = useState(0);

  const callbacks = {
    onClick: () => {
      onSelect(props.item.code);
      if (!props.item.selected) {
        setCount(count + 1);
      }
    },
    onAddToCart: e => {
      e.stopPropagation();
      onAddToCart(props.item.code);
    },
  };

  return (
    <div className="Item">
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title} </div>
      <div className="Item-price">
        {props.item.price.toLocaleString('ru-RU', { useGrouping: true, minimumFractionDigits: 0 })}
        &nbsp;&#8381;
      </div>
      <div className="Item-actions">
        <button className="Item-action" onClick={callbacks.onAddToCart}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  onSelect: PropTypes.func,
  onAddToCart: PropTypes.func,
};

export default React.memo(Item);
