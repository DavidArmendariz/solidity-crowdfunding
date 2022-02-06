// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

contract CampaignFactory {
  address[] public deployedCampaigns;

  function createCampaign(uint minimum) public {
    address newCampaign = address(new Campaign(minimum, msg.sender));
    deployedCampaigns.push(newCampaign);
  }

  function getDeployedCampaigns() public view returns (address[] memory) {
    return deployedCampaigns;
  }
}

contract Campaign {
  struct Request {
    string description;
    uint value;
    address payable recipient;
    bool complete;
    uint approversCount;
    mapping(address => bool) approvers;
  }

  uint numRequests;
  mapping(uint => Request) public requests;

  address public manager;
  uint minimumContribution;

  uint public contributorsCount;
  mapping(address => bool) public contributors;

  modifier restricted() {
    require(msg.sender == manager);
    _;
  }

  constructor(uint _minimumContribution, address _manager) {
    minimumContribution = _minimumContribution;
    manager = _manager;
  }

  function contribute() public payable {
    require(msg.value > minimumContribution);
    contributors[msg.sender] = true;
    contributorsCount++;
  }

  function createRequest(string memory description, uint value, address payable recipient) public restricted {
    Request storage newRequest = requests[numRequests++];
    newRequest.description = description;
    newRequest.value = value;
    newRequest.recipient = recipient;
    newRequest.complete = false;
    newRequest.approversCount = 0;
  }

  function approveRequest(uint index) public {
    require(contributors[msg.sender]);

    Request storage request = requests[index];

    require(!request.approvers[msg.sender]);

    request.approvers[msg.sender] = true;
    request.approversCount++;
  }

  function finalizeRequest(uint index) public restricted {
    Request storage request = requests[index];

    require(request.approversCount > (contributorsCount / 2));
    require(!request.complete);

    request.recipient.transfer(request.value);
    request.complete = true;
  }
}