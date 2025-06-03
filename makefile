build-dev:
	docker compose -f docker/develop/docker-compose.yml up --build -d
run-dev:
	docker compose -f docker/develop/docker-compose.yml up -d
