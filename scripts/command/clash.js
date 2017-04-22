module.exports = (card1, card2, player1, player2) => {
    let msg = `${player1} has challenged ${player2} to a mtg clash!\n`;
        + `${player1} drew ${card1.name} which has a converted mana cost of ${card1.cmc}\n`
        + `${player2} drew ${card2.name} which has a converted mana cost of ${card2.cmc}\n`;

    if (card1.cmc === card2.cmc) {
        msg += 'It\'s a draw!';
    } else if (card1.cmc > card2.cmc) {
        msg += '${player1} is the winner!';
    } else {
        msg += '${player2} is the winner!';
    }
    
    return msg;
};
