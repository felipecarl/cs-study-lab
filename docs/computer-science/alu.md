# ALU or Arithmetic Logic Unit
- Has a logic unit and a arithmetic unit

## Arithmetic Unit
- Responsible for handling numerical operations
- Subtraction, addition...
- Like add one to a number

## Overflow
- When the result of an addition is too large to be represented by the number of bits used

## 8 bit ripple carry adder
A0 -> |HALF | -> sum0
B0 -> |ADDER| -> carry -> |FULL |
A1 ->                     |     | -> sum1
B1 ->                     |ADDER| -> carry
.
.
.
.                                          |FULL |
A7 ->                                      |     | -> sum7
B7 ->                                      |ADDER| -> carry (if 1, sum too large, overflow)