// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require('hardhat');

function saveFrontendFiles(contract, name) {
  const fs = require('fs');
  const contractsDir = __dirname + '/../../frontend/src/constants/contractData';

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify(
      {
        address: contract.address,
        chainId: hre.network.config.chainId,
        url: hre.network.config.url,
      },
      undefined,
      2
    )
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

async function main() {
  const CrowdFunding = await hre.ethers.getContractFactory('CrowdFunding');
  const CUT = 10;
  const crowdFunding = await CrowdFunding.deploy(CUT);
  await crowdFunding.deployed();
  console.log(`deployed to ${crowdFunding.address}`);
  saveFrontendFiles(crowdFunding, 'CrowdFunding');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
