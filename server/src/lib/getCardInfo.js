import cards from '../data/cards.json'

const cardsMap = new Map(cards.map(card => [card.cardId, card]));

const getCardInfo = cardId => {
  return cardsMap.get(cardId);
}

export default getCardInfo;
