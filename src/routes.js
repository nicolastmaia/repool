import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardAdmLayout from 'src/layouts/DashboardAdm';
import DashboardSimpleLayout from 'src/layouts/DashboardSimple';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import AnuncioListView from 'src/views/anuncio/AnuncioListView';
import LoginView from 'src/views/auth/LoginView';
import RegisterView from 'src/views/auth/RegisterView';
import NotFoundView from 'src/views/errors/NotFoundView';
import PropriedadeListView from 'src/views/propriedade/PropriedadeListView';
import DashboardView from 'src/views/reports/DashboardView';
import SettingsView from 'src/views/settings/SettingsView';
import AnuncioDetails from './views/anuncio/AnuncioDetailsView';
import CadPropriedadeView from './views/propriedade/CadPropriedadeView';

const simpleLoggedInRoutes = [
  {
    path: '/',
    element: <DashboardSimpleLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: '/', element: <DashboardView /> },
      { path: 'anuncios', element: <AnuncioListView /> },
      { path: 'anuncios/:id', element: <AnuncioDetails /> },
      { path: 'propriedades', element: <PropriedadeListView /> },
      { path: 'propriedades/new', element: <CadPropriedadeView /> },
      { path: 'favoritos', element: <AnuncioListView /> },
      { path: 'favoritos/:id', element: <AnuncioDetails /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to='/404' /> },
    ],
  },
];

const admLoggedInRoutes = [
  {
    path: '/',
    element: <DashboardAdmLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: '/', element: <DashboardView /> },
      { path: 'anuncios', element: <AnuncioListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to='/404' /> },
    ],
  },
];

const loggedOutRoutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '*', element: <Navigate to='/404' /> },
    ],
  },
];

const routes = (userToken, isAdm) => {
  if (userToken) {
    if (isAdm) {
      return admLoggedInRoutes;
    }
    return simpleLoggedInRoutes;
  }
  return loggedOutRoutes;
};

export default routes;
