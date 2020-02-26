import React from 'react';

class UpdateENS extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      ens: undefined
      }
  }


  changeHandler = (event) => {
    const ens = event.target.value;
    this.setState({ ens: ens });
  }

onClickHandler = (event) => {
    event.preventDefault();
    this.props.updateENSButton(this.state.ens);
}

  render() {
    return (
      <div>
        <form onSubmit={this.onClickHandler}>
      {/*   <h1>Hello {this.state.formControls.title.value}</h1> */}
          ENS Domain:
          <p><input type='text'
                  name="ens"
                  value={this.state.ens}
                  onChange={this.changeHandler}   /></p>
          <p><input type='submit'  /></p>
        </form>
      </div>
    );
  }
}
export default UpdateENS;
