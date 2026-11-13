# Part 6 manifests

    kubectl apply -f catalogue.yaml
    kubectl get sts,pods,pvc -l app=catalogue -w

Watch the order: `catalogue-0` must be Ready before `catalogue-1` is created.

    kubectl apply -f prune.yaml
    kubectl create job prune-now --from=cronjob/prune    # don't wait until 3am

`slow-cron.yaml` omits `concurrencyPolicy` deliberately so you can watch two
runs overlap.

**Cleaning up is manual.** PVCs survive scale-down and deletion:

    kubectl delete sts catalogue
    kubectl delete pvc -l app=catalogue
