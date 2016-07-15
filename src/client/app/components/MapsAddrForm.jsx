import React, {Component} from 'react';
import {reduxForm} from 'redux-form';

class MapsAddrForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {fields: {address}, handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label for="address">Your Address</label>
          <input type="text" placeholder="Your address" {...address}/>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

MapsAddrForm = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'addressForm',                           // a unique name for this form
  fields: ['address',] // all the fields in your form
})(MapsAddrForm);

export default MapsAddrForm;