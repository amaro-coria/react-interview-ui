// App.tsx

import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import WidgetList from './components/WidgetList';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WidgetList />
    </ThemeProvider>
  );
}

export default App;