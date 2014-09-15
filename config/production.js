module.exports = {
  dataSources: {
    db: {
      defaultForType: 'db',
      connector: 'mongodb',
      url: process.env.MONGO_URI
    }
  }
};
