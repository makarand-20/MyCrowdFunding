const { task } = require('hardhat/config');

task('donation', 'Returns the campaign object')
  .addParam('id', 'campaign id')
  .setAction(async function (args, hre) {
    const ethers = hre.ethers;
    const [owner, campaignOwner, donator] = await ethers.getSigners();
    const CrowdFunding = await ethers.getContractFactory('CrowdFunding');
    const crowdFunding = await CrowdFunding.deploy();
    await crowdFunding.deployed();

    const req = await crowdFunding
      .connect(campaignOwner)
      .createCampaign('test', 'test', 100, 100, 'test');

    req.wait();
    await crowdFunding
      .connect(donator)
      .donateToCampaign(0, { value: ethers.utils.parseEther('1') });
    const campaign = await crowdFunding.getDonators(args.id);
    console.log(campaign);
  });
