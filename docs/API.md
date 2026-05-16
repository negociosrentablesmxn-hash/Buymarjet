# 📚 Documentación de API - Buymarjet

Base URL: `http://localhost:5000/api` (desarrollo)

## Autenticación

Todos los endpoints protegidos requieren un header:
```
Authorization: Bearer {token}
```

---

## 🔐 Autenticación

### POST `/auth/register`
Registrar nuevo usuario

**Request:**
```json
{
  "fullName": "Juan Pérez",
  "email": "juan@example.com",
  "password": "Secure123!",
  "confirmPassword": "Secure123!"
}
```

**Response (201):**
```json
{
  "user": {
    "id": "uuid",
    "fullName": "Juan Pérez",
    "email": "juan@example.com"
  },
  "token": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}
```

### POST `/auth/login`
Iniciar sesión

**Request:**
```json
{
  "email": "juan@example.com",
  "password": "Secure123!"
}
```

**Response (200):**
```json
{
  "user": { ... },
  "token": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}
```

### GET `/auth/me`
Obtener usuario actual (requiere token)

**Response (200):**
```json
{
  "id": "uuid",
  "fullName": "Juan Pérez",
  "email": "juan@example.com"
}
```

---

## 💼 Inversiones

### GET `/investments`
Listar inversiones

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 10)
- `category`: 'Fondos', 'Renta Fija', 'ETF', 'Equity'
- `minRisk`: 'Bajo', 'Medio', 'Alto'

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Fondo Tech Global",
      "description": "Inversión en tecnología",
      "minimumInvestment": 1000,
      "expectedReturn": "12-15%",
      "risk": "Medio",
      "category": "Fondos",
      "currentValue": 50000,
      "investorCount": 1250
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25
  }
}
```

### GET `/investments/:id`
Obtener detalle de inversión

### POST `/investments/:id/invest`
Realizar inversión (requiere token)

**Request:**
```json
{
  "amount": 5000,
  "paymentMethod": "stripe"
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "investmentId": "uuid",
  "amount": 5000,
  "status": "pending",
  "paymentUrl": "https://checkout.stripe.com/..."
}
```

---

## 📊 Portafolio

### GET `/portfolio`
Obtener portafolio del usuario (requiere token)

**Response (200):**
```json
{
  "summary": {
    "totalInvested": 50000,
    "totalValue": 57500,
    "totalGain": 7500,
    "gainPercentage": 15
  },
  "holdings": [
    {
      "id": "uuid",
      "name": "Fondo Tech Global",
      "amount": 10000,
      "currentValue": 10800,
      "gain": 800,
      "gainPercentage": 8
    }
  ]
}
```

### GET `/portfolio/history`
Histórico del portafolio

**Query Parameters:**
- `period`: 'day', 'week', 'month', 'year', 'all'

---

## 💳 Transacciones

### GET `/transactions`
Obtener historial (requiere token)

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 20)
- `type`: 'investment', 'withdrawal', 'dividend'

### POST `/transactions/withdraw`
Solicitar retiro (requiere token)

**Request:**
```json
{
  "amount": 1000,
  "bankAccount": "ES9121008290061234567890"
}
```

---

## Códigos de Error

| Código | Descripción |
|--------|-------------|
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 422 | Validation Error |
| 429 | Too Many Requests |
| 500 | Server Error |

---

Para más detalles, contacta support@buymarjet.com
