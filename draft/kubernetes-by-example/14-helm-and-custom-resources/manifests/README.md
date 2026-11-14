# Part 14 manifests

## The new noun

    kubectl apply -f station-crd.yaml
    kubectl explain station.spec
    kubectl apply -f stations.yaml
    kubectl get stations

Three Stations, your own printer columns, your own schema — and **no pods**.
A CRD is vocabulary. It has no behaviour.

## The thing that gives it meaning

    kubectl apply -f conductor-rbac.yaml
    kubectl apply -f conductor.yaml
    kubectl logs -f deploy/conductor

Watch it find three Stations, zero pods, and close the difference. Then watch
it find nothing to do — Part 1's description of a healthy cluster, from inside.

    kubectl apply -f station-classical.yaml
    kubectl get pods -l app=tuner -w        # a fourth pod, seconds later

## Break it

- **A noun with no meaning**: `kubectl scale deploy/conductor --replicas=0`,
  then apply `station-ambient.yaml`. The Station exists; nothing happens.
  Scale back to 1 and it catches up — it recomputes from scratch rather than
  replaying events, which is what makes reconcile loops robust.
- **Forget the binding**: `kubectl delete rolebinding conductor`, then
  `kubectl auth can-i create pods --as=system:serviceaccount:default:conductor`.
- **Leak a pod**: apply `conductor-no-owner.yaml`, apply `station-test.yaml`,
  then `kubectl delete station test`. The pod survives.

Put it back and confirm garbage collection works: delete a Station and its pod
disappears without the conductor doing anything.

## Note on the conductor

It is written in shell against `kubectl` so the loop is readable. A real
controller uses a watch rather than a poll, an informer cache rather than two
list calls per cycle, and a workqueue with rate limiting. The *shape* —
list desired, list actual, reconcile the difference — is exactly this.
