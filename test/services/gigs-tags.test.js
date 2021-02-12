const assert = require('assert');
const app = require('../../src/app');

describe('\'gigsTags\' service', () => {
  it('registered the service', () => {
    const service = app.service('gigs-tags');

    assert.ok(service, 'Registered the service');
  });
});
