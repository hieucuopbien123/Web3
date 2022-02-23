const Web3 = require('web3');

// const web3 = new Web3("http://localhost:8545");
//Ở đây không hề có Provider mà ta dùng URI của Ganache vì Web3 tự convert cái URI của Ganache sang Provider để dùng
//Thực tế code đầy đủ sẽ dài hơn sẽ là:
// const provider = new Web3.providers.HttpProvider("http://localhost:8545");//mặc định dùng http provider
// const web3 = new Web3(provider);

//K dùng Provider có sẵn mà tự dùng của ta:
const customProvider = {
    sendAsync: (payload, cb) => {
        console.log('you called');
        console.log(payload);
        cb(undefined, 100);
    }
}
//payload chỉ API ethereum mà ta muốn gọi, cb là callback sẽ gọi khi nhận được response từ blockchain. cb nhận vào 1
//là error nếu có, 2 là response từ Ethereum API ở đây ta chưa có cứ cho bừa là 100
//Hàm sendAsync của Provider được gọi bởi Web3: Ta gọi hàm bằng web3 -> web3 gọi vào sendAsync của Provider -> web3 chỉ
//định API nào được gọi(bằng payload) và khi nhận về kết quả thì gọi cb
const web3 = new Web3(customProvider);

web3.eth.getBlockNumber()
    .then(() => console.log('done!'));
//Ở đây API ethereum ta muốn gọi là hàm eth_blockNumber và trả ra kết quả JSON-RPC response mà
//cb ta truyền vào 100 là kết quả không hợp lệ và báo lỗi
//Ở đây Provider chả kết nối với blockchain nào cả nên kết quả nó báo lỗi như v
//Thực tế Provider luôn là object có sẵn nên ta kbh phải custom như này
//Có thể thấy rõ nếu ta gọi trực tiếp sẽ dùng commandline với curl --data chính là payload và ta dùng web3 thực tế nó
//cũng forward gọi y như v như 1 bước chung gian mà thôi, nhưng nhờ có web3 mà ta có thể dùng với code 
//web3.eth.getBlockNumber() rất đơn giản như trên
