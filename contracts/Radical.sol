pragma solidity ^0.4.2;

contract Radical {

    struct Pixel {
        uint256 id;
        address owner;
        string color;
        uint opacity;
        uint price;
    }

    uint256 defaultPrice = 100;

    mapping(uint => Pixel) public pixels;

    uint public pixelCount;

    // voted event
    event soldEvent (
        uint indexed _pixelId
    );

    function Radical () public {
        addPixel(0x1235);
        addPixel(0x5367);
        addPixel(0x8947);
    }

    function addPixel (address _owner) private {
        pixelCount ++;
        
        pixels[pixelCount] = Pixel(pixelCount, _owner, "#9999ff", 80, defaultPrice);
    }

    function purchase(uint256 _pixelId, address _newOwner) public {

        pixels[_pixelId].owner = _newOwner;

        emit soldEvent(_pixelId);
    }
}
