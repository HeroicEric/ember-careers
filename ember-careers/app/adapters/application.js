var host = window.ENV.host;

export default DS.ActiveModelAdapter.extend({
  host: host,
  namespace: 'api/v1'
});
