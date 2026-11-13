# Part 5 manifests

Needs more than one node:

    kind delete cluster --name airwaves
    kind create cluster --name airwaves --config kind-3node.yaml
    kubectl apply -f decoder.yaml
    kubectl get ds decoder
    kubectl get pods -o wide -l app=decoder

`DESIRED` is computed, never set. If it reads 0, a `nodeSelector` matched no
nodes — look at node labels, not at the DaemonSet.

Break-it steps taint a node (`kubectl taint … NoExecute`) and then narrow the
DaemonSet with a `nodeSelector` patch. Both are in the article; no extra files.
