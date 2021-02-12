const assert = require('assert');
const app = require('../../src/app');

describe('\'gigsMedia\' service', () => {
  it('registered the service', () => {
    const service = app.service('gigs-media');

    assert.ok(service, 'Registered the service');
  });
});
