const Base = require('./base')

class leaveModels extends Base{
    constructor(props = 'leave'){
        super(props);
    }
}

module.exports = new leaveModels();