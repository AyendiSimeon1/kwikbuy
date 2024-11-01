class SessionManager {
    constructor(redis) {
      this.redis = redis;
    }
  
    async getSession(phoneNumber) {
      const session = await this.redis.get(`session:${phoneNumber}`);
      return session ? JSON.parse(session) : null;
    }
  
    async createSession(phoneNumber, chatbotId) {
      const session = {
        id: uuidv4(),
        phoneNumber,
        chatbotId,
        currentNode: null,
        variables: {},
        createdAt: new Date(),
        updatedAt: new Date()
      };
  
      await this.redis.set(
        `session:${phoneNumber}`,
        JSON.stringify(session),
        'EX',
        24 * 60 * 60 // 24 hours expiry
      );
  
      return session;
    }
  
    async updateSession(phoneNumber, updates) {
      const session = await this.getSession(phoneNumber);
      if (!session) {
        throw new Error('Session not found');
      }
  
      const updatedSession = {
        ...session,
        ...updates,
        updatedAt: new Date()
      };
  
      await this.redis.set(
        `session:${phoneNumber}`,
        JSON.stringify(updatedSession),
        'EX',
        24 * 60 * 60
      );
  
      return updatedSession;
    }
  }
  