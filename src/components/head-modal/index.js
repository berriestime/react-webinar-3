import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function HeadModal({ title, onClose }) {
  return (
    <div className="HeadModal">
      <h1>{title}</h1>
      <button className="Cart-close" onClick={onClose}>
        Закрыть
      </button>
    </div>
  );
}

HeadModal.propTypes = {
  title: PropTypes.node,
  onClose: PropTypes.func,
};

export default React.memo(HeadModal);
