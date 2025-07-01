Based on the provided files, here's a comprehensive summary of the SchedShare project:

## Core Functionality and User Experience

SchedShare is a **course schedule to calendar converter** that transforms VIU (Vancouver Island University) course schedule PDFs into calendar events. The user experience focuses on simplicity:

1. **Upload** a course schedule PDF
2. **Select** which courses to add to calendar
3. **Choose** calendar provider (Google Calendar or Apple/Outlook via ICS)
4. **Automatically create** recurring calendar events

## Frontend and Backend Technologies

### Frontend
- **Bootstrap 5.3+** for responsive UI components
- **Vanilla JavaScript** for interactive features (drag-and-drop file upload, event selection)
- **HTML5 templates** with Jinja2 templating engine
- **CSS3** with custom animations and responsive design

### Backend
- **Flask** (Python web framework) as the main application server
- **Gunicorn** as the WSGI server for production
- **Redis** for session storage and caching

## Primary Programming Languages

- **Python** (primary language for backend logic, PDF parsing, calendar integration)
- **JavaScript** (frontend interactivity)
- **HTML/CSS** (templating and styling)

## Database and Data Management

- **Redis** for session storage and temporary data caching
- **In-memory caching** (`UPLOAD_CACHE`) for course data during user sessions
- **No persistent database** - follows privacy-first approach where data is deleted after processing
- **File-based storage** for temporary PDF uploads

## Key Features and Modules

### Unique Differentiators
1. **Smart PDF Parsing**: Automatically extracts course details (times, locations, instructors) from VIU course schedule PDFs
2. **Multi-Provider Calendar Integration**: Supports both Google Calendar (OAuth) and Apple/Outlook (ICS download)
3. **Recurring Event Creation**: Automatically generates properly scheduled recurring events for entire semesters
4. **Privacy-First Design**: No data persistence - all data deleted after processing
5. **Email Summaries**: Optional email confirmations of created events

### Core Modules
- `pdf_parser.py`: PDF text extraction and course data parsing
- `calendar_providers/`: Modular provider system (Google, Apple)
- `app.py`: Main Flask application with OAuth flows
- Template system: Responsive UI with Bootstrap

## External Service Integrations

### APIs and Services
- **Google Calendar API**: OAuth2 integration for direct event creation
- **Gmail SMTP**: Email delivery for event summaries
- **Apple Sign In**: OAuth integration (configured but simplified to ICS download)
- **Let's Encrypt**: SSL certificate management

### Third-Party Libraries
- `pdfplumber`: PDF text extraction
- `google-api-python-client`: Google Calendar integration
- `icalendar`: ICS file generation
- `Flask-Mail`: Email functionality

## Deployment Architecture

### Containerization
- **Docker** with multi-stage builds
- **Docker Compose** for orchestration
- **Nginx** as reverse proxy with SSL termination

### Cloud Deployment
- **Google Cloud Platform** (VM-based deployment)
- **Nginx** for load balancing and SSL
- **Health checks** and auto-restart policies
- **Rate limiting** (10 req/s with burst handling)

### CI/CD
- **Manual deployment** via `deploy.sh` script
- **Environment-specific** Docker Compose files (dev vs prod)
- **File watching** in development mode for hot reloading

## Unique Technical Solutions

### 1. Modular Calendar Provider System
```python
class CalendarProvider(ABC):
    # Abstract base class for different calendar providers
    # Allows easy addition of new providers (Outlook, etc.)
```

### 2. Redis-Backed Session Management
- Session data stored in Redis instead of server memory
- Enables horizontal scaling and session persistence
- JSON serialization for complex data structures

### 3. Smart PDF Parsing Algorithm
- Extracts structured course data from unstructured PDF text
- Handles multi-location courses and complex scheduling patterns
- Robust error handling for malformed PDFs

### 4. OAuth Flow with State Management
- Secure OAuth implementation with PKCE (Proof Key for Code Exchange)
- Redis-backed state storage for OAuth flows
- Automatic cleanup of expired OAuth states

### 5. Development-Friendly Architecture
- **File watching** with automatic server restart
- **Hot reloading** during development
- **Environment-specific** configurations
- **Health checks** for production reliability

### 6. Privacy-First Data Handling
- No persistent storage of user data
- Automatic cleanup of uploaded files
- Session-based temporary storage only
- Clear privacy policy and data handling practices

This architecture demonstrates a well-structured, production-ready application with strong focus on user experience, security, and maintainability.