const Base = require('./base')

class lessonModels extends Base{
    constructor(props = 'lesson'){
        super(props);
    }
}

module.exports = new lessonModels();