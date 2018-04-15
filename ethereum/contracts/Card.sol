pragma solidity ^0.4.21;
import "zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol";

contract Card is ERC721Token("Ether11 Card", "E11"), Ownable {
    function Card() public {}

    function mint(address _to, uint256 _tokenId) public onlyOwner {
        super._mint(_to, _tokenId);
    }

    function burn(uint256 _tokenId) public onlyOwnerOf(_tokenId) {
        super._burn(ownerOf(_tokenId), _tokenId);
    }
}
