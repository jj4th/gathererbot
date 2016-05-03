// Description:
//   A simple hubot that queries the deckbrew service for specific cards.
//
// Commands:
//   hubot mtg find [search param1]=[search value1] ...
//   hubot mtg find [card name] - both commands query the service and return the exact match,
//                                if it exists, or names of other partially matched cards.
//
//   hubot mtg random - this command will query the service for a random card.
//
//   hubot mtg clash [@handler] - this command will query the service for two random cards and
//                                then compare their converted mana costs to see which is higher
//
// Author:
//   HerrPfister and wickerpopstar


var api = require('./utils/api'),
    mtgFind = require('./commands/mtg-find'),
    mtgClash = require('./commands/mtg-clash'),
    mtgRandom = require('./commands/mtg-random'),
    utils = require('./utils/utils'),
    consts = require('../static/consts'),
    urlMap = consts.urlMap,
    lastMatch = null,
    page = 0,
    maxPage = 0,
    Q = require('q');

module.exports = function (robot) {
    robot.respond(/clash\s+(@\w+)/i, function(robo) {
        Q.all([ api.getRandomMultiverseId(robot), api.getRandomMultiverseId(robot) ])
            .done(function(multiverseIds) {
                Q.all([ api.getRandomCard(robot, multiverseIds[0]), api.getRandomCard(robot, multiverseIds[1]) ])
                    .done(function(cards) {
                        var challenger = { name: robo.message.user.name, card: cards[0] };
                        var challenged = { name: robo.match[1], card: cards[1] };

                        mtgClash.resolveClash(robo, challenger, challenged);
                    });
            });
    });

    robot.respond(/random/i, function(robo) {
        api.getRandomMultiverseId(robot)
            .then(function(multiverseId){
                return api.getRandomCard(robot, multiverseId);
            })
            .done(function(card){
                mtgRandom.parseResponse(robo, card);
            });
    });

    robot.respond(/help/i, function(robo) {
        robo.send(consts.helpText);
    });

    robot.hear(/^tutor\s+(.*)/i, function (robo) {
        var curMatch = robo.match[1];

        if (curMatch.indexOf('random') > -1 || curMatch.indexOf('clash') > -1 || curMatch.indexOf('help') > -1) {
            return true;
        }

        var select = null;
        if (curMatch == 'next') {
            if (page < maxPage) {
                page++;
            }
            curMatch = lastMatch;
        } else if (curMatch == 'prev') {
            if (page > 0) {
                page--;
            }
            curMatch = lastMatch;
        } else if (!isNaN(curMatch)) {
            select = parseInt(curMatch);
            curMatch = lastMatch;
        } else {
            page = 0;
            lastMatch = curMatch;
        }

        var cardName = utils.getCardName(curMatch),
            urlParams = utils.parseUrlParams(curMatch),
            offset = page * consts.CARD_LIMIT;

        robot.http(urlMap.deckBrewBase + urlParams)
            .header('Accept', 'application/json')
            .get()(function(err, res, body){
                if (err) {
                    mtgFind.parseServerError(robo, err);
                } else if (utils.hasErrorCode(res.statusCode)) {
                    mtgFind.parseCommandError(robo, err);
                } else {
                    var cards = mtgFind.parseResponse(robo, body, cardName, urlParams, select, offset);
                    maxPage = Math.floor(cards / consts.CARD_LIMIT);
                }
            });
    });
};
