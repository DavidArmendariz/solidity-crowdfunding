// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

contract Campaign {
  struct Request {
    string description;
    uint value;
    address recipient;
    bool complete;
  }

  Request[] public requests;
  address public manager;
  uint minimumContribution;
  address[] public approvers;

  modifier restricted() {
    require(msg.sender == manager);
    _;
  }

  constructor(uint minimum) {
    manager = msg.sender;
    minimumContribution = minimum;
  }

  function contribute() public payable {
    require(msg.value > minimumContribution);
    approvers.push(msg.sender);
  }
}