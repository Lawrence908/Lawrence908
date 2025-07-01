## **Magic Pages - Personalized Storybook Generation Platform**

### **Main Purpose & Features**
Magic Pages is a production-ready, cloud-native platform that generates personalized children's storybooks using AI. The system transforms user inputs into beautifully crafted, unique storybooks through an automated pipeline from story creation to print-on-demand delivery.

**Key Features:**
- AI-powered content generation using OpenAI GPT-4
- Automated PDF generation with covers and interiors
- Print-on-demand integration via Lulu API
- Enterprise security with Azure Key Vault
- RESTful API for frontend and third-party integrations
- Real-time analytics and order tracking

### **Technology Stack**

**Backend:**
- **Framework:** Django 5.1+ with Django REST Framework
- **Language:** Python 3.11+
- **Web Server:** Nginx + Gunicorn
- **Database:** PostgreSQL
- **Cloud Platform:** Microsoft Azure

**Frontend:**
- **Platform:** WordPress/WooCommerce (managed by external agency)
- **Integration:** Custom WordPress plugin with AJAX/webhooks

### **Programming Languages**
- **Primary:** Python (Django backend)
- **Secondary:** PHP (WordPress frontend)
- **Markup:** HTML, CSS, JavaScript

### **Notable Integrations**
- **AI Services:** OpenAI GPT-4 for story generation and DALL-E for image creation
- **Print Services:** Lulu API for print-on-demand fulfillment
- **Cloud Services:** Azure Blob Storage, Azure Key Vault, Azure CDN
- **Security:** Fail2Ban, Django-Axes for intrusion prevention
- **Monitoring:** Custom Prometheus metrics

### **Database & Data Modeling**
- **Technology:** PostgreSQL with comprehensive relational schema
- **Key Models:** Customers, Orders, Books, Interiors, Covers, API Logs, Lulu Orders
- **Features:** UUID primary keys, JSON fields for flexible data, comprehensive indexing
- **Storage:** ~10KB per API log record, efficient data retention policies

### **Unique Technical Challenges Solved**
- **Cross-platform PDF generation** using WeasyPrint for consistent output
- **Secure API key management** through Azure Key Vault integration
- **Modular Django architecture** with separate apps for each business domain
- **Real-time order processing** with background task handling
- **Multi-environment deployment** with separate dev/prod configurations

### **User Interaction**
- **Live Site:** Production server at `https://20.175.64.140/`
- **Admin Dashboard:** `https://20.175.64.140/admin/`
- **API Access:** RESTful endpoints for frontend integration
- **Testing:** Comprehensive Postman collections for API testing

### **Additional Technologies & Tools**
- **CI/CD:** Azure Pipelines for automated deployment
- **Testing:** Django unit tests, Postman API testing
- **Caching:** Redis integration for performance optimization
- **Security:** SSL/TLS, rate limiting, input validation
- **Monitoring:** Structured JSON logging, health checks, performance metrics
- **Development:** Virtual environments, migration management, comprehensive documentation

The project demonstrates enterprise-grade architecture with a focus on scalability, security, and maintainability, successfully bridging AI-powered content generation with traditional print-on-demand fulfillment.