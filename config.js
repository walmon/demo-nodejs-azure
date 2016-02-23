var config = {}

config.host = process.env.HOST || "https://demoopensouce.documents.azure.com:443/";
config.authKey = process.env.AUTH_KEY || "vhq3sZ57hb7SJj/u2zJc4kyULa9Ov4cvuf/OW7RXWcZqcJCTERi+6N6LqR4Lz4/eYvep+39h6i55bV65Ndu3VQ==";
config.databaseId = "MyApp";
config.collectionId = "Users";

module.exports = config;