const buildUrl = (version, path) => `/api/v${version}/${path}`;

module.exports = {
  buildUrl,
};
