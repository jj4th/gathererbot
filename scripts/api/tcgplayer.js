'use strict';

class TcgPlayer {
    constructor({pk}) {
        this.pk = '';
        if (pk !== undefined) {
            this.pk = require(pk);
        }
    }
}

module.exports = TcgPlayer;
