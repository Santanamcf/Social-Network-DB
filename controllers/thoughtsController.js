const {User, Thoughts} = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thoughts.find ({})
        .select('-__v')
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
    createThought(req, res) {
        console.log(req.body);
        Thoughts.create({
          thoughtText: req.body.thoughtText,
          username: req.body.username,
        })
          .then((thought) => {
            User.findOneAndUpdate({_id: req.body._id}, { thoughts: [thought._id] })
            .then(()=>{
              res.json(thought)
            }).
            catch((error) => {
              console.log(error);
              return res.status(500).json({msg:" unable to add thought to user", error})
            })
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
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
    deleteReaction (req, res) {
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
    },
    createReaction (req,res) {
        Thoughts.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$push: {reactions: req.body}},
            {new: true, runValidators: true}
        )
        .then((thought) =>{
            if (!thought){
                res.status(404).json({msg: 'no thought found with this ID!'})
            } else {
                res.json(thought)
            }
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    },
    deleteReaction (req, res) {
        Thoughts.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {new: true}
        )
        .then((dbThoughtsData) => {
            if(!dbThoughtsData) {
                res.status(404).json({msg: 'no thoughts found with this ID'})
                return
            }
        })
    }
}
    