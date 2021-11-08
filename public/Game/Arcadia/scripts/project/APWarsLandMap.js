export default [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_worldId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_landType",
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
		"name": "getLandMap",
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
          "name": "_landType",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_map",
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
      "name": "getLandAreas",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "places",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
 ];