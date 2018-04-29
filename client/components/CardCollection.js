import React, { Component } from 'react';
import gql from 'graphql-tag';
import { groupBy } from 'lodash';
import Card from './Card';

const cardCollectionFragment = gql`
  fragment CardCollectionFragment on CardToken {
    card {
      cardId
      ...CardFragment
    }
  }
  ${Card.fragments.entry}
`;

class CardCollection extends Component {
  static fragments = {
    entry: cardCollectionFragment
  }

  render() {
    const { tokens } = this.props;
    console.log(tokens)
    const tokensByCard = Object.entries(
      groupBy(tokens, token => token.card.cardId)
    );
    return (
      <ul>
        {
          tokensByCard.map(([cardId, tokens]) => (
            <li key={cardId}>
              <Card card={tokens[0].card} />
              x{tokens.length}
            </li>
          ))
        }
      </ul>
    );
  }
}

export default CardCollection;
