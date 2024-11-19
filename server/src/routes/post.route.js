import Post from './../models/post.model.js';

const postRoutes = async (fastify, options) => {
  fastify.get('/posts', async (request, reply) => {
    try {
      const posts = await Post.find();
      reply.send(posts);
    } catch (err) {
      reply.status(500).send({ error: err.message });
    }
  });

  fastify.post('/posts', async (request, reply) => {
    try {
      const { title, content } = request.body;
      const newPost = new Post({ title, content });
      await newPost.save();
      reply.status(201).send(newPost);
    } catch (err) {
      reply.status(500).send({ error: err.message });
    }
  });

  fastify.get('/posts/:id', async (request, reply) => {
    try {
      const post = await Post.findById(request.params.id);
      if (!post) {
        reply.status(404).send({ message: 'Пост не знайдено' });
      } else {
        reply.send(post);
      }
    } catch (err) {
      reply.status(500).send({ error: err.message });
    }
  });

  fastify.put('/posts/:id', async (request, reply) => {
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        request.params.id,
        request.body,
        { new: true }
      );
      if (!updatedPost) {
        reply.status(404).send({ message: 'Пост не знайдено' });
      } else {
        reply.send(updatedPost);
      }
    } catch (err) {
      reply.status(500).send({ error: err.message });
    }
  });

  fastify.delete('/posts/:id', async (request, reply) => {
    try {
      const deletedPost = await Post.findByIdAndDelete(request.params.id);
      if (!deletedPost) {
        reply.status(404).send({ message: 'Пост не знайдено' });
      } else {
        reply.send({ message: 'Пост успішно видалено' });
      }
    } catch (err) {
      reply.status(500).send({ error: err.message });
    }
  });
}

export default postRoutes;
