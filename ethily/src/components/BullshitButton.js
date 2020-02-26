import React from 'react';

class BullshitButton extends React.Component {

  constructor(props) {
      super(props);
  }

  render() {
    return (
      <div>
        <br />
        <button type="button" onClick={this.props.bullshitButton}>click hier for bullshit</button>
      </div>
    );
  }
}
export default BullshitButton;
