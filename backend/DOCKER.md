# Docker Commands

## Iniciar o PostgreSQL

```bash
# Iniciar os containers em background
docker-compose up -d

# Ver logs do PostgreSQL
docker-compose logs postgres

# Ver status dos containers
docker-compose ps
```

## Parar o PostgreSQL

```bash
# Parar os containers
docker-compose down

# Parar e remover volumes (apagar dados)
docker-compose down -v
```

- **Conexão direta via psql**:

```bash
docker-compose exec postgres psql -U dt_money_user -d dt_money
```

**Nota**: O PostgreSQL está rodando na porta 6789 do host (mapeada para a porta 5432 do container).

## Comandos úteis

```bash
# Recriar containers
docker-compose up -d --force-recreate

# Ver logs em tempo real
docker-compose logs -f postgres

# Backup do banco
docker-compose exec postgres pg_dump -U dt_money_user dt_money > backup.sql

# Restaurar backup
docker-compose exec -T postgres psql -U dt_money_user dt_money < backup.sql
```
