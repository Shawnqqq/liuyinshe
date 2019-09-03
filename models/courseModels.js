const Base = require('./base')

class courseModels extends Base{
    constructor(props = 'course'){
        super(props);
    }
}

module.exports = new courseModels();