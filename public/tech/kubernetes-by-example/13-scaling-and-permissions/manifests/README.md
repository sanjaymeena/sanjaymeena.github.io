# Part 13 manifests

## metrics-server (kind needs it)

    kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
    kubectl patch -n kube-system deploy metrics-server --type=json \
      -p='[{"op":"add","path":"/spec/template/spec/containers/0/args/-","value":"--kubelet-insecure-tls"}]'
    kubectl top nodes     # must work before anything below does

## Autoscaling

    kubectl apply -f web-hpa.yaml
    kubectl get hpa web

`TARGETS` showing a percentage means it works. `<unknown>` means either
metrics-server is missing or the pod has no CPU request — `no-requests.yaml`
reproduces the second case deliberately.

Note `web-hpa.yaml` has **no `replicas`** in the Deployment. The HPA owns that
field; leaving it in the manifest means `apply` and the HPA fight.

## RBAC

    kubectl apply -f sweeper-rbac.yaml
    kubectl auth can-i list pods \
      --as=system:serviceaccount:default:sweeper

Break it by deleting just the binding — the ServiceAccount and Role still
exist, look correct, and grant nothing:

    kubectl delete rolebinding sweeper
    kubectl auth can-i list pods --as=system:serviceaccount:default:sweeper

## KEDA

Scale-to-zero needs KEDA installed and a real queue, so it is described in the
article rather than shipped here:

    helm repo add kedacore https://kedacore.github.io/charts
    helm install keda kedacore/keda -n keda --create-namespace
