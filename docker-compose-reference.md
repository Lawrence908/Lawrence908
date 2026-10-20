# Docker Compose Command Reference

## Quick Decision Tree

```
Did you change code/files? 
├─ No → Use RESTART commands
└─ Yes → Did you change Dockerfile/dependencies?
    ├─ No → Use UP --build
    └─ Yes → Use BUILD + DOWN/UP
```

## Command Categories

### 🔄 RESTART Commands (No Rebuild Needed)
| Command | What It Does | When To Use | Example |
|---------|--------------|-------------|---------|
| `restart <service>` | Stops & starts specific service | Code changes only, no Dockerfile changes | `docker-compose restart api` |
| `restart` | Stops & starts all services | Restart everything without rebuilding | `docker-compose restart` |

### 🏗️ BUILD Commands (When Files Changed)
| Command | What It Does | When To Use | Example |
|---------|--------------|-------------|---------|
| `build <service>` | Builds specific service image | Dockerfile changes, new files | `docker-compose build prefect-worker` |
| `build` | Builds all services | Multiple Dockerfile changes | `docker-compose build` |
| `up --build` | Builds if needed, then starts | Smart build + start | `docker-compose up --build -d` |

### 🚀 START/STOP Commands
| Command | What It Does | When To Use | Example |
|---------|--------------|-------------|---------|
| `up -d` | Starts services in background | Fresh start, no changes | `docker-compose up -d` |
| `up --build -d` | Builds if needed, starts in background | Smart start with build | `docker-compose up --build -d` |
| `stop` | Stops services (keeps containers) | Pause without cleanup | `docker-compose stop` |
| `down` | Stops & removes containers | Clean shutdown | `docker-compose down` |

### 🧹 CLEANUP Commands
| Command | What It Does | When To Use | Example |
|---------|--------------|-------------|---------|
| `down -v` | Stops & removes containers + volumes | Clean slate, lose data | `docker-compose down -v` |
| `down --remove-orphans` | Removes orphaned containers | Clean up after config changes | `docker-compose down --remove-orphans` |
| `system prune` | Removes unused Docker resources | General cleanup | `docker system prune` |
| `system prune -a` | Removes ALL unused Docker resources | Deep cleanup (removes images) | `docker system prune -a` |

## Common Scenarios & Solutions

### 📝 Scenario: "I changed Python code"
```bash
# Option 1: Quick restart (if using volume mounts)
docker-compose restart api

# Option 2: Rebuild if no volume mounts
docker-compose up --build -d api
```

### 🐳 Scenario: "I changed Dockerfile"
```bash
# Rebuild specific service
docker-compose build api
docker-compose up -d api

# Or one command
docker-compose up --build -d api
```

### 📁 Scenario: "I added new files to copy into container"
```bash
# Must rebuild (files need to be copied)
docker-compose build api
docker-compose up -d api
```

### 🔧 Scenario: "I changed docker-compose.yaml"
```bash
# Full restart to pick up config changes
docker-compose down
docker-compose up -d
```

### 🗑️ Scenario: "I want to start completely fresh"
```bash
# Nuclear option - removes everything
docker-compose down -v
docker-compose up --build -d
```

### 🐛 Scenario: "Something is broken, I want to debug"
```bash
# See logs
docker-compose logs -f service-name

# Interactive shell
docker-compose exec service-name bash

# Check status
docker-compose ps
```

## Performance & Speed Comparison

| Command | Speed | Use Case |
|---------|-------|----------|
| `restart` | ⚡ Fastest | Quick code changes |
| `up --build` | 🚀 Fast | Smart build + start |
| `build` + `up` | 🐌 Medium | Explicit control |
| `down` + `up` | 🐌 Slow | Clean restart |
| `down -v` + `up` | 🐌🐌 Slowest | Nuclear option |

## Memory Aids

### 🎯 The "3 R's" Rule
- **R**estart → Quick fixes
- **R**ebuild → File changes  
- **R**ecreate → Config changes

### 🔄 The "Build Before Start" Rule
If you changed:
- Dockerfile → BUILD first
- Dependencies → BUILD first  
- Files copied into container → BUILD first
- Just code (with volume mounts) → RESTART only

### 🧠 The "Think Backwards" Rule
1. What did I change?
2. Does it need a rebuild?
3. Do I want a clean slate?
4. Choose the fastest command that works


## Quick Reference Card

| Change Type | Command | Notes |
|-------------|---------|-------|
| Python code | `restart api` | Fastest |
| Dockerfile | `build api && up -d api` | Must rebuild |
| New files | `build api && up -d api` | Must rebuild |
| Config | `down && up -d` | Full restart |
| Debug | `logs -f api` | Check logs |
| Clean slate | `down -v && up --build -d` | Nuclear option |

---

**💡 Pro Tip**: Start with the fastest command that might work, then escalate if needed. Most of the time, `restart` or `up --build` will solve your problem!
