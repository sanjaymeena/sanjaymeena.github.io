# Part 4 manifests

    kubectl apply -f tuner.yaml
    kubectl rollout status deploy/tuner

`tuner.yaml` sets `maxSurge: 1` / `maxUnavailable: 1` explicitly so you can see
them take effect in `kubectl get pods -w`.

`slow-start.yaml` is the break-it case: a container that needs ten seconds
before it is useful, with nothing to express that. Roll it and watch every pod
get replaced in about two seconds.

Deliberately broken image for the stuck-rollout experiment:

    kubectl set image deploy/tuner tuner=busybox:does-not-exist
    kubectl rollout undo deploy/tuner
