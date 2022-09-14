# CRUD Project

## Vue.js 와 Node.js를 사용하여 메모, 글을 올리고 관리하는 서비스 개발

### 구현 목표

> 1. 포스트를 올리고, 삭제하고, 수정하는 것까지 구현
> 2. 작성시간, 수정시 수정할 시간 표시

### 구현 시 생긴 문제점
>
> 1. deleate(insertOne) / upload(uploadOne) 시 몽고디비의 objectId 를 가졍오는데 발생한 오류  
        "server stated on port 5000 (node:56736) unhandledpromiserejectionwarning: bsontypeerror: argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer"  
                메세지가 나오면서 서버 통신 오류가 발생  
                
                    ```javascript  
                    
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
                            content: req.body.content,
                            date: req.body.date,
                            createAt: new Date().toLocaleString(),
                            fix: false,
                        });
                        res.status(201).send();
                    })

                    // delete post
                    router.delete('/:id', async (req, res) => {
                    try {
                        const post = await loadPostCollection();
                        await post.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
                        res.status(200).send();
                    } catch (error) {
                            console.log(error);
                    }
                    })

                    // edit post

                    router.post('/edit/:id', async (req, res) => {
                    try {
                        const post = await loadPostCollection();
                        await post.updateOne(
                            { _id: new mongodb.ObjectId(req.params.id)},
                            {
                            $set: {
                                text: req.body.text,
                                content: req.body.content,
                                date: req.body.date,
                                createAt: new Date().toLocaleString(),
                                fix: true,
                            }
                            }
                        );
                        res.status(201).send();
                    } catch (error) {
                        console.log(error);
                    }
                    })

                    async function loadPostCollection() {
                        const client = await mongodb.MongoClient.connect('mongodb+srv://e759ksh:tkgl5012qq21@cluster0.bgjpc.mongodb.net/?retryWrites=true&w=majority', {
                            useNewUrlParser: true
                        });

                        return client.db('todoapp').collection('post')
                    }

                    module.exports = router;

                    
                    ```  
