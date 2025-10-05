# Software

## Speed
- A microssecond (µs) is a millionth of a second, meaning it is equal to 0,000001 seconds, or 1 x 10⁻⁶, equal to 1/1.000.000 of a second.
- A nanossecond is even faster, is the billionth of a second, meaning 0,000000001 seconds

## IPC (InterProcess Communcation)
- Is an umbrella term for any method of communication between processes
- Files: simplest kind, process can write to a file and use this as a way to communicate
- Pipes
- Sockets
- Signals
- Shared Memory

## Concurrency
- Each core can only handle one process each time, by switching between process very fast, depending on many factors but on some cpus it takes around µs to switch context between processes
- This makes the user feel like the experience is seamless, looking like everithing is running in parallel
- And, maximize computer resources usage

## Kernel
- Is a software component
- Sits between the hardware and the applications/ rest of the os
- The kernel abstracts away the physical differences between hardware setups, there are endless combinations
- Gives the software a standardized interaction between different machines
- Provides security and stability
- Prevents programs from accessing memory that is not reserved to them, like "Protected Memory Space"
- Kernel Panic: when the system gets inside a corrupted or undefined state and kernel decides to halt the system, usually the cause of BSODs
  - Each error should have a written resolution specific for it, when the error is not known of, the kernel wont be able to handle it, so the BSOD comes

## CPU scheduling
- Responsible for managing processes in multi-programming OSs
- CPU scheduling is a process that allows one process to use the cpu while another process is delayed for unavailability of resources or io operations
- Is a part of the kernel
- Runs when the kernel needs to decide which thread/process will occupy the cpu
- When (examples):
  - Timer interrupt: cpu has a timer that shoots every x ms, cpu will stop the current process and call the kernel, the scheduler will decide what to run next
  - I/O interruptions: thread is waiting for disk/network, when data arrives, hardware will throw an interruption, and the kernel might wake the thread
  - System calls (syscall): when some process requests something to the OS (read(), write(), fork()), the kernel might take the opportunity to review priorities
  - Explicit blockers: like `sleep`, `await` or `lock`, the scheduler will call other process

## Processes
- Process is an isolated instance of a running program, or, a program in execution, that does not mean that the program is actively using the cpu as it could be waiting for some I/O
- Has it's own memory space (code, data and stack segments)
- Processes CANNOT directly access each others memory, this is enforced by the OS
- Have their own PCBs(process control blocks) that store metadata about the process, including cpu register states, scheduling priority, memory pointers
- Processes are safer because of memory isolation
- Each process has it own program counter, that points to where the process stopped when the cpu is allocated to another process
- We CANNOT alternate the cpu between functions of the same process, because of the single program counter

  ### Process Memory
  - Text: the code (binary)
  - Call Stack: local variables
  - Heap: everything else
  - The most common way to arrange these, is to store the stack at the top of the program address space and the code at the bottom, in between is available for the heap
  - These spaces are not necessarily adjacent to each other on the RAM, the system will keep mapped to a table, to translate process addresses to ram addresses, if they happen being swapped to disk, it will show on the table

    #### Heap
    - Unlike the stack space, it does not inits with a space
    - It has to be allocated with a syscall, and the OS determines where to store it, no necessaarily adjacent to each other
    - When the space is not used anymore, it is deallocated
    - It is responsability of the OS to keep track of each space being used
    - A problem is that after cycles of allocation, the heap space might get fragmented, a good algo for this will try the best to arrange the space, but it will still happen, so it's best to deallocate unused heap space
    - Not doing so might cause the process to terminate because of missing space to perform new allocations, failing to deallocate unused memory is usually called a `memory leak` and is considered a bug

    #### Stack 
    - Inits empty, but with a determined space
    - When the first function is called, the variables are stored in a group called frame
    - When the function calls another function, it's variables are stored in another frame on top of the first function, and so on
    - Everytime we add a new frame, we need to keep track of the top of the stack, this address is called the "stack pointer" and for example in a x86 cpu it is stored in a special register
    - When the function returns, the stack pointer goes back to the top of the previous function, like for example if the tree fn calls, branch, that calls leaf, when leaf returns, the stack pointer returns to the top of branch
    - We dont have to delete those addressess because they will get overwritten at some point
    - Threads are a way to inform the operating system that specific parts of a program can be executed concurrently

    #### Stack boundary
    - Is another pointer that is kept track of on another register
    - It is the size of the stack
    - When the stack pointer grows past the stack boundary, this triggers a a hardware exception, the handler of the exception will increase the size of the stack, updating its boundary
    - However in some cases, if the handler thinks that the stack is too big, it will refuse to increase and will most likely terminate the process
    - This is an issue that should be fixed, not accomodated
    - The most common cause is an overly long chain of recursive functions
    - When the program exceeds its available stack space, its called an `stack overflow`, when it happens in a PC, the OS usually terminates the process
    - In simpler computers, like embedded systems, the stack size is not usually moniroted with a stack boundary, and if a stack grows and overflows, it may affect other parts of memory, likely causing unpredictable bugs

