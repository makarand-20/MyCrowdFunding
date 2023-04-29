// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract CrowdFunding {
    using SafeMath for uint256;
    address public owner;
    uint256 cut;
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
        uint256 id;
    }

    event TransferredToOwner(address indexed ownerAddress, uint256 amount);
    event TransferredToCampaignOwner(
        address indexed campaignOwnerAddress,
        uint256 amount
    );
    event CutChanged();

    mapping(uint256 => Campaign) public campaigns;
    uint256 public numOfCampaigns = 0;

    constructor(uint256 _cut) {
        owner = msg.sender;
        cut = _cut;
    }

    function createCampaign(
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public {
        Campaign storage campaign = campaigns[numOfCampaigns];
        require(
            _deadline > block.timestamp.mul(1000),
            "The deadline should be a date in the future"
        );

        campaign.id = numOfCampaigns;
        campaign.owner = msg.sender;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.image = _image;

        numOfCampaigns++;
    }

    function donateToCampaign(uint256 _id) public payable returns (bool, bool) {
        uint256 totalAmount = msg.value;
        uint256 cutValue = totalAmount.mul(cut).div(100);
        (bool s, ) = payable(owner).call{value: cutValue}("");
        if (s) emit TransferredToOwner(owner, cutValue);

        Campaign storage campaign = campaigns[_id];
        campaign.donators.push(msg.sender);
        campaign.donations.push(totalAmount - cutValue);

        (bool sent, ) = payable(campaign.owner).call{
            value: totalAmount - cutValue
        }("");
        if (sent)
            emit TransferredToCampaignOwner(
                campaign.owner,
                totalAmount - cutValue
            );

        if (sent) {
            campaign.amountCollected += totalAmount - cutValue;
        }
        return (s, sent);
    }

    function getDonators(
        uint256 _id
    ) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numOfCampaigns);
        for (uint i = 0; i < numOfCampaigns; i++) {
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }
        return allCampaigns;
    }

    function changeCut(uint256 value) public own {
        cut = value;
        emit CutChanged();
    }

    modifier own() {
        require(msg.sender == owner, "Don't have excess");
        _;
    }
}
