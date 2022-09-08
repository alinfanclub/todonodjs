const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// get post
router.get('/', async(req, res)=> {
    const post = await loadPostCollection();
    res.send(await post.find({}).toArray());
});

// add post
router.post('/', async (req, res) => {
    const post = await loadPostCollection();
    await post.insertOne({
        text: req.body.text,
        createAt: new Date()
    });
    res.status(201).send();
})

// delete post
router.delete('/:id', async (req, res) => {
    const post = await loadPostCollection();
    await post.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
    res.status(200).send();
})

async function loadPostCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://e759ksh:tkgl5012qq21@cluster0.bgjpc.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

    return client.db('todoapp').collection('post')
}

module.exports = router;