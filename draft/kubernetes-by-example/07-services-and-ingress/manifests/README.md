# Part 7 manifests

    kubectl apply -f web-service.yaml
    kubectl get svc web
    kubectl get endpointslice -l kubernetes.io/service-name=web

Get into the habit of the second command. The Service tells you almost nothing;
the EndpointSlice tells you everything.

## Ingress on kind

An Ingress without a controller is an inert row in a database. Install one:

    kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
    kubectl wait --namespace ingress-nginx --for=condition=ready pod \
      --selector=app.kubernetes.io/component=controller --timeout=120s
    kubectl apply -f ingress.yaml
    curl -H 'Host: airwaves.example.com' http://localhost/

For the control-plane node to forward ports 80/443 you need `extraPortMappings`
in the kind config — see the ingress-nginx kind guide.

Break-it: patch the Service selector to something that matches nothing and watch
the EndpointSlice empty while the Service stays perfectly healthy.
