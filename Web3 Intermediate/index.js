//Tương tác với ganache net với hdwalletprovider 1 tài khoản tùy ý chứ kp tk đầu tiên trong 10 tk nó unlock sẵn nx
const Web3 = require("web3");
const MyContract = require("./build/contracts/MyContract.json");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const address = "0xe0b173BFfC297d9C711D78E888974d8Cd59072Ac";
const privateKey = "45ca7539ccb548d938ed418f32363a579963b03347f656a78bd3503d4b00bd20";

const init = async () => {
    //ganache đơn giản chỉ cần provider tự dùng account đầu tiên, ở đây ta dùng 1 account chỉ định cơ
    const provider = new HDWalletProvider(
        privateKey, //có thể truyền vào mảng các key, có thể dùng mnemonic thay thế
        "http://localhost:9545"
    )
    //lưu ý là ta dùng hdwalletprovider để nhận key trả ra provider liên kết tk đó trên network. Nhưng ở đây ta dùng
    //ganache => tài khoản này chỉ có 0 ether nên chả làm được gì => ta có thể chuyển tiền cho nó từ 1 tk sẵn có ok luôn
    //trong file migration

    const web3 = new Web3(provider);
    const id = await web3.eth.net.getId();
    const deployedNetwork = MyContract.networks[id];
    const contract = new web3.eth.Contract(
        MyContract.abi,
        deployedNetwork.address
    );
    await contract.methods.setData(10).send({from: address});
    const result = await contract.methods.getData().call();
    console.log(result);
}
init();
