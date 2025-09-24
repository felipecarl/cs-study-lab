# Memory

## Addresses
- For example if we make a memory in a 16x16 grid, meaning its a 256 bits memory, we can have two 4bit numbers to find the address of each bit. 
- For this, two multiplexers can be used, to define which column/row will be selected.
- Using abstraction, for a 256-bit memory, we will need 8 bit address, 1 data wire, 1 write enable wire, 1 read enable wire.
- For a 256 bytes memory, that's 8 abstracted 256 bits memories, where each one of the will store one bit of the 8 bit number, so 256 bytes storage, always a entire byte.
- Registers are small memories
- RAMs are bigger, many storage addresses