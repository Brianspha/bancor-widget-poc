import EmbarkJS from '../embarkjs';

const IWhitelistConfig = {"logger":{"events":{"_events":{"blockchain:started":[null,null,null,null,null,null,null,null,null],"outputDone":[null,null,null]},"_eventsCount":123,"_maxListeners":350},"logLevels":["error","warn","info","debug","trace"],"logLevel":"info","context":["run","build"]},"abiDefinition":[{"constant":true,"inputs":[{"name":"_address","type":"address"}],"name":"isWhitelisted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}],"className":"IWhitelist","args":[],"gas":"auto","silent":false,"track":true,"deploy":false,"realRuntimeBytecode":"","realArgs":[],"code":"","runtimeBytecode":"","linkReferences":{},"swarmHash":"","gasEstimates":null,"functionHashes":{"isWhitelisted(address)":"3af32abf"},"filename":"C:/Users/Development/Documents/GitHub/bancor-widget-poc/.embark/contracts/utility/interfaces/IWhitelist.sol","originalFilename":"contracts\\utility\\interfaces\\IWhitelist.sol","path":"C:\\Users\\Development\\Documents\\GitHub\\bancor-widget-poc\\contracts\\utility\\interfaces\\IWhitelist.sol","type":"file","deploymentAccount":"0xa90A9F6B165c1cb56081eb03c2bf57ed9fbD0F5a"};
const IWhitelist = new EmbarkJS.Blockchain.Contract(IWhitelistConfig);

export default IWhitelist;
