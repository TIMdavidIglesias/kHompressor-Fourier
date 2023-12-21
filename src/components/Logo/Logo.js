// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Grid } from '../../../node_modules/@mui/material/index';
import logo from 'assets/logo/logo-min.svg';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={logo} alt="Mantis" width="100" />
     *
     */
    <>
      <Grid xs={12}>
        <Box sx={{ mb:'-30px', display: 'flex', justifyContent: 'flex-end' }}>
          <img src={logo} alt="kHompressor Fourier" width="200" />
        </Box>
        <Box sx={{ fontFamily: 'A4Logo', display: 'flex', justifyContent: 'flex-end' }}>
          kHompressor Fourier
        </Box>
      </Grid>
    </>
  );
};

export default Logo;
