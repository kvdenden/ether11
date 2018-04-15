pragma solidity ^0.4.21;
import "zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol";

contract Card is ERC721Token("Ether11 Card", "E11"), Ownable {
  function Card() public {}
}
