
module.exports = {
  async up(db, client) {
    return db.collection('products').updateMany({priority: {$exists:false}}, { $set: { priority: "Medium" } });
  },

  async down(db, client) {
    return Promise.resolve('ok');
  }
};
