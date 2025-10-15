# Docker Cheat Sheet

## docker ps
- lists the current docker images

## docker compose up
- reads docker-compose.yml
- checks if there are containers with the same nome as the project
- for each service, if the container exists and is set up as the current config, docker will reactivate it, if the image changed, or the build, or compose file changed, it recreates the container
- flag `-d` means running "detached", in backgroun

## docker compose down
- stops containers
- removes containers
- removes default network created by compose
- keeps volumes and images, unless specificed to remove
- example
  ```yml
    services:
      api:
        build: .
      db:
        image: postgres:15

  ```
  - and then `docker compose up -d` runs
  - this creates: a container `myproject_api_1`
    - a container `myproject_db_1`
    - a network `myproject_default`
  - then you run `docker compose down`
    - it stops both containers, removes them and the network
- flags:
  - `-v` removes volumes also
  - `--rmi local` local images also
  - `rmi all` all images also
- `docker compose down -v --rmi all`
  - this would remove everything

## docker compose stop
- pauses the containers