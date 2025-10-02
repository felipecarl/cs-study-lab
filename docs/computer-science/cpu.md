# CPU

## Clock speed
- The speed at which cpu can carry out each step of the fetch-decode-execute cycle
- Measured in hertz, cycles per second, so 1hz is 1 cycle each second
- Todays computers have giga hertz speed, or billions of cpu cycles every second
- Overclocking means increasing this speed, doing more operations per second
- Underclocking is the opposite, useful to reduce energy usage
- This capacity of changing clock speed is called dynamic frequency scaling

## History
- First single chip cpu was the intel 4004, a 4 bit cpu released in 1971, it had an speed of 740 kilohertz, or 740 thousand cycles per second

## Instruction Length
- 32 or 64 bits for example, is the amount of bits of length for an instruction
- Example in a 8 bit, 4 bits are the instruction and the rest is the address, this is called `immediate value`

## x86 vs ARM
- x86
  - x86 is more focused on performance
  - Based on CISC (complex instrction set computer)
  - Offer more instructions, but more power is required to decode them
- ARM
  - ARM is more focused on efficiency
  - Based on RISC (reduced instruction set computer)
  - Can be used emulation to run x86 in them
  - More widely used, in electronic devices such as smartphones, tablets, multimedia players and other mobibe devices like wearables, because of the reduced instruction set, less transistors are required, enabling a smaller die size for the IC

## Cache
- Loading data to and from RAM takes time, so a clever solution for that is to have a small storage inside the CPU, so it is closer to it, this is called a cache
- The values are transmited in blocks to the cache
- Retrieving data from RAM can take many clock cycles, retrieving data from cache usually takes just one clock cycle
- Dirty bit, is a bit that informs the need to write the cached data back to the RAM, because of changed data

## Pipelined instructions
- On the fetch-decode-execute cycle, each instruction took 3 clock cycles to execute, as each one of these instructions takes different parts of the cpu, we can pipeline them, while one is on decode, another can be set for fetch phase, and so on, triplicating the output
- Problem is that some instruction might depend on others, to fix this, data dependencies exist, so that the processor might stall instructions in case of dependencies
- Modern processors can dynamically reorder instructions to minimize stalls, this is called `out-of-order execution`
- `speculative execution` is a technique to predict the result of a jump instruction, so the processor starts filling the pipeline based of that guess, this can prevent delays
- `pipeline flush` is when the processor guesses wrong, and have to clear (or flush) the wrong instructions from the pipeline
- modern ways of predicting the direction are called `branch prediction`

## Multi-core
- Having more than one processing unit inside the cpu chip, so at each clock, different instructions are being executed