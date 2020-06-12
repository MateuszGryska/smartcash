import React from 'react';
import PropTypes from 'prop-types';
import GlobalStyle from '../../theme/GlobalStyle';

const MainTemplate = ({ children }) => {
  return (
    <main>
      <GlobalStyle />
      {children}
    </main>
  );
};

MainTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainTemplate;
