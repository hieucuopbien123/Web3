//Tương tác với public testnet với hdwalletprovider
const Web3 = require("web3");
const MyContract = require("./build/contracts/MyContract.json");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const address = "0xe0b173BFfC297d9C711D78E888974d8Cd59072Ac";//phải faucet nó
const privateKey = "45ca7539ccb548d938ed418f32363a579963b03347f656a78bd3503d4b00bd20";

const init = async () => {
    /*Khi dùng mnemonic nên truyền vào object
    const provider = new HDWalletProvider({
        mnemonic: {
            phrase: "<>"
        },
        providerOrUrl: "<>",
        numberOfAddress: <>,
        addressIndex: <>
    })vì dùng mnemonic nó có thể generate bao nhiêu key và thao tác với key thứ bnh ta phải nói */
    const provider = new HDWalletProvider(
        privateKey,
        "https://ropsten.infura.io/v3/14cbfc832cad4fef9f76b60196e20914"
        //thay url localhost của ganache là url của node trên infura
    )

    const web3 = new Web3(provider);
    let contract = new web3.eth.Contract(
        MyContract.abi,
    );
    //ta phải viết code deploy lên pubnet smart contract 1 lần để tương tác chứ k dùng lệnh của truffle được

    contract = await contract.deploy({data: MyContract.bytecode}).send({from: address});

    await contract.methods.setData(10).send({from: address});
    const result = await contract.methods.getData().call();
    console.log(result);
}
init();
//chạy lâu vì chơi 2 trans cơ mà. run scripts này chứ éo cần truffle deploy hay cái gì hết vì ropstent chả liên quan
//gì đến truffle nx, truffle chỉ là 1 layer hỗ trợ và bổ sung local net mà thôi
//Ta cũng có thể cấu hình file config cho truffle dùng public network nào và từ đó dùng lệnh của truffle thao tác với 
//pubnet tương tự thao tác với ganache
