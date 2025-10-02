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