## Threads
- Lighter-weight version of a process, within(inside) processes
- Share memory segments among threads of the same process
- Have TCBs(thread control block) that manage execution state
- Share the same PCB of the parent process
- Shared memory space between other threads, not so safe
- Each thread has its own progarm counter, its own register and flags, stack pointer, as if they did not, they could end up overwriting other threads stack (from the same process)
- EACH THREAD HAS IT'S OWN STACK! but they can read other threads stacks as they are all on the same process, but it's better to avoid accessing their stacks
- All processes have at least ONE thread, that is called the `MAIN thread`
- If the main thread exits(), the subthreads will close too...
- The syscall to create a thread is faster and cheaper than the syscall to create a process.
- Threads DON'T have code, they are not functions, their program counter points to the code through, that's why multiple threads can point to the same program counter
- The "constants/consts" reside on the "TEXT" part of the process memory
- The variables etc, pertinent to the thread, reside on their stack or the heap

## Thrashing
- When a OS spends more time managing/switching memory/processes than running the processes itself
- Memory thrashing (swap/page fault), when ram is full, SO users virtual memory (swaping ram pages with disk space), caused by too many active processes filling ram, OS keeps swapping, results in 100% HD/SDD usage, and free CPU
- CPU thrashing (context switching), when there are too many processes/threads competing with the cpu, kernel keeps swaping context (saving registers, stacks), if the contect swap time is bigger than time running threads, cpu is only managing queues instead of executing, results in 100% cpu usage, but not many tasks getting executed
- Those are caused by too much processes, or, bad scheduling policies
- How the kernel solves this:
  - Thrashing detection: modern OSs keep track of page faults and time spent on context switching, if too high, OS detects thrashing
  - Memory solutions: kill processes, suspend processes running in backgroun
  - CPU solutions: lower competing threads priority
  - Group threads in fewer cores
  - Migrate tasks to eficciency cores
- *Page fault: when the OS tries to access a page (ram) that was mapped to the virtual memory, on the disk, that triggers the os to load the page from the disk into the ram, that is much slower than direct ram access

## Paging
- Is a method to manage limited physical memory
- OS divides memory in fixed sized blocks called pages in virtual memory, and page grames in physical memory
- If there are not enough space in ram, some pages get stored on disk, that is called swapping

## File System
- Is an abstraction layer for storage systems
- Allows programs to read data from storage without having to worry if it's a SSD or HDD, etc
- Storage of each drive is divided in chunks called partitions, some areas of the drive might be left blank
- Usually drives have only one partition, but sometimes have more that are usually for having multiple OSs installed on the same drive
- Most FSs store files/folders indetified by an id, that should not exist on the same partition
- Files are sets of binary data stored, they might be stored in separate pieces, and it's responsability of the file system to build them toegether when handing them over to the program that required it
- A directory, is a list of directories and files
- When a partition is created, it is initialized empty, except for a "root directory" that cannot be deleted
- In windows both / and \ work for paths, but for unix systems, only / (forward slashes) are accepted
- In windows partitions are assigned letters, in unix, not, instead partitions are mounted inside folders of the root, like partition 2 (/ root), partition 1 (/banana) and partition 3 (/banana/apple)
- To create a partition, the folder must be already existant, if the folder has content inside, this content will no longer be acessible after the partition has been mounted