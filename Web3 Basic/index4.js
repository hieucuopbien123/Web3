const Web3 = require('web3');
const MyContract = require("./build/contracts/MyContract.json");

const init = async () => {
    // const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://localhost:9545'));//http provider
    const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:9545'));//websocket provider
    
    const id = await web3.eth.net.getId();
    const deployedNetwork = MyContract.networks[id];
    const contract = new web3.eth.Contract(
        MyContract.abi,
        deployedNetwork.address
    );
    const addresses = await web3.eth.getAccounts();

    //get the event we created
    await contract.methods.setData(10, "hello").send({
        from: addresses[0]
    });
    const receipt = await contract.methods.setData(1, "world").send({
        from: addresses[0]
    });
    console.log(receipt.events);

    //get all event in the past
    const txBlock = await web3.eth.getTransaction(deployedNetwork.transactionHash);//để lấy blockNumber
    const lastest = await web3.eth.getBlockNumber();
    const results = await contract.getPastEvents('MyEvent',{
        //nếu k specific blockNumber, nó chỉ lấy event ở block cuối => nên lấy block nó deployed
        fromBlock: 0,
        filter: {
            data: [10, 1],//lọc các event có value là hey, có thể thêm nhiều trường miễn trường đó có indexed
            //string thì phải chuyển đổi gì đó chứ k filter trực tiếp được
        }
    })
    console.log(results);

    //subcribe to event
    contract.events.MyEvent({fromBlock: 0})
        .on("data", event => console.log(event));//data phải khi receive new data
    await new Promise(resolve => setTimeout(() => resolve(), 2000))//để chờ 2s
    await contract.methods.setData(10, "hello").send({
        from: addresses[0]
    });
}
init();
