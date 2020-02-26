import React from 'react';


class LinkTest extends React.Component {

  constructor(props) {
      super(props);
    }
// irgendwo muss key=fild.id hin
    render() {
      return (
        <div>
          <a href={`https://cloudflare-ipfs.com/ipfs/${this.props.hash}`} target="_blank">test website</a>
        </div>
      );
    }
  }
  export default LinkTest;
