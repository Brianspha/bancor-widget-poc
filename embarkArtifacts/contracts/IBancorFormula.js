import EmbarkJS from '../embarkjs';

const IBancorFormulaConfig = {"logger":{"events":{"_events":{"blockchain:started":[null,null,null,null,null,null,null,null,null],"outputDone":[null,null,null]},"_eventsCount":123,"_maxListeners":350},"logLevels":["error","warn","info","debug","trace"],"logLevel":"info","context":["run","build"]},"abiDefinition":[{"constant":true,"inputs":[{"name":"_supply","type":"uint256"},{"name":"_reserveBalance","type":"uint256"},{"name":"_totalRatio","type":"uint32"},{"name":"_amount","type":"uint256"}],"name":"calculateFundCost","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_supply","type":"uint256"},{"name":"_reserveBalance","type":"uint256"},{"name":"_reserveRatio","type":"uint32"},{"name":"_depositAmount","type":"uint256"}],"name":"calculatePurchaseReturn","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_supply","type":"uint256"},{"name":"_reserveBalance","type":"uint256"},{"name":"_reserveRatio","type":"uint32"},{"name":"_sellAmount","type":"uint256"}],"name":"calculateSaleReturn","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_fromConnectorBalance","type":"uint256"},{"name":"_fromConnectorWeight","type":"uint32"},{"name":"_toConnectorBalance","type":"uint256"},{"name":"_toConnectorWeight","type":"uint32"},{"name":"_amount","type":"uint256"}],"name":"calculateCrossConnectorReturn","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_fromReserveBalance","type":"uint256"},{"name":"_fromReserveRatio","type":"uint32"},{"name":"_toReserveBalance","type":"uint256"},{"name":"_toReserveRatio","type":"uint32"},{"name":"_amount","type":"uint256"}],"name":"calculateCrossReserveReturn","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_supply","type":"uint256"},{"name":"_reserveBalance","type":"uint256"},{"name":"_totalRatio","type":"uint32"},{"name":"_amount","type":"uint256"}],"name":"calculateLiquidateReturn","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}],"className":"IBancorFormula","args":[],"gas":"auto","silent":false,"track":true,"deploy":false,"realRuntimeBytecode":"","realArgs":[],"code":"","runtimeBytecode":"","linkReferences":{},"swarmHash":"","gasEstimates":null,"functionHashes":{"calculateCrossConnectorReturn(uint256,uint32,uint256,uint32,uint256)":"65098bb3","calculateCrossReserveReturn(uint256,uint32,uint256,uint32,uint256)":"79c1b450","calculateFundCost(uint256,uint256,uint32,uint256)":"1da6bbfb","calculateLiquidateReturn(uint256,uint256,uint32,uint256)":"abfd231d","calculatePurchaseReturn(uint256,uint256,uint32,uint256)":"29a00e7c","calculateSaleReturn(uint256,uint256,uint32,uint256)":"49f9b0f7"},"filename":"C:/Users/Development/Documents/GitHub/bancor-widget-poc/.embark/contracts/converter/interfaces/IBancorFormula.sol","originalFilename":"contracts\\converter\\interfaces\\IBancorFormula.sol","path":"C:\\Users\\Development\\Documents\\GitHub\\bancor-widget-poc\\contracts\\converter\\interfaces\\IBancorFormula.sol","type":"file","deploymentAccount":"0xa90A9F6B165c1cb56081eb03c2bf57ed9fbD0F5a"};
const IBancorFormula = new EmbarkJS.Blockchain.Contract(IBancorFormulaConfig);

export default IBancorFormula;
