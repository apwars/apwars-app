export default [
	{
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_huntId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_x",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_y",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_innerX",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_innerY",
          "type": "uint256"
        }
      ],
      "name": "join",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
	{
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_huntId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_x",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_y",
          "type": "uint256"
        }
      ],
      "name": "getHunters",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "addresses",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
	{
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_huntId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_player",
          "type": "address"
        }
      ],
      "name": "getHuntsLengthByPlayer",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_huntId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_player",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "getPlayerHuntByIndex",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "x",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "y",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "innerX",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "innerY",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isValid",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
 ];