exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL      ||
                       'mongodb://localhost/net-db';
exports.TEST_DATABASE_URL = (process.env.TEST_DATABASE_URL ||
                            'mongodb://localhost/test-net-db');
exports.PORT = process.env.PORT || 8080;