import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { AnuncioProvider } from './contexts/AnuncioContext';
import { PropriedadeProvider } from './contexts/PropriedadeContext';
import MyRouter from './MyRouter';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <AnuncioProvider>
            <PropriedadeProvider>
              <GlobalStyles />
              <MyRouter />
            </PropriedadeProvider>
          </AnuncioProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
