# Part 9 manifests

    kubectl apply -f decoder-shm.yaml
    kubectl apply -f tuner-shm.yaml
    kubectl logs -l app=tuner --tail=3

A tuner on a node with a decoder reads the ring. A tuner on a node without one
reports `no ring on this node` — that emptiness *is* the locality requirement
Part 5 argued for, made visible.

`tmpfs-demo.yaml` — fill a memory-backed emptyDir and get OOMKilled (137)
without allocating a byte:

    kubectl exec deploy/tmpfs-demo -- sh -c 'dd if=/dev/zero of=/cache/big bs=1M count=200'

`rwx-claim.yaml` — asks for an access mode kind cannot provide. Stays Pending.

    kubectl describe pvc rwx-demo | tail -6
