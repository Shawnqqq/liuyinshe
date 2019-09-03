const Base = require('./base')

class user_lessonModels extends Base{
    constructor(props = 'user_lesson'){
        super(props);
    }
}

module.exports = new user_lessonModels();