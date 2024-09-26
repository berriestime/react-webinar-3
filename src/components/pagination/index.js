import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

const getPaginationIds = (currentPage, totalPages) => {
  if (currentPage === 0 && totalPages > 3) return [0, 1, 2, totalPages - 1];

  const ids = new Set();

  ids.add(0);

  const prev = currentPage - 1;
  if (prev > 0) ids.add(prev);

  ids.add(currentPage);

  const next = currentPage + 1;
  if (next < totalPages - 1) ids.add(next);

  ids.add(totalPages - 1);

  return Array.from(ids);
};

function Pagination({ head, footer, children }) {
  const cn = bem('Pagination');

  const store = useStore();

  const currentPage = useSelector(state => state.catalog.currentPage);
  const totalPages = useSelector(state => state.catalog.totalPages);
  const paginationIds = getPaginationIds(currentPage, totalPages);
  const paginationIdsWithSpaces = paginationIds.reduce((acc, cur) => {
    if (cur - 1 > acc.at(-1)) acc.push(undefined);
    acc.push(cur);
    return acc;
  }, []);

  return (
    <div className={cn()}>
      {paginationIdsWithSpaces.map(id =>
        id !== undefined ? (
          <button
            className={cn('item', { active: id === currentPage })}
            key={id}
            onClick={() => store.actions.catalog.load(id)}
          >
            {id + 1}
          </button>
        ) : (
          <span key={id}>...</span>
        ),
      )}
    </div>
  );
}

Pagination.propTypes = {
  children: PropTypes.node,
};

export default memo(Pagination);
