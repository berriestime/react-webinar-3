import React, { useEffect } from 'react';
import Auth from '../../components/auth';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Spinner from '../../components/spinner';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import { useNavigate } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import './style.css';
import { cn as bem } from '@bem-react/classname';

const cn = bem('Profile');

function Profile() {
  const store = useStore();
  const navigate = useNavigate();

  const userData = useSelector(state => ({
    email: state.profile.user?.email,
    error: state.profile.error,
    name: state.profile.user?.profile.name,
    phone: state.profile.user?.profile.phone,
    token: state.profile.token,
    waiting: state.profile.waiting,
  }));

  if (!userData.waiting && !userData.name) store.actions.profile.getSelf();
  useEffect(() => {
    if (!userData.token || userData.error) return navigate('/login');
  }, [userData, navigate]);

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
      <Spinner active={userData.waiting}>
        <div className={cn()}>
          <h1>{t('profile.title')}</h1>
          <p>
            {t('profile.name')}: <strong>{userData.name}</strong>
          </p>
          <p>
            {t('profile.phone')}: <strong>{userData.phone}</strong>
          </p>
          <p>
            {t('profile.email')}: <strong>{userData.email}</strong>
          </p>
        </div>
      </Spinner>
    </PageLayout>
  );
}

export default Profile;
