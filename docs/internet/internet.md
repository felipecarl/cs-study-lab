# Internet

## Terms
- Server: a program that listens for requests and responds
- Client: a program that makes requests to other programs
- Network
  - Multiple computers connected to each other
  - Data can be sent from any system on the network to any other
  - A network is owned and controlled by a person or organization
- Internet
  - A network of networks
  - Multiple networks connected together
  - Connected by routers
- "The Internet"
  - Is virtually all the internet connected toegether worldwide

## IP (Internet Protocol)
- Data sent in packets
- Each host and router has a unique 32-bit address, eg: 233.75.18.198
- IPv6 uses 128-bit addresses, allowing for many more addresses than 32-bit
- IPv4 uses 32-bit, that is quite limited, but is still mostly used today
- IP Header
  - Version: 4 bits
  - IHL = Internet Header Length
  - Header length 4 bits (always multiple of 4 bytes, meaning, if the header is 20 bytes long, the length will be 20/4 = 5, in binary 0101, 4 bits
  - Header length is at least 5 bytes usually
  - DSCP (differentiated Services Code Point) - 5 Bits
  - ECN (Explicit Congestion Notification) - 3 bits
  - Total packet length (in bytes) - 16 bits
  - Identification - 16 bits (id of the packet)
  - If the packet is fragmented because it is above the MTU, they will all share the same Identification
  - MTU (Maximum Transmission Unit): the largest packet size allowed by the physical link
  - IP is designer be unreliable, it means, it's ok if some packets are not recieved
  - flags, first bit is usually zero - 3 bits
    - second is DF (don't frag), if the flag is set and the packet gets fragmented, routers will likely discard it... useful for when the reciver don't have the computer resources to rebuild fragmented packets
    - third is MF, (more fragments) this is sent as 1 in fragmented packets except for the last fragment
  - Fragment Offset, after the flags, indicates the offset for the first data byte in the original packet as a multiple of 8 bytes
  - Eg: 
    - Original Packet
      (id = 35111, MF = 0, frag offset = 0)(IP data (bytes 0 - 500))
      FRAGMENTING
      (id = 35111, MF = 1, frag offset = 0)(IP data (bytes 0 - 239))
      (id = 35111, MF = 1, frag offset = 30)(IP data (bytes 240 - 479)) (as 30*8 = 240)
      (id = 35111, MF = 0, frag offset = 60)(IP data (bytes 480 - 500)) (as 60*8 = 480)
  - TTL (time to live) - 8 bits
    - to prevent zombie packets from going in circle, starts in 255, after passing to each router this valeus is decreased 1, when it reaches 0, it is discarded by the next router
  - protocol - 8 bits (UDP/TCP/ETC)
  - header checksum (technique for error checking) - 16 bits
  - source IP address - 32 bits
  - destination IP address - 32 bits
  - options - varies, but rarely used

## Routing tables
- CIDR
  - system of grouping IP addresses into prefixes for routing tables
- BGP
  - used by routers to negotiate updates to their routing tables

## Modem (modulator demodulator)
- Converts digital data into analog signals and vice versa
- Has an ip address defined by the ISP, can be connected directly to the computer
- But it's better to connect to a router
- Packets sent between the modem and ISP usually don't get seen by other modems on the ISP network as this would be insecure and a waste of banwidth
- Usually they get handled by another modem from the ISP that sends packets forward, without sending them to other modems

## Router
- Allows multiple devices to share the same ip address using network translation
- Routers today provide WI-FI
- Firewall functionality to filter unwanted traffic

## DNS (domain name system)
- A system of resolving names to IP addresses
- top-level domains: com net org edu mil gov uk ca de, each controlled by a designated authority
- Most top-level authorities, let people lease subdomains: google.com, yahoo.com, wikipedia.org, etc
- Domain name owner determines the IP address to which that name resolves
- DNS server: program which the computer asks to resolve domain names, usually set up to the ISP DNS server

## URL (uniform resource locator)
- string of text designating location of a thing on the internet
- schema://host/path
  - schema -> nature of the thing, like HTTP
  - host -> location (IP address, OR a domain name)
  - path -> the thing
- eg: http://www.google.com/search/potatoes/type/etc
  - http -> schema
  - www.google.com -> location
  - search/potatoes/type/etc -> path

## Four layer model
- Application: HTTP, SMTP, etc
- Transport: TCP, UDP
- Internet: IP
- Link: Ethernet, etc

## Ethernet
- Ethernet is the "language" computers speak to exchange data in a LAN
- Is a family of computer network technologies standardized by IEEE 802.3, that defines how devices communicate in a LAN (local area network), using physical layer protocols (wires, optical/eletrical signals) and data link (addressing, (MAC) media acess control).
- OSI layer: IEEE 802.3
- MAC address has 48 bits
- Started at 10 Mbps (original Ethernet), then 100 Mbps (Fast Ethernet), 1 Gbps (Gigabit Ethernet), 10/40/100 Gbps (high speed Ethernet).
- Uses CSMA/CD (Carrier Sense Multiple Access with Collision Detection), devices would check the media before transmitin, and would backout in case of collision, nowadays collisions rarely happen due to switches.
- Each NIC (network interface card) has its own MAC address.
- Router/switch uses the MAC to decide where to send the frame.
- IP, TCP/UDP, and applications HTTP, Node.js run on top of that.
- Cabled
- Each device on the ethernet is 
- Low latency

## Wi-Fi
- OSI layer: IEEE 802.11
- Radio Waves
- Uses MAC addresses
- CSMA/CA (Collision Avoidance), as collision cannot be detected through the air + ACKs (acknowledgment)
- Higher latency when compared to ethernet
- Speed: 54 Mbps (802.11g), 600 Mbps (802.11n), >1 Gbps (802.11ac/ax)
- Opposed to the ethernet, it needs cryptography such as WPA2, WPA3 as radio waves could be intercepted

## ACKs
- Is a confirmation message sent by the receiver to confirm the data has been recieved.
- Wi-Fi uses ACKs too, as collisions are not detectable via air
- If the ACK is not received, it triggers a retransmission
- TCP example
  - client sends SEQ=100 (100bytes data)
  - server receives and sends ACK=200 (meaning: got it til byte 199, send me 200 forward)
  - if the ACK is not received, client retransmits
- UDP does not uses ACKs

## Frames vs Packets
- Frame is like the envelope of with the street address (MAC), IP is the mail inside the envelope with the city/country address
- Frame: used on OSI Layer 2 (link layer)
  - Eg: Network frame, wi-fi frame
  - Contains: MAC addresses, payload data, CRC (error checking)
- Packet: used on OSI layer 3 (network layer)
  -  Eg: IP packet
  -  Contains: IP addresses, payload data (TCP/UDP segment)

## TCP / UDP
- Both need to know the port number
- TCP
  - Transmission Control Protocol
  - Reliable
  - Connection oriented: 3-way handshake (SYN, SYN-ACK, ACK)
  - Uses ACKs
  - Flow control: adjusts transmission rate to not overflow the reciver
  - Segmentation: breaks big blocks into segments and group it on the destination
  - Slower than UDP, but much more reliable
  - Usecases: HTTP/HTTPS (web), SMTP/IMAP/POP3 (email), FTP (file transmission), SSH

  Client → [SYN] → Server
  Client ← [SYN-ACK] ← Server
  Client → [ACK] → Server
  --- Connection stabilished ---
  Client → [DATA #1] → Server
  Client ← [ACK #1] ← Server

  - TCP headers
    - source port - 16 bits
    - destination port - 16 bits
    - sequence number - 32 bits (used to tell the other side of the connection, which bytes in the stream are included in the segment)
      - SYN (syncronized) and FIN (finished) flags count as one byte of the stream
      - SN is ignored in a segment without SYN, FIN and data 
    - acknowledgement number - 32 bits (used to tell the other side of the connection that everything was recieved up (but not including) to the sequence number from them), like SN = 100, bytes up to 99 were recieved
      - ack number is ignored in a segment without ACK
      - ACK sent with every segment (except with very first segment of the connection)
      - if ack for byte N, is not recieved after some time limit, the sender resends the data up to byte N
      - this time limits depends on network congestion
    - header length (x4 bytes) - 4 bits
    - reserved - 3 bits
    - frags (ACK, SYN, FIN) - 6 bits
    - window size - 16 bits
    - checksum for TCP segment and "pseudo header" - 16 bits
    - urgent pointer - 16 bits
    - options

  * well known port numbers
  (UDP 80 is different port from TCP 80)
  - TCP 20 -> FTP
  - TCP 25 -> SMTP
  - TCP/UDP 53 -> DNS
  - TCP 80 -> HTTP
  - TCP 195 -> IRC

  * 3 Way Handshake
  - Client / server syncronization before data exchange
  - Checks if both are active and ready to communicate
  - Aligns sequency numbers
  - Order
    * 1: SYN
    - Client sends a packet with flag `SYN = 1`
    - Packets means "i want to begin a connection" and suggests the ISN (initial sequence number), example `Seq = 1000`
    - It is the connection request
    * 2: SYN - ACK
    - Server answers a packet with two flags `SYN=1` (also wants to sync), and `ACK=1` meaning he checks SYN recival
    - Sends his own ISN, like `Seq=5000` and `ACK=1001` (meaning 1000+1, recieved til byte 1000)
    - This confirms the request + sends the initial server number
    * 3: ACK
    - Client aswers with a packet `ACK=1`
    - This packet checks the server ISN
    - It's the final confirmation, connection stabilished
      - Eg:
        - Client ----SYN 3040----> Server
        - Client <--SYN 700200 ACK 30410--- Server
        - Client -----> ACK 700201---> Server
        - Client ---> 3041 ACK 700201 (20 bytes) --> Server
        - Client <------ ACK 3061 ---- Server
    - FIN flag: when one side of the connection will never again send data over this connection, it should send a FIN segment
    - the other side responds with an ack
    - These FIN flags are one sided, so a connection might close from one side, but the other can keep sending data, which can at some point send its own FIN flag

- UDP
  - User Datagram Protocol
  - Unreliable
  - Connectionless: no handshake before sending data
  - No ACKs
  - Faster and lower latency
  - Datagrams: sends the whole message as a block
  - Usecases: DNS, VoIP (Voice over IP), Audio/Video streaming, Online games (latency is more important than reliability)

  Client → [DATA #1] → Server
  Client → [DATA #2] → Server
  (No confirmation to check if data has arrived)

  - UDP datagram header
    - source port - 16 bits
    - destination port - 16 bits
    - length of UDP datagram - 16 bits
    - checksum of UDP datagram and "pseudo header" - 16 bits

    - 
- Ports
  - port number: number used to specify which program on a host is the sender/receiver
  - from 0 to 65535 (16 bit)
  - the OS will usually only allow one process to listen to a port 
  - on the other side, when sending, the OS will usually allow multiple processes to use a source port at the same time

- ICMP (Internet Control Message Protocol)
  - When the system that manages TCP/UDP etc needs to communicate with the other side, it uses ICMP
  - For messages sent between IP stacks themselves, not between programs
  - In some ways could fit on transport layer, or internet layer
  - Example use case, router sending a type 11 code 0: TTL expired message to the original packet sender 
  - Header
    - type - 8 bits
    - code - 8 bits
    - checksum - 16 bits

## HTTP (Hyper-Text Transfer Protocol)
- Used by web browsers and web servers
- Always used with TCP, as reliability is required
- Each request is discrete, not connection maintained between requests
- Methods: GET, POST, HEAD, PUT, DELETE, PATCH, CONNECT, TRACE, OPTIONS
- GET
  - Client sends URL to the Server
  - HTTP response: Server responds with appropriate answer
- POST
  - Client sends URL and DATA to the Server
  - Server sends an HTTP response
- Response codes
  - 1xx informational
  - 2xx success
  - 3xx redirection
  - 4xx client error
  - 5xx server error

## Layers example 
                                           |  app data  |  
                              | TCP header | TCP data   |
                  | IP header |         IP data         | 
| Ethernet header |           Etherned data             | Ethernet footer |