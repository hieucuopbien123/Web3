import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";
import Web3 from "web3";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      /*let web3;
      if(window.ethereum){//Nếu trong window có ethereum object provider(or có extension ví đc cài đó)
        web3 = new Web3(window.ethereum);//truyền vào như truyền khai báo provider bth
        await ethereum.enable();
        //Tuy nhiên, nếu vào bất cứ trang web nào cũng đều cho phép nó dùng metamask hỏng vì nó có thể lấy tiền của
        //người dùng nên metamask cho ra tính năng mới là pop-up lên để yêu cầu người dùng cho phép trang web nào mới 
        //được tương tác với ví metamask. Tính năng đó chính là hàm window.enable()
      }else if(window.web3){//nếu ví metamask của user là phiên bản cũ
        web3 = new Web3(window.web3.currentProvider);
        //ở phiên bản cũ thì trang web nào nó cũng cho phép nên k cần check enable()
        //window.web3 tức là ở phiên bản cũ ta đã có sẵn 1 instance web3 trong browser là window.web3 nhưng ta muốn 
        //dùng phiên bản web3 của ta cơ nên ta khai báo 1 web3 mới với new và ta chỉ cần lấy provider của cái ví đó thôi
      }
      //Ở đây nếu người dùng đồng ý thì được dùng web3 rồi. Nếu k có extension ví thì web3 = null
      //Ở đây ta có thể check nếu web3 vẫn bằng null thì hiện pop-up yêu cầu người dùng cài
      */

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(10).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
      </div>
    );
  }
}

export default App;
