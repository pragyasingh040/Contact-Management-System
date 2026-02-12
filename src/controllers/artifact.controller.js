/*const Artifact = require("../models/artifact.model");

exports.createArtifact = async (req, res) => {
    const artifact = await Artifact.create({
        ...req.body,
        createdBy: req.user.id,
    });
    res.json(artifact);
};

exports.getArtifacts = async (req, res) => {
    const artifacts = await Artifact.find().populate("createdBy", "email");
    res.json(artifacts);
};
*/

const Artifact = require("../models/artifact.model");

exports.createArtifact = async (req, res) => {
    if (!req.body) return res.status(400).json({ message: "Request body is missing" });
    const artifact = await Artifact.create({
        ...req.body,
        createdBy: req.user.id,
    });
    res.json(artifact);
}

exports.getArtifacts = async (req, res) => {
    const artifacts = await Artifact.find().populate("createdBy", "email");
    res.json(artifacts);
}
exports.likeArtifact = async (req, res) => {
    const artifact = await Artifact.findByIdAndUpdate(req.params.id, {
        $push: { likes: req.user.id },
    }, { new: true });
    res.json(artifact);
}
exports.commentArtifact = async (req, res) => {
    const artifact = await Artifact.findByIdAndUpdate(req.params.id, {
        $push: { comments: { user: req.user.id, text: req.body.text } },
    }, { new: true });
    res.json(artifact);
}

module.exports = {
    createArtifact
};