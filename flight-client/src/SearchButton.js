import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Search from 'material-ui/svg-icons/action/search';
import FontIcon from 'material-ui/FontIcon';

const styles = {
  button: {
    margin: 12,
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

const SearchButton = () => (
  <div>
  
    <RaisedButton
      label="Search Flights"
      labelPosition="after"
      primary={true}
      icon={<Search/>}
      style={styles.button}
    />
  </div>
);

export default SearchButton;