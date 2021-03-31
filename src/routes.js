import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardSimpleLayout from 'src/layouts/DashboardSimple';
import DashboardAdmLayout from 'src/layouts/DashboardAdm';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import AnuncioListView from 'src/views/anuncio/AnuncioListView';
import PropriedadeListView from 'src/views/propriedade/PropriedadeListView';
import FavoritoListView from 'src/views/favorito/FavoritoListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import AnuncioDetails from './views/anuncio/AnuncioDetails';

export const simpleLoggedInRoutes = [
  {
    path: '/',
    element: <DashboardSimpleLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: '/', element: <DashboardView /> },
      { path: 'anuncios', element: <AnuncioListView /> },
      { path: 'anuncios/:id', element: <AnuncioDetails /> },
      { path: 'propriedades', element: <PropriedadeListView /> },
      { path: 'favoritos', element: <FavoritoListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to='/404' /> },
    ],
  },
];

export const admLoggedInRoutes = [
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

export const loggedOutRoutes = [
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
