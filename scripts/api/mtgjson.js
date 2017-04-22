'use strict';

class MtgJson {
    constructor({filename}) {
        this.data = {};
        if (filename !== undefined) {
            this.data = require(filename);
        }
    }
}

module.exports = MtgJson;
