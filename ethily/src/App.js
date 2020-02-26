import React, {Component} from 'react';
import Web3 from 'web3';
import Multihash from 'multihashes';
import SelectFiles from './components/SelectFiles';
import UploadedFiles from './components/UploadedFiles';
import LinkTest from './components/LinkTest';
import UpdateENS from './components/UpdateENS';
import ConnectEthereum from './components/ConnectEthereum';
import BullshitButton from './components/BullshitButton';
//import ipfs from './ipfs';
import ipfsAPI from 'ipfs-http-client'

class App extends Component {

  constructor() {
    super();
      this.state = {
        isBullshit: false,
        isFile: false,
        isFolderHash: false
      }
    //  this.uploadFilesToIpfs = this.uploadFilesToIpfs.bind(this);
      this.uploadToIpfs = this.uploadToIpfs.bind(this);
      this.bullshit = this.bullshit.bind(this);
      console.log(Math.round(Math.random() * 100000))
  }



  bullshit = () => {

  }

  // method for the selectFiles button
  // adding files to this.state.files
  // calls upload method for ipfs
  selectFilesButton = async(files) => {
    console.dir("App.js: selectFilesButton: files: "+await files);
    await this.setState({files: files});
    await this.randomPath();
    await this.uploadToIpfs(files);
    await this.folderHashState();
  }

  updateENSButton = async(ens) => {
    this.setState({ensdomain: ens})
    await this.calcENSHash();
    await this.updateENSContent();
  }

  async calcENSHash() {
    var buf = Multihash.fromB58String(this.state.folderHash);
    var dig = Multihash.decode(buf).digest;
    this.setState({ensHash: '0x' + Multihash.toHexString(dig)});
  }

  async updateENSContent() {
    window.web3.eth.ens.setContent(
    this.state.ensdomain,
    this.state.ensHash,
    {
        from: this.state.account,
      
    }
).then(function (result) {
         console.log(result.events);
 });
  }


  async randomPath() {
      let date = new Date();
      this.setState({randomPath: "ethily.io_"+
                                  date.getDate()+
                                  (date.getMonth()+1)+
                                  date.getFullYear()+
                                  "_"+
                                  Math.round(Math.random() * 100000)+
                                  "/"})
  }

  async folderHashState() {
    this.setState({folderHash: this.state.uploadedFiles[1].hash, isFolderHash: true})
  }

  async uploadToIpfs(files) {
      let ipfs = ipfsAPI({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
      let fileDetails = [];
      let uploadedFiles = [];

      for await (let file of files) {
        fileDetails.push({path: this.state.randomPath+file.name, content: file})
        console.log("fileDetails: "+fileDetails)
      }

     const options = {
       wrapWithDirectory: true,
       progress: (prog) => console.log(`received: ${prog}`)
     }

     const source = ipfs.add(fileDetails, options)
     let cnt = 0;
     try {
       for await (const file of source) {
         console.log(file)
         uploadedFiles.push({id: cnt, filename: '/'+file.path, hash: file.cid.toString()})
         //this.setState({ added_file_hash: file.cid.toString() })
         cnt++;
       }
     } catch (err) {
       console.error(err)
     }
     this.setState({uploadedFiles: uploadedFiles.reverse(), isFile: true})
     console.dir(this.state.uploadedFiles.length-2)
   }

   connectEthereumButton = async () => {
     this.connectEthereum();
   }

   connectEthereum = async () => {
         if (typeof web3 !== 'undefined') {
       console.log("web3 !== undefined");
       window.web3 = new Web3(window.web3.currentProvider)

       // Metamask connection
       if (window.web3.currentProvider.isMetaMask === true) {
         await window.ethereum.enable();
         window.web3.eth.getAccounts((error, accounts) => {
           if (accounts.length === 0) {
             console.log("no active accounts");
             // there is no active accounts in MetaMask
           } else {
             // it's ok
             console.log("ok");
             this.setState({account: accounts[0], loggedIn: true});
             console.log(this.props.account);
           }
         });

         // for other providers
       } else {
         console.log("other web3 provider");
         // Another web3 provider
       }
     } else {
       alert("Please install browser wallet. e.g. metamask")
       console.log("no web3 provider");
       // No web 3 provider
     }
   }


  render() {
    return (
      <div className="App">
      {this.state.isBullshit && <BullshitButton bullshitButton={this.bullshit} />}
      <br />
      <SelectFiles selectFilesButton={this.selectFilesButton} />
      <br />
      {this.state.isFile && <UploadedFiles files={this.state.uploadedFiles} />}
      <br />
      {this.state.isFolderHash && <LinkTest hash={this.state.folderHash} />}
      <br />
      {this.state.isFolderHash && <ConnectEthereum connectEthereum={this.connectEthereumButton} account={this.state.account} />}
      <br />
      {this.state.loggedIn && <UpdateENS updateENSButton={this.updateENSButton} />}
      </div>
    );
  }
}

export default App;
