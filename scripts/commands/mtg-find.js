var consts = require('../../static/consts'),
    utils = require('../utils/utils'),

    find = require('lodash/collection/find'),
    isEmpty = require('lodash/lang/isEmpty'),
    pluck = require('lodash/collection/pluck'),
    reduce = require('lodash/collection/reduce'),

    CARD_LIMIT = consts.CARD_LIMIT,
    FIND_CMD_ERROR = consts.FIND_CMD_ERROR;

function getCardPoolSizeString(sampleSize, poolSize) {
    return 'Displaying ' + sampleSize + ' out of ' + poolSize + ' cards:';
}

function getCardNotFoundError(cardName) {
    return 'We could not find the card ' + cardName + '. Please try again.';
}

module.exports = {
    // Returns the number of cards found.
    parseResponse: function(robo, body, cardName, urlParams, select, offset) {
        var cardDetails,
            gathererBaseUrl,
            gathererParams,
            gathererUrl,
            cardPoolSize,
            cardSample,
            cardSampleNames,
            cardSampleText,
            cards = JSON.parse(body),
            card = (isEmpty(cards) || !cardName) ? undefined : find(cards, function(card){
                return cardName.toLowerCase() === card.name.toLowerCase();
            });

        // If find() comes back with a match that means it found the exact card the user was
        // looking for. Otherwise, that means the service has found more than one match.
        if (card) {
            cardDetails = utils.getCardDetails(card);
            utils.sendDetails(robo, cardDetails);

        } else if (select != null) {
            if (select > 0 && select <= cards.length) {
                card = cards[select - 1];
                cardDetails = utils.getCardDetails(card);
                utils.sendDetails(robo, cardDetails);
            } else {
                robo.send('Please specify a number in the range 1-' + cards.length);
            }

        } else if (offset && offset > cards.length) {
            robo.send('You have specified an out of bounds page.');

        } else if (cards.length > 0) {
            // Grab the first X amount of cards, which is determined from the constant cardLimit.
            // Then print off the name of each card.
            cardSample = cards.slice(offset, offset + CARD_LIMIT);
            cardSampleNames = pluck(cardSample, 'name');
            cardSampleText = reduce(cardSampleNames, function (cardList, cardName, index) {
                var cardNum = offset + index + 1;
                return cardList + '\n' + cardNum + '. ' + cardName;
            }, '');
            cardPoolSize = getCardPoolSizeString(cardSample.length, cards.length);

            gathererBaseUrl = consts.urlMap.gathererAdvanced;
            gathererParams = utils.parseGathererUrlParams(urlParams);

            robo.send(cardPoolSize + '\n' + cardSampleText);

        } else {
            robo.send(getCardNotFoundError(cardName));
        }

        return cards.length;
    },

    parseCommandError: function(robo, err) {
        robo.send(FIND_CMD_ERROR);
    },

    parseServerError: function(robo, err) {
        robo.send(consts.defaultError);
    }
};
