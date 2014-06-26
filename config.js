var config = {}
config.couchbase = {};

config.couchbase.host = "localhost";
config.couchbase.port = "8091";
config.couchbase.user = "admin";
config.couchbase.pass = "password";
config.couchbase.bucket = "test";
config.couchbase.docName = "test";
config.couchbase.viewName = "test";
config.couchbase.queryHosts = ["localhost:8093"]; // Hosts used to run N1QL queries
config.n1qlquery = "SELECT * FROM test WHERE num % 2 = 0";

config.purgeBucket = false;

module.exports = config;