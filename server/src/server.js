import Fastify from 'fastify';
import db from './plugins/db.js';
import postRoutes from './routes/post.route.js';

const fastify = Fastify({ logger: true });

fastify.register(db);

fastify.register(postRoutes, { prefix: '/api' });

fastify.get('/', async (request, reply) => {
  console.log('health check');
  return { hello: 'world' };
});

const start = async () => {
  try {
    await fastify.listen({ port: 5000 });
    fastify.log.info(`Server is running on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
