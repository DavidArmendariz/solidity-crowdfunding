// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

contract Campaign {
  address public manager;
  uint minimumContribution;
  address[] public approvers;

  constructor(uint minimum) {
    manager = msg.sender;
    minimumContribution = minimum;
  }

  function contribute() public payable {
    require(msg.value > minimumContribution);
    approvers.push(msg.sender);
  }
}