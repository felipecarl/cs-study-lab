# Binary

## Number logic
- Like an incrementary
1 | 2 | 4 | 8 | 16 | 32
0 | 1 | 1 | 0 | 1  | 1 = 2 + 4 + 6 = 22

## 8 bits
- 256 options -> 0 to 255
- Like 256 colors
- 8 bits = 1 byte

## 32 bits
- Most computers use the first bit says positive or negative number
- 0 for negative, 1 for positive
- This allows ranging from -2.147.483.648 to + 2.147.483.647

## 64 bits
- While 32 bits is a lot, it is not enough for counting world population for example
- The largest number a 64 bit can represent is around 9.2 quintillion

## Floating point number
- The dot can be anywhere
- Most common method to represent is the IEEE 754 standard
- In a 32bit number
  - bit 1 stores + or - (1 bit)
  - bits 2 - 9 store the exponent (8 bits)
  - bits 10 - 32 the significand (23 bits)

## ASCII
- American Standard Code for Information Interchange
- 7-bit code enough to store 128 diff values
- Invented in 1963
- Later using the 8 bit to increase more chars
- Issue was that each country used it differently, so text made no sense

## Unicode 
- Created in 1992 to solve the problems that ASCII had
- Most common version uses 16 bits, space for over a million codes
- Sobra espaço para emojis