import React from 'react';

class ConnectEthereum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginText: 'please login'
    }
  }

  onClickHandler = (event) => {
    event.preventDefault();
    this.props.connectEthereum();
    this.setState({loginText: 'logged in: '});
  }

  render() {
    return (
      <div>
        <button onClick={this.onClickHandler}> Connect with Metamask </button> <br />
        {this.state.loginText} {this.props.account}
      </div>
    );
  }
}
export default ConnectEthereum;
