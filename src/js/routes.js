import Login from './screens/Login';
import Main from './components/Main';
import NotFound from './screens/NotFound';

export default {
  path: '/',
  component: Main,
  childRoutes: [
    { path: 'login', component: Login },
    { path: '*', component: NotFound }
  ],
  indexRoute: { component: Login }
};
