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
- Is a confirmation message sent by the reciever to confirm the data has been recieved.
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
