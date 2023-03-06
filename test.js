class UrlBuilder {
  // Use console.log for debugging

  constructor() {
    this.url;
    this.aport;
    this.ahost;
    this.abuild;
    this.apath;
    this.aqueryParams;
    this.port;
    this.host;
    this.build;
    this.path;
    this.scheme = 'http';
  }
  host(host) {
    if (host) {
      this.ahost = host;
    }
    return this;
  }
  port(port) {
    if (port) {
      this.aport = port;
    }
    return this;
  }
  path(path) {
    if (path) {
      this.apath = path;
    }
    return this;
  }
  queryParams(data) {
    if (data) {
      this.aqueryParams = Object
        .keys(data)
        .map(value => `${value}=${encodeURIComponent(data[value])}`)
        .join('&');
    }
    return this;
  }
  https() {
    this.scheme = 'https';
  }
  build() {

    if (this.ahost) {
      this.url = `${this.scheme}://${this.ahost}`;
    }
    this;
  }

}

// module.exports = UrlBuilder;

const a = new UrlBuilder()
  .host('codility.com')
  // .path('/test/hello/world')
  // .queryParams({ key1: 'value1', key2: 'value2' })
  .build(); // http://codility.com/test/hello/world?key1=value1&key2=value2
