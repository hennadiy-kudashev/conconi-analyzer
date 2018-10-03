import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';

class Switcher extends React.Component {
  state = {
    value: 'speed'
  };

  handleChangeFor = value => () => {
    this.setState({
      value
    });
    this.props.onChange(value);
  };

  render() {
    const { value } = this.state;
    return (
      <FormGroup tag="fieldset">
        <legend>Select X axis parameter</legend>
        <FormGroup check>
          <Label check>
            <Input
              type="radio"
              name="radio1"
              checked={value === 'speed'}
              onChange={this.handleChangeFor('speed')}
            />{' '}
            Speed (km/h)
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type="radio"
              name="radio1"
              checked={value === 'time'}
              onChange={this.handleChangeFor('time')}
            />{' '}
            Time (sec)
          </Label>
        </FormGroup>
      </FormGroup>
    );
  }
}

export default Switcher;
