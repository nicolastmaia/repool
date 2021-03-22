import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardOwnerLayout from 'src/layouts/DashboardSimple';
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

const routes = [
  {
    path: 'app',
    element: <DashboardOwnerLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'anuncios', element: <AnuncioListView /> },
      { path: 'propriedades', element: <PropriedadeListView /> },
      { path: 'favoritos', element: <FavoritoListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'adm',
    element: <DashboardAdmLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'anuncios', element: <AnuncioListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
