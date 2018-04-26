pragma solidity ^0.4.21;
import "zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol";

contract Cards is ERC721Token("Ether11 Token", "E11"), Ownable {
    struct Card {
        uint32 cardId;
    }

    mapping (uint256 => Card) cards;
    uint256 nextTokenId;

    function Cards() public {}

    function getCard(uint256 _tokenId) public view returns (uint32) {
        Card storage card = cards[_tokenId];
        return card.cardId;
    }

    function mint(address _to, uint32 _cardId) public onlyOwner {
        super._mint(_to, nextTokenId);
        cards[nextTokenId] = Card(_cardId);
        nextTokenId = nextTokenId.add(1);
    }

    function burn(uint256 _tokenId) public onlyOwnerOf(_tokenId) {
        super._burn(ownerOf(_tokenId), _tokenId);
    }
}
