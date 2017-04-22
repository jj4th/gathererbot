'use strict';
const include = require('lodash').includes,
    MtgJson = require('./api/mtgjson'),
    TcgPlayer = require('./api/tcgplayer'),
    Clash = require('./command/clash'),
    Search = require('./command/search'),

// Configuration
const HUBOT_BLACKLIST = process.env.HUBOT_BLACKLIST || '';
const TCG_KEY = process.env.TCG_KEY
const DATA_FILENAME = '../data/allSets';


let printCard = (card) => {

};

let printList = (cards) => {

};

let printNoMatch = (match) => {
    return `No card found matching query: ${match}`;
};

module.exports = (robot) => {
    let mtg = new MtgJson({filename: DATA_FILENAME});
    let tcg = new TcgPlayer({pk: TCG_KEY});
    let search = new Search({cardApi: mtg, priceApi: tcg});

    let printResult = (cards, match) => {
        let msg = '';

        if (!cards.length) {
            msg = printNoMatch(match);
        } else if (cards.length === 1) {
            msg = printCard(cards[0]);
        } else {
            msg = printList(cards);
        }

        robo.send(msg);
    }

    // Blacklist at the middleware level
    robot.receiveMiddleware((context, next, done) => {
        let channelID = context.response.envelope.room;
        let channelName = robot.adapter.client.rtm.dataStore.getChannelGroupOrDMById(channelID).name;
        if (includes(HUBOT_BLACKLIST.split(','), channelName)) {
            context.response.message.finish();
            done();
        }
    });

    robot.respond(/clash\s+(@\w+)/i, (robo) => {
        [card1, card2] = search.query({limit: 2, orderBy: 'random'});  

        let clashOpts = {
            player1: '@' + robo.message.user.name,
            player2: robo.match[1],
            card1: card1,
            card2: card2
        };

        let clash = new Clash(clashOpts);

        robo.send(clash.resolve());
    });
    
    robot.respond(/random/i, (robo) => {
        cards = search.query({limit: 1, orderBy: 'random'});        
        printResult(cards);
    });

    robot.respond(/help/i, (robo) => {
        robo.send(HELP_TEXT);
    });

    robot.response(/search\s+(.*)/i, (robo) => {
        let match = robo.match[1];
            
        if (match === 'next') {
            cards = search.next();
        } else if (match === 'prev') {
            cards = search.prev();
        } else if (!isNaN(match)) {
            cards = [search.select(parseInt(match, 10))];
        } else {
            let query = search.parseQuery(match);
            cards = search.query(query);
        }

        printResult(cards, match);
    });

    robot.response(/sets\s+(.*)/i, (robo) => {
        let match = robo.match[1];
        cards = search.query({name: match, exactName: true, listSets: true});

        printResult(cards, match);        
    });
    
    robot.hear(/\[\[[^\]]+\]\]/g, (robo) => {
        robo.match.forEach((value) => {
            cards = search.query({name: match, exactName: true, orderBy: 'random'});

            printResult(cards, match);
        });
    });
};
