# College Lookup Service

A Node.js service that provides college lookup functionality for WhatsApp bot integration. This service handles the parsing of college data and provides filtering capabilities by district and college type.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Get All Colleges
```
GET /api/colleges
```

### Get Colleges by District
```
GET /api/colleges/district/:district
```

### Get Colleges by Type
```
GET /api/colleges/type/:type
```

### Search Colleges by District and Type
```
GET /api/colleges/search?district=DISTRICT_NAME&type=COLLEGE_TYPE
```

### Get Available College Types
```
GET /api/college-types
```

### Get Available Districts
```
GET /api/districts
```

## College Types
- Engineering
- Arts & Science
- Medical
- Law
- Management & Commerce
- Architecture & Design
- Polytechnic & ITI
- Others

## Deployment
This service is designed to be deployed on Vercel. The API endpoints can be integrated with your WhatsApp bot through CSML code.

## Example Usage
To search for engineering colleges in a specific district:
```
GET /api/colleges/search?district=KERALA&type=Engineering
``` 