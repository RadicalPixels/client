.PHONY: build
build:
	@npm run build && mkdir -p public && cp src/index.html public/ && cp -r dist/* public

.PHONY: build/docker
build/docker:
	@docker build -t client:latest .

.PHONY: start/docker
start/docker:
	@docker run -p 8080:8080 -t client:latest

.PHONY: start/docker/prod
start/docker/prod:
	@docker run -p 80:8080 -t client:latest --restart unless-stopped
