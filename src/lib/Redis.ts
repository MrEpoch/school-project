
import { Redis } from "ioredis";

export const redis = new Redis({  });

redis.on('error', (err) => {
  
});

export async function setCache(key: string, value: string, expire: number) {
  try {
    return await redis.set(key, value, "EX", expire);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getCache(key: string) {
  try {
    return await redis.get(key);
  } catch (error) {
    console.log(error);
    return null;
  }
}
