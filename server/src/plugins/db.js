import fastifyPlugin from 'fastify-plugin';
import mongoose from 'mongoose';

async function dbConnector(fastify) {
  try {
    const dbUri = process.env.MONGO_URI || 'mongodb+srv://olehmuz87:Oo2SCJnyiiJgH91Y@capacity-db.mfn0b.mongodb.net/?retryWrites=true&w=majority&appName=Capacity-db';

    await mongoose.connect(dbUri);

    fastify.log.info('MongoDB connected');
  } catch (error) {
    fastify.log.error('MongoDB connection error:', error);
    throw error;
  }
}

export default fastifyPlugin(dbConnector);
