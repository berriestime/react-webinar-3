import React from 'react';
import PropTypes from 'prop-types';
import HeadModal from '../head-modal';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ModalLayout({ children, title, onClose }) {
  const cn = bem('ModalLayout');

  return (
    <div className={cn()}>
      <div className={cn('wrapper')}>
        <HeadModal title={title} onClose={onClose} />
        <div className={cn('center')}>{children}</div>
      </div>
    </div>
  );
}

ModalLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  onClose: PropTypes.func,
};

export default React.memo(ModalLayout);
