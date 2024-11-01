class RateLimiter {
    constructor(options) {
      this.redis = options.redis;
      this.key = options.key;
      this.windowSize = options.windowSizeInSeconds;
      this.maxRequests = options.maxRequests;
    }
  
    async canProceed() {
      const currentCount = await this.getCurrentCount();
      return currentCount < this.maxRequests;
    }
  
    async waitForNextSlot() {
      while (!(await this.canProceed())) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
  
    async getCurrentCount() {
      const now = Date.now();
      const windowStart = now - (this.windowSize * 1000);
      
      const key = `${this.key}:requests`;
      await this.redis.zremrangebyscore(key, '-inf', windowStart);
      return await this.redis.zcount(key, '-inf', '+inf');
    }
  }

  module.exports = RateLimiter;