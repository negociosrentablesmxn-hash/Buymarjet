# Architecture - Buymarjet

## Overview

Buymarjet es una plataforma de inversión construida con una arquitectura moderna de **microservicios** y **monorepo**.

## Stack Tecnológico

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navegación
- **Zustand** - Estado global
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **TypeORM** - ORM
- **PostgreSQL** - Base de datos principal
- **Redis** - Cache
- **JWT** - Autenticación
- **Stripe** - Procesamiento de pagos

### DevOps
- **Docker** - Contenedores
- **Docker Compose** - Orquestación
- **GitHub Actions** - CI/CD
- **Nginx** - Reverse proxy

---

## Estructura de Carpetas

```
Buymarjet/
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes reutilizables
│   │   ├── pages/           # Páginas principales
│   │   ├── services/        # Llamadas a API
│   │   ├── store/           # Zustand stores
│   │   ├── hooks/           # Custom hooks
│   │   ├── utils/           # Funciones auxiliares
│   │   └── App.tsx          # Componente raíz
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── src/
│   │   ├── app.ts           # Express app principal
│   │   ├── routes/          # Rutas API
│   │   │   ├── auth.routes.ts
│   │   │   ├── investment.routes.ts
│   │   │   ├── portfolio.routes.ts
│   │   │   └── transaction.routes.ts
│   │   ├── controllers/     # Lógica de negocio (TODO)
│   │   ├── services/        # Servicios (TODO)
│   │   ├── entities/        # Modelos TypeORM
│   │   ├── middleware/      # Middleware de Express
│   │   ├── database/        # Configuración de BD
│   │   ├── utils/           # Funciones auxiliares
│   │   └── migrations/      # Migraciones de BD
│   ├── package.json
│   └── tsconfig.json
│
├── docs/
│   ├── API.md               # Documentación de endpoints
│   ├── SETUP.md             # Guía de instalación
│   └── ARCHITECTURE.md      # Este archivo
│
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## Flujo de Datos

### 1. Autenticación
```
Usuario → Login Form → API /auth/login → JWT Token → Zustand Store → Protected Routes
```

### 2. Exploración de Inversiones
```
Frontend → API /investments → Backend → TypeORM → PostgreSQL → Response → React Components
```

### 3. Realización de Inversión
```
Usuario → Investment Form → Stripe Payment → API /investments/:id/invest → BD → Confirmación
```

### 4. Visualización de Portafolio
```
Usuario → Dashboard → API /portfolio → Cálculos → Gráficos → Componentes
```

---

## Modelos de Datos

### User
```typescript
{
  id: UUID,
  fullName: string,
  email: string,
  password: string (hashed),
  phone?: string,
  country?: string,
  city?: string,
  emailVerified: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Investment
```typescript
{
  id: UUID,
  name: string,
  description: string,
  minimumInvestment: decimal,
  expectedReturn: string,
  risk: 'Bajo' | 'Medio' | 'Alto',
  category: string,
  currentValue: decimal,
  investorCount: number,
  active: boolean,
  createdAt: Date
}
```

### UserInvestment
```typescript
{
  id: UUID,
  userId: UUID,
  investmentId: UUID,
  amount: decimal,
  currentValue: decimal,
  status: 'active' | 'withdrawn' | 'pending',
  investedAt: Date
}
```

### Transaction
```typescript
{
  id: UUID,
  userId: UUID,
  type: 'investment' | 'withdrawal' | 'dividend',
  amount: decimal,
  status: 'pending' | 'completed' | 'failed',
  paymentMethod?: string,
  transactionId?: string,
  createdAt: Date
}
```

---

## Seguridad

### Autenticación
- JWT tokens con expiración
- Refresh tokens para renovación
- Contraseñas encriptadas con bcrypt

### Autorización
- Middleware de autenticación en rutas protegidas
- Validación de propiedad de recursos

### Validación
- Express-validator para validación de entrada
- Sanitización de datos

### Headers
- Helmet para headers de seguridad
- CORS configurado correctamente
- Rate limiting para prevenir abuso

---

## API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener usuario actual

### Inversiones
- `GET /api/investments` - Listar inversiones
- `GET /api/investments/:id` - Obtener detalle
- `POST /api/investments/:id/invest` - Crear inversión

### Portafolio
- `GET /api/portfolio` - Ver portafolio
- `GET /api/portfolio/history` - Histórico

### Transacciones
- `GET /api/transactions` - Listar transacciones
- `POST /api/transactions/withdraw` - Solicitar retiro
- `GET /api/transactions/:id` - Detalle transacción

### Usuario
- `GET /api/user/profile` - Obtener perfil
- `PUT /api/user/profile` - Actualizar perfil
- `PUT /api/user/password` - Cambiar contraseña

---

## Deployment

### Desarrollo
```bash
docker-compose up -d
```

### Producción
- Docker images en registry
- Kubernetes para orquestación
- GitHub Actions para CI/CD
- SSL/TLS certificates
- CDN para archivos estáticos

---

## Próximas Mejoras

- [ ] Integración Stripe completa
- [ ] WebSockets para actualizaciones en tiempo real
- [ ] Admin panel
- [ ] Reportes descargables
- [ ] App móvil
- [ ] Blockchain para transacciones
- [ ] IA para recomendaciones
- [ ] Testing automatizado

---

Para más detalles, ver [README.md](../README.md) y [SETUP.md](./SETUP.md)
