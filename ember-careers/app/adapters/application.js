var host = window.ENV.host;

export default DS.RESTAdapter.extend({
  host: host,
  namespace: 'api/v1'
});
