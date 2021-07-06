import './styles.css';
import { SnackbarProvider } from 'notistack';
import Slide from '@material-ui/core/Slide';

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
      <Component {...pageProps} />;
    </SnackbarProvider>
  );
}

export default App;
