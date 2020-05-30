import React from 'react';
import GlobalStyle from '../../theme/GlobalStyle';

const MainTemplate = ({ children }) => {
  return (
    <main>
      <GlobalStyle />
      {children}
    </main>
  );
};

export default MainTemplate;
