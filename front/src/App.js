import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import { AdminProvider } from './contexts/AdminContext';
import { AnuncioProvider } from './contexts/AnuncioContext';
import { AuthProvider } from './contexts/AuthContext';
import { PropriedadeProvider } from './contexts/PropriedadeContext';
import MyRouter from './MyRouter';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <AdminProvider>
            <AnuncioProvider>
              <PropriedadeProvider>
                <GlobalStyles />
                <MyRouter />
              </PropriedadeProvider>
            </AnuncioProvider>
          </AdminProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
