module.exports = {
    // default applies to all environments
    default: {
        // order of connections the dapp should connect to
        dappConnection: [
            "$EMBARK",
            "$WEB3", // uses pre existing web3 object if available (e.g in Mist)
            "ws://localhost:8546",
            "http://localhost:8546"
        ],

        // Automatically call `ethereum.enable` if true.
        // If false, the following code must run before sending any transaction: `await EmbarkJS.enableEthereum();`
        // Default value is true.
        // dappAutoEnable: true,

        gas: "auto",

        // Strategy for the deployment of the contracts:
        // - implicit will try to deploy all the contracts located inside the contracts directory
        //            or the directory configured for the location of the contracts. This is default one
        //            when not specified
        // - explicit will only attempt to deploy the contracts that are explicitly specified inside the
        //            contracts section.
        // strategy: 'implicit',

        // minimalContractSize, when set to true, tells Embark to generate contract files without the heavy bytecodes
        // Using filteredFields lets you customize which field you want to filter out of the contract file (requires minimalContractSize: true)
        // minimalContractSize: false,
        // filteredFields: [],

        deploy: {
            SmartToken: {
                args: ['SphaToken', 'ST', 18]
            },
            SmartTokenController: {
                args: ["$SmartToken"]
            },
            ContractRegistry: {
                args: []
            },
            BancorNetwork: {
                args: [
                    "$ContractRegistry"
                ]
            },
            BancorNetworkPathFinder: {
                args: [
                    "$ContractRegistry"
                ]
            },
            BancorX: {
                args: [
                    "1000000000000000000000",
                    "1000000000000000000000",
                    "1000000000000000000",
                    "1000000000000000000",
                    "10000000000000000000",
                    "$ContractRegistry",
                    "$SmartToken",
                    true,
                ]
            },
            ERC20Token: {
                args: [
                    'SphaToken', 'ST', 18, 2000000000
                ]
            },
            ERC20Token2: {
                args: [
                    'Reserve Token', 'RT', 18, 4000000000
                ]
            },
            XTransferRerouter: {
                args: [true]
            },
            BancorConverter: {
                args: [
                    "$SmartToken",
                    "$ContractRegistry",
                    5000,
                    "$ERC20Token",
                    25000
                ],
                afterDeploy:async(dependencies)=>{
                    console.log(dependencies)
                    await dependencies.contracts.methods.ContractRegistry.registerAddress(web3.utils.fromAscii(ContractFeatures), dependencies.contracts.ContractFeatures.address).send({
                        gas: 6000000
                    })
                    await dependencies.contracts.methods.ContractRegistry.registerAddress(web3.utils.fromAscii(BancorFormula), dependencies.contracts.BancorFormula.address).send({
                        gas: 6000000
                    })
                    await dependencies.contracts.methods.ContractRegistry.registerAddress(web3.utils.fromAscii(BancorNetwork), dependencies.contracts.BancorNetwork.address).send({
                        gas: 6000000
                    })
                    await dependencies.contracts.methods.ContractRegistry.registerAddress(web3.utils.fromAscii(BancorConverterFactory), dependencies.contracts.BancorConverterFactory.address).send({
                        gas: 6000000
                    })
                    await dependencies.contracts.methods.ContractRegistry.registerAddress(web3.utils.fromAscii(BancorConverterUpgrader), dependencies.contracts.BancorConverterUpgrader.address).send({
                        gas: 6000000
                    })
                }
            },
            BancorConverterRegistry: {
                args: [
                    "$ContractRegistry"
                ]
            },
            BancorConverterUpgrader: {
                args: [
                    "$ContractRegistry"
                ]
            },
            BancorConverterRegistryData: {
                args: [
                    "$ContractRegistry"
                ]
            },
            CrowdsaleController: {
                args: [
                    "$SmartToken",
                    Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
                    "0xa90a9f6b165c1cb56081eb03c2bf57ed9fbd0f5a",
                    "0x07063c6c47d24923e6a4368f2f95b4bd73ccb6e4",
                    "0xd3a40f1165164f13f237cc938419cc292e66b7bb3aa190f21087a3813c5ae1ca"
                ]
            },
            NonStandardSmartToken: {
                args: ['SphaToken', 'ST', 18]
            },
            EtherToken: {
                args: [
                    'SphaToken', 'ST'
                ]
            },
            NonStandardERC20Token: {
                args: ['SphaToken', 'ST', 18]
            }
        },

        // default environment, merges with the settings in default
        // assumed to be the intended environment by `embark run`
        development: {
            deploy: {

            }
        },
        infura: {
            deploy: {

            }
        },
        // merges with the settings in default
        // used with "embark run privatenet"
        privatenet: {},

        // you can name an environment with specific settings and then specify with
        // "embark run custom_name" or "embark blockchain custom_name"
        // custom_name: {}
    }
};