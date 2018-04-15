pragma solidity ^0.4.21;
import "zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

contract Card is ERC721Token("Ether11 Card", "E11") {
    function Card() public {}
}
