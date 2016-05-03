module.exports = {
    helpText: 'For simple searches, just `tutor cardName`.' +
        ' \nFor more complex searches, you may specify: `color`, `format`, `oracle`, `rarity`, `set`, `subtype`, `type`' +
        ' as in `tutor color=white`.  Multiple parameters should be separated with a semi-colon as in:' +
        ' `tutor color=white; type=instant`.' +
        ' \nIf a search returns more than one result, please be more specific, or retrieve one of the listed cards by' +
        ' searching for its number, for example `tutor 1` will return the first card in the list.',
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
