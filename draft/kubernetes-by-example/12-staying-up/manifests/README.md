# Part 12 manifests

    kubectl apply -f tuner-probes.yaml
    kubectl describe pod -l app=tuner | grep -A3 -E 'Liveness|Readiness'

Note `timeout=5s`, not the default 1. That single field is the difference
between a health check and a self-inflicted outage.

    kubectl apply -f asr-startup.yaml
    kubectl get pods -l app=asr -w        # 0/1 for ~60s, then 1/1, no restarts

Break-it, in order:

- `liveness-cascade.yaml` — default `timeoutSeconds` against a 1.2s check.
  Fix with: `kubectl patch deploy/cascade --type=json -p='[{"op":"replace","path":"/spec/template/spec/containers/0/livenessProbe/timeoutSeconds","value":5}]'`
- `no-prestop.yaml` vs `with-prestop.yaml` — run a load loop from inside the
  cluster and `rollout restart` each. Only the first drops requests.
- `strict-pdb.yaml` — then try `kubectl drain airwaves-worker --ignore-daemonsets
  --delete-emptydir-data` and watch it block. `kubectl uncordon` afterwards.
