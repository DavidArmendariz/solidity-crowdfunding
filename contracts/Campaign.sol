// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

contract Campaign {
  struct Request {
    string description;
    uint value;
    address recipient;
    bool complete;
    uint approvalCount;
    mapping(address => bool) approvers;
  }

  uint numRequests;
  mapping(uint => Request) requests;

  address public manager;
  uint minimumContribution;
  mapping(address => bool) public contributors;

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
    contributors[msg.sender] = true;
  }

  function createRequest(string memory description, uint value, address recipient) public restricted {
    Request storage newRequest = requests[numRequests++];
    newRequest.description = description;
    newRequest.value = value;
    newRequest.recipient = recipient;
    newRequest.complete = false;
    newRequest.approvalCount = 0;
  }

  function approveRequest(uint index) public {
    require(contributors[msg.sender]);

    Request storage request = requests[index];

    require(!request.approvers[msg.sender]);

    request.approvers[msg.sender] = true;
    request.approvalCount++;
  }
}