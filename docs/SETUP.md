# 📖 Guía de Instalación - Buymarjet

## Opción 1: Con Docker Compose (Recomendado)

### Requisitos
- Docker v20.10+
- Docker Compose v2.0+
- 4GB RAM disponible

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/negociosrentablesmxn-hash/Buymarjet.git
   cd Buymarjet
   ```

2. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```

3. **Iniciar los servicios**
   ```bash
   docker-compose up -d
   ```

4. **Esperar a que los servicios estén listos**
   ```bash
   docker-compose ps
   ```

5. **Acceder a la aplicación**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - Base de datos: localhost:5432

6. **Ver logs**
   ```bash
   docker-compose logs -f backend
   docker-compose logs -f frontend
   ```

---

## Opción 2: Instalación Manual

### Requisitos
- Node.js v18+
- npm v9+ o yarn v3+
- PostgreSQL 15+
- Redis 7+ (opcional para desarrollo básico)

### 2.1 Instalar Backend

```bash
cd backend

# Instalar dependencias
npm install

# Crear archivo .env en backend/
cp ../.env.example ../.env
# Editar ../.env con la ruta correcta de PostgreSQL

# Crear base de datos
npm run db:create

# Ejecutar migraciones
npm run db:migrate

# Poblar datos iniciales
npm run db:seed

# Iniciar servidor en desarrollo
npm run dev
# El servidor estará en http://localhost:5000
```

### 2.2 Instalar Frontend (en otra terminal)

```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
# La aplicación estará en http://localhost:5173
```

---

## Configuración de Base de Datos

### Con Docker (Automático)
La base de datos se crea automáticamente con docker-compose.

### Manual (PostgreSQL local)

```bash
# Conectarse a PostgreSQL
psql -U postgres

# Crear base de datos
CREATE DATABASE buymarjet;

# Crear usuario
CREATE USER buymarjet WITH PASSWORD 'buymarjet123';

# Otorgar permisos
ALTER ROLE buymarjet SET client_encoding TO 'utf8';
ALTER ROLE buymarjet SET default_transaction_isolation TO 'read committed';
ALTER ROLE buymarjet SET default_transaction_deferrable TO on;
GRANT ALL PRIVILEGES ON DATABASE buymarjet TO buymarjet;

# Salir
\q
```

---

## Variables de Entorno Importante

Edita el archivo `.env` con tus valores:

```env
# Base de datos
DATABASE_URL=postgresql://buymarjet:buymarjet123@localhost:5432/buymarjet

# JWT (cambiar en producción)
JWT_SECRET=tu_clave_secreta_super_segura

# Stripe (obtener en https://stripe.com)
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_PUBLIC_KEY=pk_test_xxxxx

# Email (SendGrid)
SENDGRID_API_KEY=tu_api_key

# Frontend
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## Scripts Disponibles

### Backend
```bash
npm run dev          # Iniciar en desarrollo
npm run build        # Compilar a producción
npm run start        # Iniciar compilado
npm run lint         # Verificar código
npm run test         # Ejecutar tests
npm run db:migrate   # Ejecutar migraciones
npm run db:seed      # Poblar datos
```

### Frontend
```bash
npm run dev          # Iniciar en desarrollo
npm run build        # Compilar a producción
npm run preview      # Preview de producción
npm run lint         # Verificar código
npm run test         # Ejecutar tests
```

---

## Solución de Problemas

### "Error: connect ECONNREFUSED 127.0.0.1:5432"
**Problema**: PostgreSQL no está corriendo
**Solución**:
```bash
# Con Docker
docker-compose up postgres

# O iniciar PostgreSQL localmente
sudo service postgresql start
```

### "Error: Port 5000 already in use"
**Problema**: Otro servicio usa el puerto 5000
**Solución**:
```bash
# Encontrar proceso en puerto 5000
lsof -i :5000

# O cambiar puerto en .env
PORT=5001
```

### "node_modules not found después de clonar"
**Solución**:
```bash
rm -rf node_modules package-lock.json
npm install
```

### "VITE not found"
**Solución**:
```bash
cd frontend
npm install
npm run dev
```

---

## Verificación de Instalación

1. **Backend corriendo**
   ```bash
   curl http://localhost:5000/api/health
   # Debe responder: {"status": "ok"}
   ```

2. **Frontend corriendo**
   - Visita http://localhost:5173
   - Debe cargar la página de inicio

3. **Base de datos conectada**
   ```bash
   curl http://localhost:5000/api/auth/register -X POST
   # Debe responder con validación de datos
   ```

---

## Próximos Pasos

1. Cambiar contraseñas en .env
2. Configurar claves de Stripe
3. Revisar [API.md](./API.md) para entender endpoints
4. Leer [ARCHITECTURE.md](./ARCHITECTURE.md) para arquitectura
5. Empezar a desarrollar!

---

¿Problemas? Abre un [issue en GitHub](https://github.com/negociosrentablesmxn-hash/Buymarjet/issues)
