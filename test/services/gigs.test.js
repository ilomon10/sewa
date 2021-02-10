const assert = require('assert');
const app = require('../../src/app');

describe('\'gigs\' service', () => {
  it('registered the service', () => {
    const service = app.service('gigs');

    assert.ok(service, 'Registered the service');
  });
});
