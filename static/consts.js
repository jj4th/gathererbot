module.exports = {
    CARD_LIMIT: 10,
    DETAILS_ERROR: 'There was an issue retrieving the cards\'s details. Please try again.',
    FIND_CMD_ERROR: 'Invalid parameters. Please make sure that parameters are separated by a comma.',
    helpText: 'For simple searches, just `tutor cardName`.' +
        ' \n\nFor more complex searches, you may specify: `color`, `format`, `oracle`, `rarity`, `set`, `subtype`, `type`' +
        ' as in `tutor color=white`.' +
        ' \nMultiple parameters should be separated with a semi-colon as in: `tutor color=white; type=instant`.' +
        ' \n\nIf a search returns more than one result, please be more specific, or retrieve one of the listed cards by' +
        ' searching for its number.' +
        ' \nFor example `tutor 1` will return the first card in the list.' +
        ' \nIf a search has more results than display on one page, `tutor next` and `tutor prev` will move between pages.',
    defaultError: 'There was an issue with your request. Please try again.',
    gathererColorMap: {
        blue: 'u',
        red: 'r',
        green: 'g',
        black: 'b',
        white: 'w'
    },
    gathererRarityMap: {
        common: 'c',
        uncommon: 'u',
        rare: 'r',
        mythic: 'm'
    },
    gathererUrlKeyMap: {
        color: 'color=+',
        format: 'format=+',
        oracle: 'text=+',
        rarity: 'rarity=+',
        set: 'set=+',
        subtype: 'subtype=+',
        type: 'type=+'
    },
    responseErrorCodes: [
        400,
        500
    ],
    urlMap: {
        deckBrewBase: 'https://api.deckbrew.com/mtg/cards?',
        deckBrewMultiverseId: 'https://api.deckbrew.com/mtg/cards?multiverseid=',
        gatherer: 'http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=',
        gathererAdvanced: 'http://gatherer.wizards.com/Pages/Search/Default.aspx?action=advanced&',
        gathererRandom: 'http://gatherer.wizards.com/Pages/Card/Details.aspx?action=random'
    }
};
