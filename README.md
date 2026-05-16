# 💰 Buymarjet - Plataforma de Inversión Tipo Fintech

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://react.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791.svg)](https://www.postgresql.org/)

**Buymarjet** es una plataforma innovadora de inversión que permite a usuarios acceder a oportunidades de inversión diversificadas de manera segura, transparente y con retornos competitivos.

Clonada y adaptada desde la estructura de **Ecoavocadoku**, ahora especializada en **fintech e inversiones**.

---

## 🎯 Características Principales

### 👥 Autenticación y Gestión de Usuarios
- Registro e inicio de sesión seguro con JWT
- Perfil de usuario personalizado
- Gestión de contraseña y datos personales
- Verificación de email de dos pasos

### 📊 Catálogo de Inversiones
- Exploración de oportunidades de inversión
- Filtrado por categoría, riesgo y retorno esperado
- Información detallada de cada inversión
- Comparativa de rendimiento

### 💼 Cartera de Inversiones
- Vista de todas tus inversiones activas
- Seguimiento en tiempo real de ganancias/pérdidas
- Análisis de diversificación
- Histórico de transacciones

### 💳 Proceso de Inversión
- Selección de oportunidades
- Confirmación de monto
- Múltiples métodos de pago (Stripe, Transferencia bancaria)
- Confirmación instantánea

### 📈 Dashboard Personalizado
- Resumen de inversiones
- Gráficos de rendimiento
- Alertas de oportunidades
- Reportes descargables

### 🎁 Sistema de Referidos
- Código de referido único
- Comisiones por referidos
- Seguimiento de ganancias

---

## 🏗️ Estructura del Proyecto

```
Buymarjet/
├── frontend/                 # Aplicación React (Cliente)
│   ├── src/
│   │   ├── components/      # Componentes reutilizables
│   │   ├── pages/           # Páginas principales
│   │   ├── hooks/           # Hooks personalizados
│   │   ├── context/         # Context API (Estado global)
│   │   ├── services/        # Llamadas a API
│   │   ├── styles/          # Estilos globales
│   │   ├── utils/           # Utilidades
│   │   └── App.tsx          # Componente raíz
│   ├── public/              # Archivos estáticos
│   ├── Dockerfile           # Configuración Docker
│   ├── package.json         # Dependencias
│   └── vite.config.ts       # Configuración Vite
│
├── backend/                  # API Node.js/Express (Servidor)
│   ├── src/
│   │   ├── routes/          # Rutas API
│   │   ├── controllers/     # Lógica de negocio
│   │   ├── models/          # Modelos de datos
│   │   ├── middleware/      # Middleware (Auth, validación)
│   │   ├── services/        # Servicios (Base de datos, APIs externas)
│   │   ├── utils/           # Funciones auxiliares
│   │   └── app.ts           # Configuración principal
│   ├── migrations/          # Migraciones de base de datos
│   ├── Dockerfile           # Configuración Docker
│   ├── package.json         # Dependencias
│   └── .env.example         # Variables de entorno ejemplo
│
├── database/                 # Scripts de base de datos
│   ├── migrations/          # Migraciones SQL
│   └── seeds/               # Datos iniciales
│
├── docs/                     # Documentación
│   ├── API.md               # Documentación de endpoints
│   ├── SETUP.md             # Guía de instalación
│   └── ARCHITECTURE.md      # Arquitectura del proyecto
│
├── .github/
│   └── workflows/           # GitHub Actions (CI/CD)
│
├── docker-compose.yml       # Configuración Docker multi-contenedor
├── .env.example             # Variables de entorno ejemplo
├── .gitignore               # Archivos ignorados por Git
├── LICENSE.md               # Licencia MIT
└── package.json             # Root package.json (monorepo)
```

---

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js v18+
- npm o yarn
- Docker y Docker Compose (opcional)
- PostgreSQL 15+ (si no usas Docker)

### Instalación Local

#### 1. Clonar el repositorio
```bash
git clone https://github.com/negociosrentablesmxn-hash/Buymarjet.git
cd Buymarjet
```

#### 2. Configurar variables de entorno
```bash
cp .env.example .env
# Edita .env con tus valores
```

#### 3. Con Docker Compose (Recomendado)
```bash
docker-compose up -d
```

Acceso:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- PostgreSQL: localhost:5432

#### 4. Sin Docker - Instalación Manual

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend (en otra terminal):**
```bash
cd frontend
npm install
npm run dev
```

---

## 📚 Documentación

- **[API Documentation](./docs/API.md)** - Endpoints disponibles
- **[Setup Guide](./docs/SETUP.md)** - Guía de instalación detallada
- **[Architecture](./docs/ARCHITECTURE.md)** - Arquitectura del sistema

---

## 🔐 Seguridad

- ✅ Autenticación JWT con tokens seguros
- ✅ Contraseñas encriptadas con bcrypt
- ✅ CORS configurado
- ✅ Rate limiting contra abuso
- ✅ Helmet para headers de seguridad
- ✅ Validación de entrada en todos los endpoints
- ✅ SQL injection prevention

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool (rápido)
- **TailwindCSS** - Estilos
- **React Router** - Navegación
- **Axios** - HTTP client
- **Chart.js** - Gráficos
- **React Hook Form** - Formularios

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **PostgreSQL** - Base de datos
- **TypeORM** - ORM
- **JWT** - Autenticación
- **Stripe** - Procesamiento de pagos
- **Redis** - Cache y sesiones

### DevOps
- **Docker** - Contenedores
- **Docker Compose** - Orquestación
- **GitHub Actions** - CI/CD
- **ESLint** - Linting
- **Prettier** - Code formatting

---

## 📖 Flujos Principales

### 1. Registro e Inicio de Sesión
```
Usuario → Página de Registro → Validación → BD → Token JWT
```

### 2. Exploración de Inversiones
```
Home → Catálogo → Filtros → Detalle de Inversión
```

### 3. Realizar Inversión
```
Ver Oportunidad → Seleccionar Monto → Seleccionar Pago → Procesar → Confirmación
```

### 4. Gestionar Cartera
```
Dashboard → Ver Inversiones → Analizar Rendimiento → Retirar Fondos
```

---

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Con cobertura
npm run test:coverage

# Watch mode
npm run test:watch
```

---

## 📊 Base de Datos

### Principales Tablas
- **users** - Información de usuarios
- **investments** - Oportunidades de inversión
- **user_investments** - Inversiones realizadas por usuarios
- **transactions** - Historial de transacciones
- **referrals** - Sistema de referidos
- **wallet** - Billetera de usuario

---

## 🤝 Contribuyendo

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Ver [LICENSE.md](./LICENSE.md) para más detalles.

---

## 📞 Soporte

- 📧 Email: support@buymarjet.com
- 💬 Issues: [GitHub Issues](https://github.com/negociosrentablesmxn-hash/Buymarjet/issues)
- 📚 Documentación: [Wiki del Proyecto](https://github.com/negociosrentablesmxn-hash/Buymarjet/wiki)

---

## 🎯 Roadmap

- [ ] v1.0 - MVP con funcionalidades core
- [ ] v1.1 - Integración Stripe completa
- [ ] v1.2 - App móvil con React Native
- [ ] v2.0 - Blockchain y contratos inteligentes
- [ ] v2.1 - Análisis IA de portafolio
- [ ] v3.0 - Marketplace de inversiones peer-to-peer

---

**Hecho con ❤️ por el equipo de Buymarjet**

© 2026 Negociosrentables MXN. Todos los derechos reservados.