# Hi, I'm Chris

[![Profile Views](https://komarev.com/ghpvc/?username=lawrence908&color=blueviolet)](https://github.com/lawrence908)
[![GitHub Followers](https://img.shields.io/github/followers/lawrence908?label=Follow&style=social)](https://github.com/lawrence908)

Software developer who builds, deploys and runs what he makes. Most of my work is applied AI (retrieval, agents, local models) and the infrastructure underneath it: a Proxmox homelab running about a hundred self-hosted services behind Caddy, Cloudflare and Tailscale, which is where every project below actually lives.

Before software I spent over a decade as a leader in the Canadian Armed Forces. That still shapes how I build: clear rules, honest failure modes, and systems that keep working when something upstream breaks.

<p>
  <a href="https://chrislawrence.ca" title="Website">
    <img src="https://api.iconify.design/mdi/web.svg?color=%23F0F6FC" alt="Website" width="30" height="30" style="vertical-align:middle; margin-right:12px;">
  </a>
  <a href="https://portfolio.chrislawrence.ca" title="Portfolio">
    <img src="https://api.iconify.design/mdi/briefcase-outline.svg?color=%23F0F6FC" alt="Portfolio" width="30" height="30" style="vertical-align:middle; margin-right:12px;">
  </a>
  <a href="https://www.linkedin.com/in/chris-lawrence-cd/" title="LinkedIn">
    <img src="https://api.iconify.design/mdi/linkedin.svg?color=%230A66C2" alt="LinkedIn" width="30" height="30" style="vertical-align:middle;">
  </a>
</p>

---

## Featured

### [Zeus](https://github.com/Lawrence908/zeus)
A self-hosted, privacy-first personal AI. Three-layer retrieval (a bi-temporal fact store, hybrid dense + BM25 search with a reranker, and a live offline-Wikipedia proxy), a privacy-tier-gated router across local and hosted models, and a safety layer that validates every tool call. Chat, Telegram, MCP and a streaming voice pipeline share one session and retrieval stack.

`FastAPI` `Ollama` `Qdrant` `React` `MCP` `Docker`

### AstrID: supernova detection
My CSCI 491 senior research project at Vancouver Island University. An end-to-end pipeline that pulls archival telescope images from NASA's MAST archive, runs multi-stage image differencing, and trains a CNN to separate real transients from bogus detections across a catalog of 6,542 supernovae. Headline result: AUCPR 0.8959 over ten seeds. The lesson that stuck: every meaningful gain came from better data, never from a bigger model. [Read the final report (PDF)](https://portfolio.chrislawrence.ca/static/pdf/astrid-final-report.pdf).

`PyTorch` `AstroPy` `CUDA` `MLflow` `FastAPI`

### [The Cycle Board](https://github.com/Lawrence908/econ) &nbsp;·&nbsp; [live](https://econ.chrislawrence.ca)
Ten narrow economic trackers, each its own repo answering one question (is the yield curve inverted? has housing rolled over? are banks tightening?), read together on one board that ranks how far ahead of past recessions each has historically turned. Every tracker publishes to a shared [contract](https://github.com/Lawrence908/econ-core), so the board authors no figure of its own and a downed tracker degrades to one stale row. No framework, no build step.

`Python` `Vanilla JS` `FRED API` `nginx` `Docker`

### [Monument](https://github.com/Lawrence908/monument)
A self-hosted photo-to-Minecraft appliance. Upload a photo or a 3D model; TripoSR turns it into a mesh on the GPU, a surface-sampling voxelizer color-matches it to blocks in CIELAB, and it is placed live into a running server over RCON, working around the parts of Minecraft that assume a human player is present.

`Python` `TripoSR` `CUDA` `Minecraft / RCON` `Docker`

### [chiron](https://github.com/Lawrence908/chiron)
A Claude Code plugin marketplace: 20 agent skills across AI engineering, development, writing and research, published from the same private source tree my own agents use day to day.

`Claude Code` `Agent Skills` `MCP`

### More
- **[Magic Pages](https://magicpages.chrislawrence.ca)**: AI-generated, illustrated children's storybooks with print-on-demand fulfilment. Django, PostgreSQL, Azure OpenAI.
- **[SchedShare](https://github.com/Lawrence908/schedshare)**: turns university schedule PDFs into recurring Google Calendar events. Flask, Redis.
- **[JobKit](https://jobkit.chrislawrence.ca)**: tailors resumes and cover letters from one YAML source of truth; the LLM rephrases, never invents. FastAPI, React.
- **[Billable](https://github.com/Lawrence908/billable)**: per-client hours tracker that never leaves the browser. Offline, no network after load.
- **[Interactive Linear Algebra](https://github.com/Lawrence908/linear-algebra)**: 16 Jupyter notebooks covering a full course with live visualizations: animated grid transformations, an eigenvector hunter, exact-fraction Gaussian elimination, Markov chains. NumPy, SymPy, ipywidgets.
- **[Gravity](https://gravity.chrislawrence.ca)**: interactive 3D N-body simulation built for an astronomy course. NumPy, CUDA, WebGL.

---

## What I'm working on

- Agent orchestration across local and hosted models, routed by how checkable the output is
- Retrieval that stays honest: hybrid search, reranking, and answers that show their sources
- Moving parts of the homelab from Docker Compose onto Kubernetes (k3s) with GitOps

---

## Tools

### Languages
<p align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" height="40" title="Python" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" height="40" title="TypeScript" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" height="40" title="JavaScript" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="SQL" height="40" title="SQL" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" alt="Bash" height="40" title="Bash" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" alt="C" height="40" title="C" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" alt="C++" height="40" title="C++" />
</p>

### Frameworks
<p align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" alt="FastAPI" height="40" title="FastAPI" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" alt="Django" height="40" title="Django" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" alt="Flask" height="40" title="Flask" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" height="40" title="React" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" alt="Next.js" height="40" title="Next.js" />
  <img src="https://raw.githubusercontent.com/devicons/devicon/v2.17.0/icons/sqlalchemy/sqlalchemy-original.svg" alt="SQLAlchemy" height="40" title="SQLAlchemy" />
</p>

### Infrastructure
<p align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" alt="Linux" height="40" title="Linux" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" height="40" title="Docker" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg" alt="Ansible" height="40" title="Ansible" />
  <img src="https://raw.githubusercontent.com/devicons/devicon/v2.17.0/icons/cloudflare/cloudflare-original.svg" alt="Cloudflare" height="40" title="Cloudflare" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" alt="Nginx" height="40" title="Nginx" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg" alt="Grafana" height="40" title="Grafana" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg" alt="Prometheus" height="40" title="Prometheus" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" alt="Azure" height="40" title="Azure" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" alt="Google Cloud" height="40" title="Google Cloud" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" height="40" title="Git" />
</p>

### Data and ML
<p align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" height="40" title="PostgreSQL" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" alt="Redis" height="40" title="Redis" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" height="40" title="MongoDB" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" alt="PyTorch" height="40" title="PyTorch" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow" height="40" title="TensorFlow" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" alt="NumPy" height="40" title="NumPy" />
</p>

---

## GitHub Stats

[![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=lawrence908&theme=dark&hide_border=true&stroke=58a6ff&ring=58a6ff&fire=58a6ff&currStreakNum=c9d1d9&sideNums=c9d1d9&currStreakLabel=58a6ff&sideLabels=c9d1d9&dates=c9d1d9)](https://git.io/streak-stats)

[![GitHub Stats](https://raw.githubusercontent.com/lawrence908/github-stats/master/generated/overview.svg#gh-dark-mode-only)](https://github.com/Lawrence908/github-stats)
[![GitHub Languages](https://raw.githubusercontent.com/lawrence908/github-stats/master/generated/languages.svg#gh-dark-mode-only)](https://github.com/Lawrence908/github-stats)

<sub>Stats include private repos, generated with [jstrieb/github-stats](https://github.com/jstrieb/github-stats).</sub>
