# URL SHORTY - Scalable URL Shortener System with TypeScript

This URL shortener system, built with TypeScript, efficiently shortens long URLs into manageable links. It's designed to be scalable, performant, and easily deployable.

## Features

- **URL Shortening**: Converts long URLs into shorter, customized links.
- **Scalability**: Designed with scalability in mind to handle increased load and traffic efficiently.
- **Analytics**: Tracks and provides analytics on shortened URLs (click count, location data, etc.).
- **Customization**: Allows users to create custom short links or provides auto-generated ones.
- **Redirection**: Seamlessly redirects users from short links to the original long URLs.

## Tech Stack

- **Backend**: Node.js, Express.js with TypeScript
- **Database**: MongoDB, Redis (for caching)
- **Frontend**: HTML/CSS (for a simple UI)
- **Deployment**: Docker, Kubernetes (for containerization and orchestration)
- **Additional Tools**: JWT for authentication, Prometheus for monitoring, Grafana for visualization

## System Architecture

The system follows a microservices architecture to ensure scalability and modularity. It comprises:

- **URL Shortening Service**: Responsible for generating and managing short links.
- **Analytics Service**: Collects and processes analytics data for shortened URLs.
- **Database Service**: Handles data storage and retrieval (MongoDB).
- **Caching Service**: Utilizes Redis for caching frequently accessed data.

## Setup

### Prerequisites

- Node.js and npm installed
- MongoDB and Redis running locally or accessible
- Docker and Kubernetes (optional, for production deployment)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/url-shortener.git
    cd url-shortener
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure environment variables:

    ```bash
    # Create a .env file and add necessary variables like MongoDB connection string, Redis URL, etc.
    ```

4. Start the application:

    ```bash
    npm start
    ```

## Usage

1. Access the system via the provided endpoint.
2. Enter the long URL you want to shorten.
3. Optionally, customize the short URL.
4. Access the shortened URL and verify redirection.

# User Stories

## As an authenticated user, I want to:

### 1. Shorten URLs

**Scenario**: As a user, I want to be able to shorten a long URL into a shorter, more manageable link.

### 2. Customize Shortened URLs

**Scenario**: As a user, I want the option to customize the short URL to something more meaningful or personalized.

### 3. View My Shortened URLs

**Scenario**: As a user, I want to view a list of all the URLs I've shortened.

### 4. Track Clicks and Analytics

**Scenario**: As a user, I want to see analytics for each shortened URL, including the number of clicks and location data.

## As an unauthenticated user, I want to:

### 1. Shorten URLs

**Scenario**: As an unauthenticated user, I want to be able to shorten a long URL without needing to sign in.

### 2. Access Shortened URLs

**Scenario**: As an unauthenticated user, I want to access shortened URLs created by others.

## Additional Functionalities:

### 1. Expire or Delete Shortened URLs

**Scenario**: As a user, I want the ability to expire or delete shortened URLs when they're no longer needed.

### 2. Redirect Users

**Scenario**: As a user, I want the shortened URL to redirect users seamlessly to the original long URL.

### 3. Metrics for Popular URLs

**Scenario**: As a user, I want to view metrics for the most popular or frequently clicked shortened URLs.

### 4. URL Validation

**Scenario**: As a user, I want the system to validate the entered URLs to ensure they are valid and accessible.

### 5. API Access

**Scenario**: As a developer, I want access to APIs for shortening URLs programmatically.

### 6. Rate Limiting

**Scenario**: As a user, I want the system to have rate limiting to prevent abuse or excessive URL shortening.

### 7. User Authentication

**Scenario**: As a user, I want the option to sign in/sign up to manage my shortened URLs.

### 8. QR Codes for Shortened URLs

**Scenario**: As a user, I want the system to generate QR codes for shortened URLs for easy sharing and access.

### 9. URL Expiry Notifications

**Scenario**: As a user, I want to receive notifications when shortened URLs are about to expire.


## Contribution

Contributions are welcome! If you want to contribute, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).
