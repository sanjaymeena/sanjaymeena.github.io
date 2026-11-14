# Part 3 manifests

    kubectl apply -f tuners.yaml
    kubectl get pods -L station -l app=tuner

The selector is deliberately just `app=tuner`. It is immutable, so a minimal one
is the only one you can live with. `station` and `tier` sit in the template
labels where you are free to change them.

Break-it steps use `kubectl run stray --labels=app=tuner` (adoption) and
`kubectl label` (live quarantine). No extra files needed.
