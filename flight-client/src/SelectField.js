import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


export default class SelectFieldUI extends Component {
  state = {
    value: 1,
  };

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <SelectField value={this.state.value} onChange={this.handleChange}>
        <MenuItem value={1} label="Economy" primaryText="Economy" />
        <MenuItem value={2} label="Premium Economy" primaryText="Premium Economy" />
        <MenuItem value={3} label="Business" primaryText="Business" />
        <MenuItem value={4} label="First" primaryText="First" />
      </SelectField>
    );
  }
}