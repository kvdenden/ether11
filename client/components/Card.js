import React, { Component } from 'react';
import gql from 'graphql-tag'

const cardFragment = gql`
  fragment CardFragment on Card {
    cardId
    info {
      name
    }
  }
`;

class Card extends Component {
  static fragments = {
    entry: cardFragment
  }

  render() {
    const { card } = this.props;
    return (
      <div>
        <h3>{card.info.name}</h3>
        <p>Card #{card.cardId}</p>
      </div>
    );
  }
}

export default Card;
