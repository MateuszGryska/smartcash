import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';

import palette from 'theme/palette';
import typography from 'theme/typography';

const theme = createMuiTheme({
  palette,
  typography,
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
});

export default theme;
