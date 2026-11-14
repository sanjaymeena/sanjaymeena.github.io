# Part 11 manifests

Set a node up first:

    kubectl label node airwaves-worker2 pool=gpu gpu=true
    kubectl taint node airwaves-worker2 gpu=true:NoSchedule

Then:

    kubectl apply -f asr.yaml                    # toleration AND selector
    kubectl apply -f tuner-affinity.yaml         # beside a decoder
    kubectl get pods -o wide -l 'app in (tuner,decoder,asr)'

Break-it files: `asr-toleration-only.yaml` (permission without direction),
`strict-antiaffinity.yaml` (required anti-affinity as a capacity ceiling),
`impossible.yaml` (two refusal reasons in one event).

`tuner-affinity.yaml` needs `decoder` running — apply Part 9's
`decoder-shm.yaml` first.

Clean up:

    kubectl taint node airwaves-worker2 gpu=true:NoSchedule-
