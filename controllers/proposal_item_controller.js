const Controller = require("./controller.js");

const ProposalItem = require("../models/proposal_item.js");
const proposalItemController = new Controller(ProposalItem);

module.exports = proposalItemController;
