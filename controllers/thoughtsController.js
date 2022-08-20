const {User, Thoughts} = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thoughts.find ({})
        .then((thought) => {
            res.status(200).json(thought)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    },
    getSingleThought (req, res) {
        Thoughts.findOne({ _id: req.params.thoughtId })
                .select('-__v')
                .then((thought)=> {
                    !thought
            ? res.status(404).json({ message: 'No thought with that id' })
            : res.json(thought)
                })
    },
    createThought (req, res) {
        Thoughts.create(req.body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                { _id: req.params.userId},
                {$push: { thoughts: _id } },
                { new: true }
            )
        })
        .then((thought)=> {
            !thought
            ? res.status(404).json({ message: 'No user with that id' })
            : res.json(thought)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    },
    updateThought (req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thought)=> {
            !thought
            ? res.status(404).json({ message: 'No thought with that id' })
            : res.json(thought)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    },
    deleteThought (req, res) {
        Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought)=> {
            !thought
            ? res.status(404).json({ message: 'No thought with that id' })
            : res.json(thought)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    },
    createReaction (req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $pull: {reactions: {reactionId: req.params.reactionId}}},
            { new: true }
        )
        .then((dbThoughtsData) => {
            if (!dbThoughtsData) {
                res
                    .status(404)
                    .json({ message: 'No thoughts with that id' })
                return
            }
            res.json(dbThoughtsData)
        })
        .catch((err)=> {
            res.status(400).json(err)
        })
    }
}
    