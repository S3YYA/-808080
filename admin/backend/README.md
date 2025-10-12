# CTF Challenge Backend API

A Node.js/Express backend API for the CTF Challenge Binary Wheel Decoder.

## Features

- **Wheel Validation**: Validates 32-element binary wheel configurations with Hamming distance checks
- **Binary Decoding**: Decodes binary input using wheel mapping
- **Modular Architecture**: Clean separation of routes, utilities, and main server
- **Docker Support**: Containerized with health checks and security best practices
- **CORS Enabled**: Ready for frontend integration
- **Request Logging**: Morgan middleware for request logging

## API Endpoints

### POST /api/validate-wheel

Validates a binary wheel configuration.

**Request Body:**
```json
{
  "wheelData": ["00000", "00001", "00011", "00111", ...]
}
```

**Response:**
```json
{
  "valid": true
}
```

**Error Response:**
```json
{
  "valid": false,
  "reason": "Adjacent elements 0 and 1 differ by 2 bits (must be exactly 1)"
}
```

### POST /api/decode

Decodes binary input using wheel mapping.

**Request Body:**
```json
{
  "binaryInput": "000010001100111",
  "wheelData": ["00000", "00001", "00011", "00111", ...]
}
```

**Response:**
```json
{
  "decoded": "ABC"
}
```

**Error Response:**
```json
{
  "error": "Invalid wheel configuration: Adjacent elements 0 and 1 differ by 2 bits (must be exactly 1)"
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "CTF Challenge Backend API"
}
```

## Wheel Validation Rules

1. **Array Length**: Must have exactly 32 elements
2. **Element Format**: Each element must be a 5-bit binary string (only '0' and '1')
3. **Uniqueness**: All elements must be unique
4. **Hamming Distance**: Adjacent elements must differ by exactly 1 bit
5. **Cyclic Property**: First and last elements must also differ by 1 bit

## Binary Decoding Logic

1. **Input Processing**: Binary string is split into 5-bit chunks
2. **Padding**: Last chunk is padded with leading zeros if < 5 bits
3. **Decimal Conversion**: Each 5-bit chunk is converted to decimal (0-31)
4. **Character Mapping**: Decimal values are mapped to characters (A-Z, 0-5)

## Development

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
cd backend
npm install
```

### Running

```bash
# Development mode
npm run dev

# Production mode
npm start
```

### Docker

```bash
# Build image
docker build -t ctf-backend .

# Run container
docker run -p 5000:5000 ctf-backend
```

## Project Structure

```
backend/
├── routes/
│   ├── validate.js    # Wheel validation endpoint
│   └── decode.js      # Binary decoding endpoint
├── utils/
│   ├── validateWheel.js  # Wheel validation logic
│   └── decodeBinary.js   # Binary decoding logic
├── server.js          # Main Express server
├── package.json       # Dependencies and scripts
├── Dockerfile         # Container configuration
└── README.md          # This file
```

## Error Handling

The API provides comprehensive error handling with:
- Input validation with descriptive error messages
- Proper HTTP status codes
- JSON error responses
- Server-side logging
- Graceful error recovery
