import Card from './Card';

export default ({ cards }) => {
  console.log(cards);
  return (<ul>
    {cards.map(card => (<li key={card.tokenId}><Card {...card} /></li>))}
  </ul>);
}
