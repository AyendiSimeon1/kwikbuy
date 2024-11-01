class MessageQueue {
  constructor(redis, queueName) {
    this.redis = redis;
    this.queueName = queueName;
  }

  async addToQueue(message) {
    await this.redis.rpush(
      this.queueName,
      JSON.stringify(message)
    );
  }

  async processQueue(handler, options = {}) {
    while (true) {
      const message = await this.redis.blpop(
        this.queueName,
        options.timeout || 0
      );

      if (message) {
        try {
          await handler(JSON.parse(message[1]));
        } catch (error) {
          await this._handleFailedMessage(message[1], error);
        }
      }
    }
  }

  async _handleFailedMessage(message, error) {
    await this.redis.rpush(
      `${this.queueName}:failed`,
      JSON.stringify({
        message: JSON.parse(message),
        error: error.message,
        timestamp: Date.now()
      })
    );
  }
}

module.exports = MessageQueue;