import React, { useState } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import useSelector from '../../hooks/use-selector';
import Spinner from '../../components/spinner';
import AuthForm from '../../components/auth-form';
import Auth from '../../components/auth';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../containers/navigation';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const store = useStore();
  const navigate = useNavigate();
  const error = useSelector(state => state.profile.error);

  const handleSubmit = async event => {
    event.preventDefault();

    const loggedIn = await store.actions.profile.signIn(login, password);
    if (loggedIn) return navigate('/profile');
  };

  const select = useSelector(state => ({
    waiting: state.profile.waiting,
  }));

  const { t } = useTranslate();

  return (
    <PageLayout head={<Auth />}>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <AuthForm
          handleSubmit={handleSubmit}
          login={login}
          setLogin={setLogin}
          password={password}
          setPassword={setPassword}
          error={error}
        />
      </Spinner>
    </PageLayout>
  );
}

export default Login;
