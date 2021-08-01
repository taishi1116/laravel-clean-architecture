import './styles.css';
import { SnackbarProvider } from 'notistack';
import Slide from '@material-ui/core/Slide';
import { GlobalContextWrapper } from 'src/contexts/globalContext';

function App({ Component, pageProps }) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      TransitionComponent={Slide}
      autoHideDuration={3000}
    >
      <GlobalContextWrapper>
        <Component {...pageProps} />;
      </GlobalContextWrapper>
    </SnackbarProvider>
  );
}

export default App;
