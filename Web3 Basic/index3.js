const Web3 = require('web3');
const MyContract = require("./build/contracts/MyContract.json");

const init = async () => {
    const web3 = new Web3('http://localhost:9545');

    const id = await web3.eth.net.getId();
    const deployedNetwork = MyContract.networks[id];
    const contract = new web3.eth.Contract(
        MyContract.abi,
        deployedNetwork.address
    );
    const addressed = await web3.eth.getAccounts();

    await contract.methods.sendEther().send({
        from: addressed[0],
        // value: 100
        // value: web3.utils.toBN('10000000')
        value: "10000000"
    })
    //Ở đây value nếu truyền số nhỏ bằng wei thì có thể dùng số bth
    //Nếu là số lớn thì đưa nó vào string là được "1000000000000000000" vì nếu là number sẽ exceed
    //JS cannot handle nhưng string thì muốn cộng trừ số ta k thể làm được
    //Cách khác handle số lớn là dùng BN.js riêng của JS
    //Cách khác nữa là web3 có cài sẵn BN.js trong utils có thể dùng luôn nếu có sẵn web3
    console.log(await contract.methods.functionCalled().call());

    //chỉ gọi vào fallback để gửi ether
    await web3.eth.sendTransaction({
        from: addressed[0],
        to: contract.options.address,//khi đã có contract rồi thì lấy address như này cho nhanh = deployedNetwork.address
        //nếu muốn gửi cho 1 EOA(externally owned account) thì dùng nó ở to là đc thôi
        value: '100000000'
    })
    console.log(await contract.methods.functionCalled().call());
}
init();