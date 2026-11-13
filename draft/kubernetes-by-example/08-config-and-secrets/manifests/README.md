# Part 8 manifests

    kubectl apply -f stations-cm.yaml
    kubectl apply -f tuner.yaml

`tuner.yaml` consumes the same ConfigMap twice — once as an env var, once as a
mounted directory — so you can change the ConfigMap and watch only one of them
update:

    kubectl patch configmap stations --type=merge \
      -p='{"data":{"jazz.url":"http://changed.example/stream"}}'
    kubectl exec deploy/tuner -- env | grep JAZZ      # unchanged, forever
    sleep 70
    kubectl exec deploy/tuner -- cat /etc/stations/jazz.url   # changed

`subpath-demo.yaml` shows that a `subPath` mount gets env-var semantics: a
single file that never refreshes.

Making a change land: `kubectl rollout restart deploy/tuner`, or a checksum
annotation on the pod template (Part 14).
