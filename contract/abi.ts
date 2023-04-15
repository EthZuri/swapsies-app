const abi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "askHash",
        type: "bytes32",
      },
    ],
    name: "cancelAsk",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "askHash",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "asker",
        type: "address",
      },
      {
        internalType: "address",
        name: "filler",
        type: "address",
      },
      {
        internalType: "address",
        name: "askerToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "askerAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "fillerToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "fillerAmount",
        type: "uint256",
      },
    ],
    name: "createAsk",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "askHash",
        type: "bytes32",
      },
    ],
    name: "fillAsk",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "askHash",
        type: "bytes32",
      },
    ],
    name: "getAsk",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "asker",
            type: "address",
          },
          {
            internalType: "address",
            name: "filler",
            type: "address",
          },
          {
            internalType: "address",
            name: "askerToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "askerAmount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "fillerToken",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "fillerAmount",
            type: "uint256",
          },
        ],
        internalType: "struct SwapsiesV1.Ask",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "askHash",
        type: "bytes32",
      },
    ],
    name: "isActive",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
export default abi;
