const Base = require('./base')

class classModels extends Base{
    constructor(props = 'class'){
        super(props);
    }
}

module.exports = new classModels();