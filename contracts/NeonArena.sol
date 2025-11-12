// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract NeonArena {
    event PlayerAction(
        address indexed player,
        string actionType,
        uint256 value,
        uint256 timestamp
    );

    event ArenaInitialized(address indexed contractAddress, uint256 timestamp);

    mapping(address => uint256) public playerScores;
    mapping(address => uint256) public playerActionCount;
    mapping(address => bool) private isPlayerRegistered;
    address[] public players;

    address public owner;
    bool public isActive;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    modifier whenActive() {
        require(isActive, "Arena inactive");
        _;
    }

    constructor() {
        owner = msg.sender;
        isActive = true;
        emit ArenaInitialized(address(this), block.timestamp);
    }

    function recordAction(string calldata actionType, uint256 value) external whenActive {
        require(bytes(actionType).length > 0, "Invalid action");

        if (!isPlayerRegistered[msg.sender]) {
            players.push(msg.sender);
            isPlayerRegistered[msg.sender] = true;
        }

        playerScores[msg.sender] += value;
        playerActionCount[msg.sender] += 1;

        emit PlayerAction(msg.sender, actionType, value, block.timestamp);
    }

    function batchRecordActions(
        string[] calldata actionTypes,
        uint256[] calldata values
    ) external whenActive {
        require(actionTypes.length == values.length, "Length mismatch");
        require(actionTypes.length > 0, "Empty arrays");

        if (!isPlayerRegistered[msg.sender]) {
            players.push(msg.sender);
            isPlayerRegistered[msg.sender] = true;
        }

        uint256 totalValue = 0;
        for (uint256 i = 0; i < actionTypes.length; i++) {
            require(bytes(actionTypes[i]).length > 0, "Invalid action");
            totalValue += values[i];
            emit PlayerAction(msg.sender, actionTypes[i], values[i], block.timestamp);
        }

        playerScores[msg.sender] += totalValue;
        playerActionCount[msg.sender] += actionTypes.length;
    }

    function getPlayerScore(address player) external view returns (uint256) {
        return playerScores[player];
    }

    function getPlayerActionCount(address player) external view returns (uint256) {
        return playerActionCount[player];
    }

    function getAllPlayers() external view returns (address[] memory) {
        return players;
    }

    function getPlayerCount() external view returns (uint256) {
        return players.length;
    }

    function getPlayerStats(address player) external view returns (
        uint256 score,
        uint256 actionCount,
        bool isRegistered
    ) {
        return (playerScores[player], playerActionCount[player], isPlayerRegistered[player]);
    }

    function setArenaStatus(bool _isActive) external onlyOwner {
        isActive = _isActive;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid address");
        owner = newOwner;
    }
}
