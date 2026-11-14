# airwaves

The example project for **Kubernetes by Example**: transcribe a fleet of
internet radio stations, live.

One pod per station pulls audio. A shared decoder on each machine turns
compressed audio into raw samples. A speech model turns samples into words.
The words go to a queue, into a database, and onto a small web page.

It was chosen because audio is roughly a hundred times smaller than video, so
thirty stations fit comfortably in a `kind` cluster on a laptop while keeping
the shape a serious fleet has: many identical workers, a few shared services
they all depend on, and a control plane deciding who exists.

## How it grows

The project is built up one part at a time. Each part's folder holds the
manifests as they stand at the end of that part; this folder will hold the
finished state, including the Helm chart, once the series is complete.

| Part | What gets added |
|---|---|
| 01 | A single placeholder pod, to watch the reconcile loop |
| 02 | The real tuner container |
| 05 | The decoder and asr DaemonSets |
| 06 | The catalogue and the bus |
| 09 | Shared-memory rings between decoder and tuner |
| 13 | The rewind batch worker, scaling on queue depth |
| 14 | The Station custom resource and the conductor controller |

## Running it

    kind create cluster --name airwaves
    kubectl apply -f ../01-the-object-model/manifests/

Everything runs on CPU. GPU sections have a fallback that is exercised, not
just described.
