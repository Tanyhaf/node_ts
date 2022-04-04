import express, { Request, Response } from 'express';
import 'reflect-metadata';
import { createConnection, getManager } from 'typeorm';
import { User } from './entity/user';
import { Post } from './entity/post';
import { Comment } from './entity/comments';

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get('/users', async (req:Request, res:Response) => {
    const users = await getManager().getRepository(User).find({ relations: ['posts'] });
    res.json(users);
});

app.get('/posts/:userId', async (req:Request, res:Response) => {
    try {
        const userPosts = await getManager().getRepository(Post)
            .createQueryBuilder('post')
            .where('post.userId = :id', { id: +req.params.userId })
            .leftJoin('User', 'user', 'user.id = post.userId')
            .getMany();
        res.json(userPosts);
    } catch (e) {
        console.log(e);
    }
});

app.get('/comments/:userId', async (req, res) => {
    const comments = await getManager().getRepository(Comment)
        .createQueryBuilder('comment')
        .where('comment.authorId = :id', { id: +req.params.userId })
        .leftJoin('comment.user', 'user')
        .leftJoin('comment.post', 'post')
        .getMany();
    res.json(comments);
});

app.post('/users', async (req, res) => {
    const createdUser = await getManager().getRepository(User).save(req.body);
    res.json(createdUser);
});
app.patch('/posts/:userId', async (req, res) => {
    const { text } = req.body;
    const updatePost = await getManager()
        .getRepository(Post)
        .update({ id: Number(req.params.userId) }, {
            text,
        });
    res.json(updatePost);
});

app.patch('/users:id', async (req, res) => {
    const { password, email } = req.body;
    const updateUser = await getManager()
        .getRepository(User)
        .update({ id: Number(req.params.id) }, {
            password,
            email,
        });
    res.json(updateUser);
});
app.delete('/users/:id', async (req, res) => {
    const deleteUser = await getManager()
        .getRepository(User)
        .softDelete({ id: Number(req.params.id) });
    res.json(deleteUser);
});

app.listen(5500, async () => {
    console.log('Server has started');
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected');
        }
    } catch (err) {
        if (err) console.log(err);
    }
});
