import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list, onAddToCart, onSelectItem }) {
  return (
    <div className="List">
      {list.map(item => (
        <div key={item.code} className="List-item">
          <Item item={item} onAddToCart={onAddToCart} onSelect={onSelectItem} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onAddToCart: PropTypes.func,
  onSelectItem: PropTypes.func,
};

List.defaultProps = {
  onAddToCart: () => {},
  onSelectItem: () => {},
};

export default React.memo(List);
