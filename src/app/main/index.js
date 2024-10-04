import { memo, useEffect } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import Auth from '../../components/auth';
import useSelector from '../../hooks/use-selector';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();

  const userData = useSelector(state => ({
    email: state.profile.user?.email,
    error: state.profile.error,
    name: state.profile.user?.profile.name,
    phone: state.profile.user?.profile.phone,
    token: state.profile.token,
    waiting: state.profile.waiting,
  }));

  useInit(
    () => {
      store.actions.catalog.initParams();
    },
    [],
    true,
  );

  useEffect(() => {
    if (userData.token && !userData.name) {
      store.actions.profile.getSelf();
    }
  }, [userData.token, userData.name, store.actions.profile]);

  const { t } = useTranslate();

  return (
    <PageLayout
      head={
        <Auth
          isAuthenticated={userData.token}
          onLogout={() => store.actions.profile.logout()}
          user={userData}
        />
      }
    >
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <CatalogFilter />
      <CatalogList />
    </PageLayout>
  );
}

export default memo(Main);
