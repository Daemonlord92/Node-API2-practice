const router = require('express').Router();
const Post = require('../../data/db')


router.get('/', (req, res) => {
    console.log(req.query)
    Post.find(req.query)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(err => {
            res.status(500).json({
                mes: 'Error retriving the posts'
            })
        })
})

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({
                    mes: 'Post was not found'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                mes: 'Error grabbing the posts'
            })
        })
})

router.get('/:id/comments', (req, res) => {
    Post.findById(req.params.id)
        .then((data) => {
           if (data.length !== 0) {
               Post.findPostComments(req.params.id)
                   .then((data) => {
                       res.status(200).json(data)
                   })
                   .catch((data) => {
                       res.status(500).json({ err: 'The comments could be found'})
                   })
           } else {
               res.status(404).json({
                   err: ""
               })
           }
        })
})

router.post('/', (req, res) => {
    Post.insert(req.body)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            res.status(500).json({
                mes: 'Error adding to post'
            })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params

    Post.remove(id)
        .then(id => {
            if (id === 0) {
                res.status(400).json({ err: "That post doesn't exist"})
            } else {
                res.status(200).json({
                    mes: 'Post destroyed'
                })
            }
        })
        .catch(err => {
            res.status(404).json({
                err: "Post not found"
            })
        })
})

router.put('/:id', (req, res) => {
    Post.update(req.params.id, req.body)
        .then(post =>{
            if (post) {
                res.status(200).json({ mes: 'The post has been updated.' })
            } else {
                res.status(404).json({ err: 'The post could not be found.'})
            }
        })

})

module.exports = router;
