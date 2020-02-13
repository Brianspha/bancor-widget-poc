import EmbarkJS from '../embarkjs';

const XTransferRerouterConfig = {"logger":{"events":{"_events":{"blockchain:started":[null,null,null,null,null,null,null,null,null],"outputDone":[null,null,null]},"_eventsCount":123,"_maxListeners":350},"logLevels":["error","warn","info","debug","trace"],"logLevel":"info","context":["run","build"]},"abiDefinition":[{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x79ba5097"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x8da5cb5b"},{"constant":false,"inputs":[{"name":"_enable","type":"bool"}],"name":"enableRerouting","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xa3ebe71c"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xd4ee1d90"},{"constant":false,"inputs":[{"name":"_txId","type":"uint256"},{"name":"_blockchain","type":"bytes32"},{"name":"_to","type":"bytes32"}],"name":"rerouteTx","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xe3db16f7"},{"constant":true,"inputs":[],"name":"reroutingEnabled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xedd63c35"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xf2fde38b"},{"inputs":[{"name":"_reroutingEnabled","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"constructor","signature":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_txId","type":"uint256"},{"indexed":false,"name":"_toBlockchain","type":"bytes32"},{"indexed":false,"name":"_to","type":"bytes32"}],"name":"TxReroute","type":"event","signature":"0xb5c80f971fb729e469ffa874c60425659ce82cb4adcfba9731af35ef87b6e619"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_prevOwner","type":"address"},{"indexed":true,"name":"_newOwner","type":"address"}],"name":"OwnerUpdate","type":"event","signature":"0x343765429aea5a34b3ff6a3785a98a5abb2597aca87bfbb58632c173d585373a"}],"deployedAddress":"0xCdb348DBD4827bC94f0731F4D8b38a7e5057AEa4","className":"XTransferRerouter","args":[true],"gas":306983,"gasPrice":"20000000000","silent":false,"track":true,"deploy":true,"realRuntimeBytecode":"6080604052600436106100825763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166379ba509781146100875780638da5cb5b1461009e578063a3ebe71c146100cf578063d4ee1d90146100e9578063e3db16f7146100fe578063edd63c351461011c578063f2fde38b14610145575b600080fd5b34801561009357600080fd5b5061009c610166565b005b3480156100aa57600080fd5b506100b36101ee565b60408051600160a060020a039092168252519081900360200190f35b3480156100db57600080fd5b5061009c60043515156101fd565b3480156100f557600080fd5b506100b3610254565b34801561010a57600080fd5b5061009c600435602435604435610263565b34801561012857600080fd5b506101316102cb565b604080519115158252519081900360200190f35b34801561015157600080fd5b5061009c600160a060020a03600435166102ec565b600154600160a060020a0316331461017d57600080fd5b60015460008054604051600160a060020a0393841693909116917f343765429aea5a34b3ff6a3785a98a5abb2597aca87bfbb58632c173d585373a91a3600180546000805473ffffffffffffffffffffffffffffffffffffffff19908116600160a060020a03841617909155169055565b600054600160a060020a031681565b600054600160a060020a0316331461021457600080fd5b60018054911515740100000000000000000000000000000000000000000274ff000000000000000000000000000000000000000019909216919091179055565b600154600160a060020a031681565b60015474010000000000000000000000000000000000000000900460ff16151561028c57600080fd5b6040805183815260208101839052815185927fb5c80f971fb729e469ffa874c60425659ce82cb4adcfba9731af35ef87b6e619928290030190a2505050565b60015474010000000000000000000000000000000000000000900460ff1681565b600054600160a060020a0316331461030357600080fd5b600054600160a060020a038281169116141561031e57600080fd5b6001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03929092169190911790555600a165627a7a72305820","realArgs":[],"code":"608060405234801561001057600080fd5b506040516020806103ec833981016040525160008054600160a060020a0319163317905560018054911515740100000000000000000000000000000000000000000260a060020a60ff0219909216919091179055610379806100736000396000f3006080604052600436106100825763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166379ba509781146100875780638da5cb5b1461009e578063a3ebe71c146100cf578063d4ee1d90146100e9578063e3db16f7146100fe578063edd63c351461011c578063f2fde38b14610145575b600080fd5b34801561009357600080fd5b5061009c610166565b005b3480156100aa57600080fd5b506100b36101ee565b60408051600160a060020a039092168252519081900360200190f35b3480156100db57600080fd5b5061009c60043515156101fd565b3480156100f557600080fd5b506100b3610254565b34801561010a57600080fd5b5061009c600435602435604435610263565b34801561012857600080fd5b506101316102cb565b604080519115158252519081900360200190f35b34801561015157600080fd5b5061009c600160a060020a03600435166102ec565b600154600160a060020a0316331461017d57600080fd5b60015460008054604051600160a060020a0393841693909116917f343765429aea5a34b3ff6a3785a98a5abb2597aca87bfbb58632c173d585373a91a3600180546000805473ffffffffffffffffffffffffffffffffffffffff19908116600160a060020a03841617909155169055565b600054600160a060020a031681565b600054600160a060020a0316331461021457600080fd5b60018054911515740100000000000000000000000000000000000000000274ff000000000000000000000000000000000000000019909216919091179055565b600154600160a060020a031681565b60015474010000000000000000000000000000000000000000900460ff16151561028c57600080fd5b6040805183815260208101839052815185927fb5c80f971fb729e469ffa874c60425659ce82cb4adcfba9731af35ef87b6e619928290030190a2505050565b60015474010000000000000000000000000000000000000000900460ff1681565b600054600160a060020a0316331461030357600080fd5b600054600160a060020a038281169116141561031e57600080fd5b6001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03929092169190911790555600a165627a7a72305820407ba15d2d2d743e56d1008c8b299fe2832c762bd1bb0fc7fe5855eaee7897e20029","runtimeBytecode":"6080604052600436106100825763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166379ba509781146100875780638da5cb5b1461009e578063a3ebe71c146100cf578063d4ee1d90146100e9578063e3db16f7146100fe578063edd63c351461011c578063f2fde38b14610145575b600080fd5b34801561009357600080fd5b5061009c610166565b005b3480156100aa57600080fd5b506100b36101ee565b60408051600160a060020a039092168252519081900360200190f35b3480156100db57600080fd5b5061009c60043515156101fd565b3480156100f557600080fd5b506100b3610254565b34801561010a57600080fd5b5061009c600435602435604435610263565b34801561012857600080fd5b506101316102cb565b604080519115158252519081900360200190f35b34801561015157600080fd5b5061009c600160a060020a03600435166102ec565b600154600160a060020a0316331461017d57600080fd5b60015460008054604051600160a060020a0393841693909116917f343765429aea5a34b3ff6a3785a98a5abb2597aca87bfbb58632c173d585373a91a3600180546000805473ffffffffffffffffffffffffffffffffffffffff19908116600160a060020a03841617909155169055565b600054600160a060020a031681565b600054600160a060020a0316331461021457600080fd5b60018054911515740100000000000000000000000000000000000000000274ff000000000000000000000000000000000000000019909216919091179055565b600154600160a060020a031681565b60015474010000000000000000000000000000000000000000900460ff16151561028c57600080fd5b6040805183815260208101839052815185927fb5c80f971fb729e469ffa874c60425659ce82cb4adcfba9731af35ef87b6e619928290030190a2505050565b60015474010000000000000000000000000000000000000000900460ff1681565b600054600160a060020a0316331461030357600080fd5b600054600160a060020a038281169116141561031e57600080fd5b6001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03929092169190911790555600a165627a7a72305820407ba15d2d2d743e56d1008c8b299fe2832c762bd1bb0fc7fe5855eaee7897e20029","linkReferences":{},"swarmHash":"407ba15d2d2d743e56d1008c8b299fe2832c762bd1bb0fc7fe5855eaee7897e2","gasEstimates":{"creation":{"codeDepositCost":"177800","executionCost":"40875","totalCost":"218675"},"external":{"acceptOwnership()":"42964","enableRerouting(bool)":"20736","newOwner()":"603","owner()":"559","rerouteTx(uint256,bytes32,bytes32)":"2197","reroutingEnabled()":"517","transferOwnership(address)":"21264"}},"functionHashes":{"acceptOwnership()":"79ba5097","enableRerouting(bool)":"a3ebe71c","newOwner()":"d4ee1d90","owner()":"8da5cb5b","rerouteTx(uint256,bytes32,bytes32)":"e3db16f7","reroutingEnabled()":"edd63c35","transferOwnership(address)":"f2fde38b"},"filename":"C:/Users/Development/Documents/GitHub/bancor-widget-poc/.embark/contracts/bancorx/XTransferRerouter.sol","originalFilename":"contracts\\bancorx\\XTransferRerouter.sol","path":"C:\\Users\\Development\\Documents\\GitHub\\bancor-widget-poc\\contracts\\bancorx\\XTransferRerouter.sol","type":"file","deploymentAccount":"0xa90A9F6B165c1cb56081eb03c2bf57ed9fbD0F5a","transactionHash":"0x6bd30cb8d2f28a684dcb4c7bb4a2ffc2a7da95327b71cfa447c740d1f8610a3e"};
const XTransferRerouter = new EmbarkJS.Blockchain.Contract(XTransferRerouterConfig);

export default XTransferRerouter;
