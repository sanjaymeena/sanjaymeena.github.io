# Part 10 manifests

    kubectl apply -f tuner-resources.yaml
    kubectl get pod -l app=tuner -o jsonpath='{.items[0].status.qosClass}{"\n"}'

Then compare the two views of "how full is this node":

    kubectl top nodes                                  # actually used
    kubectl describe node | grep -A8 'Allocated resources'   # reserved

They will disagree. Only the second decides whether anything else can land.

Break-it files, in order: `memory-hog.yaml` (137 / OOMKilled),
`cpu-throttle.yaml` (silently slow, perfectly healthy), `greedy-request.yaml`
(Pending on an idle cluster).

**Clean all three up** when done — the memory hog restarts indefinitely:

    kubectl delete -f memory-hog.yaml -f cpu-throttle.yaml -f greedy-request.yaml
