# Part 2 manifests

    kubectl apply -f tuner.yaml
    kubectl get pods -l app=tuner -w

`tuner.yaml` replaces Part 1's placeholder with the real thing: an init
container that resolves which stream to play, and a tuner that reads it and
reports throughput. They pass the answer through an `emptyDir` volume, which
is the only way two containers in a Pod can share a file.

Offline by default. `STATION_SOURCE=synthetic` makes the init container
generate a local stream, so nothing depends on the internet.

Point it at a real stream with:

    kubectl set env deploy/tuner STATION_SOURCE=https://example.com/stream.mp3

and back again with `STATION_SOURCE=synthetic`.

`port-clash.yaml` is the second break-it experiment: two containers in one Pod
both binding port 8080. Delete it when you've seen it fail.
