import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

let isConnected = false;
let hasAttemptedConnection = false;

redisClient.on('error', (err) => {
  if (!hasAttemptedConnection) {
    console.warn('Redis connection failed, continuing without cache:', err.message);
    hasAttemptedConnection = true;
  }
  isConnected = false;
});

redisClient.on('connect', () => {
  console.log('Redis connected successfully');
  isConnected = true;
  hasAttemptedConnection = true;
});

// Try to connect but don't fail if Redis is not available
(async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    if (!hasAttemptedConnection) {
      console.warn('Redis connection failed, continuing without cache');
      hasAttemptedConnection = true;
    }
    isConnected = false;
  }
})();

// Wrapper functions to handle Redis operations safely
export const getFromCache = async (key: string): Promise<string | null> => {
  if (!isConnected) return null;
  try {
    return await redisClient.get(key);
  } catch (error) {
    return null;
  }
};

export const setInCache = async (key: string, value: string, ttl?: number): Promise<void> => {
  if (!isConnected) return;
  try {
    if (ttl) {
      await redisClient.setEx(key, ttl, value);
    } else {
      await redisClient.set(key, value);
    }
  } catch (error) {
    // Silently fail
  }
};

export const deleteFromCache = async (key: string): Promise<void> => {
  if (!isConnected) return;
  try {
    await redisClient.del(key);
  } catch (error) {
    // Silently fail
  }
};

export default redisClient;