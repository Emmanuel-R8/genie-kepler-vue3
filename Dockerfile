FROM golang:alpine AS builder

ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

WORKDIR /build

COPY /golang .

RUN go mod download

RUN go build -ldflags="-w -s" -o main

FROM alpine:latest

WORKDIR /app

COPY --from=builder /build/.env .
COPY --from=builder /build/main .

EXPOSE 8000

# ENTRYPOINT ["/app/main"]
