const MongoInMemory = require('mongo-in-memory');

module.exports = class MockMongo {

    constructor(options = {}) {
        this.port = options.port || 8000;
        this.mongoServerInstance = new MongoInMemory(this.port); //DEFAULT PORT is 27017
    }

    async start(dbname = 'mockerdb') {
        return new Promise((resolve, reject) => {
            this.mongoServerInstance.start((error, config) => {

                if (error) {
                    console.error(error);
                    reject(error)
                } else {
                    let mongouri = this.mongoServerInstance.getMongouri(dbname);
                    console.log('[CONNECTION_STRING]:', mongouri)
                    resolve(mongouri)
                }
            });
        })
    }
    stop() {
        return new Promise((resolve, reject) => {
            this.mongoServerInstance.stop((error) => {

                if (error) {
                    console.error(error);
                    reject(error)
                } else {
                    resolve()
                }

            })
        })
    }

}