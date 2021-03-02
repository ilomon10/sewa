const { AuthenticationBaseStrategy } = require('@feathersjs/authentication');

class AnonymousStrategy extends AuthenticationBaseStrategy {
  async authenticate() {
    return {
      anonymous: true
    };
  }
}

module.exports = AnonymousStrategy;