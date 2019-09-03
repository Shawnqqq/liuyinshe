const Base = require('./base')

class userModels extends Base{
    constructor(props = 'payment'){
        super(props);
    }
}

module.exports = new userModels();