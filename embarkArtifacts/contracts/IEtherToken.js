import EmbarkJS from '../embarkjs';

const IEtherTokenConfig = {"logger":{"events":{"_events":{"blockchain:started":[null,null,null,null,null,null,null,null,null],"outputDone":[null,null,null]},"_eventsCount":123,"_maxListeners":350},"logLevels":["error","warn","info","debug","trace"],"logLevel":"info","context":["run","build"]},"abiDefinition":[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"withdrawTo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"}],"name":"depositTo","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}],"className":"IEtherToken","args":[],"gas":"auto","silent":false,"track":true,"deploy":false,"realRuntimeBytecode":"","realArgs":[],"code":"","runtimeBytecode":"","linkReferences":{},"swarmHash":"","gasEstimates":null,"functionHashes":{"allowance(address,address)":"dd62ed3e","approve(address,uint256)":"095ea7b3","balanceOf(address)":"70a08231","decimals()":"313ce567","deposit()":"d0e30db0","depositTo(address)":"b760faf9","name()":"06fdde03","symbol()":"95d89b41","totalSupply()":"18160ddd","transfer(address,uint256)":"a9059cbb","transferFrom(address,address,uint256)":"23b872dd","withdraw(uint256)":"2e1a7d4d","withdrawTo(address,uint256)":"205c2878"},"filename":"C:/Users/Development/Documents/GitHub/bancor-widget-poc/.embark/contracts/token/interfaces/IEtherToken.sol","originalFilename":"contracts\\token\\interfaces\\IEtherToken.sol","path":"C:\\Users\\Development\\Documents\\GitHub\\bancor-widget-poc\\contracts\\token\\interfaces\\IEtherToken.sol","type":"file","deploymentAccount":"0xa90A9F6B165c1cb56081eb03c2bf57ed9fbD0F5a"};
const IEtherToken = new EmbarkJS.Blockchain.Contract(IEtherTokenConfig);

export default IEtherToken;
