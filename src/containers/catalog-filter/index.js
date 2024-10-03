import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';

const getKey = (categoriesMap, category) => {
  const keys = [category._key];

  let parent = category.parent;
  while (parent) {
    const parentData = categoriesMap[parent._key];
    keys.unshift(parentData._key);
    parent = parentData.parent;
  }

  return { value: keys.join('-'), depth: keys.length - 1 };
};

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  const [categories, setCategories] = useState([]);
  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
  }));

  // Получение списка категорий из API
  useEffect(() => {
    fetch('/api/v1/categories')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const categoryOptions = formatCategoryOptions(data.result.items);
        setCategories(categoryOptions);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  // Форматирование списка категорий для Select
  const formatCategoryOptions = categories => {
    const categoriesMap = categories.reduce((acc, item) => {
      acc[item._key] = item;
      return acc;
    }, {});
    categories.forEach(category => {
      category.sortKey = getKey(categoriesMap, category);
      category.title = `${'-'.repeat(category.sortKey.depth)} ${category.title}`;
      category.value = category._id;
    });
    const sortedItems = categories.toSorted((a, b) =>
      a.sortKey.value.localeCompare(b.sortKey.value, undefined, { numeric: true }),
    );
    return sortedItems;
  };

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    // Выбор категории
    onCategoryChange: useCallback(
      category => store.actions.catalog.setParams({ category, page: 1 }),
      [store],
    ),
  };

  const options = {
    sort: useMemo(
      () => [
        { value: 'order', title: 'По порядку' },
        { value: 'title.ru', title: 'По именованию' },
        { value: '-price', title: 'Сначала дорогие' },
        { value: 'edition', title: 'Древние' },
      ],
      [],
    ),
  };

  const { t } = useTranslate();

  return (
    <SideLayout padding="medium">
      <Select options={categories} value={select.category} onChange={callbacks.onCategoryChange} />
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort} />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={t('search.placeholder')}
        delay={1000}
      />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
