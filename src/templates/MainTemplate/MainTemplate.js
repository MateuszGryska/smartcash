import React from 'react';
import PropTypes from 'prop-types';

const MainTemplate = ({ children }) => {
  return <main>{children}</main>;
};

MainTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainTemplate;
