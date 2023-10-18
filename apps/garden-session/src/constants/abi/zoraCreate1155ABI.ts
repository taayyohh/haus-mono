//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Zora_Create1155
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const zoraCreate1155ABI = [
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'minter', internalType: 'contract IMinter1155', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'quantity', internalType: 'uint256', type: 'uint256' },
      { name: 'minterArguments', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'mint',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'minter', internalType: 'contract IMinter1155', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'quantity', internalType: 'uint256', type: 'uint256' },
      { name: 'minterArguments', internalType: 'bytes', type: 'bytes' },
      { name: 'mintReferral', internalType: 'address', type: 'address' },
    ],
    name: 'mintWithRewards',
    outputs: [],
  },
] as const
