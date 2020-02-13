import EmbarkJS from '../embarkjs';

const OwnedConfig = {"logger":{"events":{"_events":{"blockchain:started":[null,null,null,null,null,null,null,null,null],"outputDone":[null,null,null]},"_eventsCount":123,"_maxListeners":350},"logLevels":["error","warn","info","debug","trace"],"logLevel":"info","context":["run","build"]},"abiDefinition":[{"constant":false,"inputs":[],"name":"acceptOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x79ba5097"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x8da5cb5b"},{"constant":true,"inputs":[],"name":"newOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xd4ee1d90"},{"constant":false,"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xf2fde38b"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor","signature":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_prevOwner","type":"address"},{"indexed":true,"name":"_newOwner","type":"address"}],"name":"OwnerUpdate","type":"event","signature":"0x343765429aea5a34b3ff6a3785a98a5abb2597aca87bfbb58632c173d585373a"}],"deployedAddress":"0x775BEBC98757728685F7fc53E278a8905217cd47","className":"Owned","args":[],"gas":194757,"gasPrice":"20000000000","silent":false,"track":true,"deploy":true,"realRuntimeBytecode":"6080604052600436106100615763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166379ba509781146100665780638da5cb5b1461007d578063d4ee1d90146100ae578063f2fde38b146100c3575b600080fd5b34801561007257600080fd5b5061007b6100e4565b005b34801561008957600080fd5b5061009261016c565b60408051600160a060020a039092168252519081900360200190f35b3480156100ba57600080fd5b5061009261017b565b3480156100cf57600080fd5b5061007b600160a060020a036004351661018a565b600154600160a060020a031633146100fb57600080fd5b60015460008054604051600160a060020a0393841693909116917f343765429aea5a34b3ff6a3785a98a5abb2597aca87bfbb58632c173d585373a91a3600180546000805473ffffffffffffffffffffffffffffffffffffffff19908116600160a060020a03841617909155169055565b600054600160a060020a031681565b600154600160a060020a031681565b600054600160a060020a031633146101a157600080fd5b600054600160a060020a03828116911614156101bc57600080fd5b6001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03929092169190911790555600a165627a7a72305820","realArgs":[],"code":"608060405234801561001057600080fd5b5060008054600160a060020a03191633179055610217806100326000396000f3006080604052600436106100615763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166379ba509781146100665780638da5cb5b1461007d578063d4ee1d90146100ae578063f2fde38b146100c3575b600080fd5b34801561007257600080fd5b5061007b6100e4565b005b34801561008957600080fd5b5061009261016c565b60408051600160a060020a039092168252519081900360200190f35b3480156100ba57600080fd5b5061009261017b565b3480156100cf57600080fd5b5061007b600160a060020a036004351661018a565b600154600160a060020a031633146100fb57600080fd5b60015460008054604051600160a060020a0393841693909116917f343765429aea5a34b3ff6a3785a98a5abb2597aca87bfbb58632c173d585373a91a3600180546000805473ffffffffffffffffffffffffffffffffffffffff19908116600160a060020a03841617909155169055565b600054600160a060020a031681565b600154600160a060020a031681565b600054600160a060020a031633146101a157600080fd5b600054600160a060020a03828116911614156101bc57600080fd5b6001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03929092169190911790555600a165627a7a72305820ec0a641842dbc5af4f3e3f5e620a1d71704534c51e773778afe99e63b6c6533e0029","runtimeBytecode":"6080604052600436106100615763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166379ba509781146100665780638da5cb5b1461007d578063d4ee1d90146100ae578063f2fde38b146100c3575b600080fd5b34801561007257600080fd5b5061007b6100e4565b005b34801561008957600080fd5b5061009261016c565b60408051600160a060020a039092168252519081900360200190f35b3480156100ba57600080fd5b5061009261017b565b3480156100cf57600080fd5b5061007b600160a060020a036004351661018a565b600154600160a060020a031633146100fb57600080fd5b60015460008054604051600160a060020a0393841693909116917f343765429aea5a34b3ff6a3785a98a5abb2597aca87bfbb58632c173d585373a91a3600180546000805473ffffffffffffffffffffffffffffffffffffffff19908116600160a060020a03841617909155169055565b600054600160a060020a031681565b600154600160a060020a031681565b600054600160a060020a031633146101a157600080fd5b600054600160a060020a03828116911614156101bc57600080fd5b6001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03929092169190911790555600a165627a7a72305820ec0a641842dbc5af4f3e3f5e620a1d71704534c51e773778afe99e63b6c6533e0029","linkReferences":{},"swarmHash":"ec0a641842dbc5af4f3e3f5e620a1d71704534c51e773778afe99e63b6c6533e","gasEstimates":{"creation":{"codeDepositCost":"107000","executionCost":"20445","totalCost":"127445"},"external":{"acceptOwnership()":"42964","newOwner()":"581","owner()":"559","transferOwnership(address)":"21198"}},"functionHashes":{"acceptOwnership()":"79ba5097","newOwner()":"d4ee1d90","owner()":"8da5cb5b","transferOwnership(address)":"f2fde38b"},"filename":"C:/Users/Development/Documents/GitHub/bancor-widget-poc/.embark/contracts/utility/Owned.sol","originalFilename":"contracts\\utility\\Owned.sol","path":"C:\\Users\\Development\\Documents\\GitHub\\bancor-widget-poc\\contracts\\utility\\Owned.sol","type":"file","deploymentAccount":"0xa90A9F6B165c1cb56081eb03c2bf57ed9fbD0F5a","transactionHash":"0x8d8af9b381657300cf354e2deb8cad58eb2ae2f4682aee2cdbbca2c8aeecfac4"};
const Owned = new EmbarkJS.Blockchain.Contract(OwnedConfig);

export default Owned;
