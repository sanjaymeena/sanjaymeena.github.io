# Part 1 manifests

    kind create cluster --name airwaves
    kubectl apply -f tuner.yaml

`tuner.yaml` is a Deployment with one replica. The container is a placeholder —
it prints a line a second so there is something alive to look at. Part 1 is
about the chain that gets it running, not about what it does.

`resources.requests.cpu` is set deliberately: the "ask for something
impossible" experiment uses `kubectl patch --type=json` with `replace`, which
fails if the path does not already exist.

Tear down with `kind delete cluster --name airwaves`.
