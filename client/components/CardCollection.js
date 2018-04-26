import Card from './Card';

export default ({ cards }) => {
  return (<ul>
    {cards.map(card => (<li key={card.tokenId}><Card {...card} /></li>))}
  </ul>);
}
