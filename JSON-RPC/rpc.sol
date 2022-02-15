// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

contract RPC {
   
    address public owner;
    uint256 public count;
    
    event Increase(address indexed sender, uint256 count);
    
    constructor() {
        owner = msg.sender;
    }
    
    function increase() external {
        count = count + 1;
        emit Increase(msg.sender, count);
    }
}
