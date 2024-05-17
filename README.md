# Cron and Scheduled Serverless Execution (CASSE)

## Introduction

Welcome to the **Cron and Scheduled Serverless Execution (CASSE)** project! This repository contains the source code, documentation, and resources for implementing a dynamic cron scheduler tailored for HTTP requests and serverless function deployment. The project aims to bridge the gap between traditional cron scheduling and modern serverless computing, offering a comprehensive framework for task automation in web environments.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Architecture](#architecture)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Project Diagrams](#project-diagrams)
- [Testing](#testing)
- [Results and Conclusion](#results-and-conclusion)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Dynamic Task Scheduling**: Schedule tasks based on time, events, or external triggers.
- **Serverless Function Deployment**: Seamlessly deploy functions written in various programming languages.
- **HTTP Triggering**: Invoke serverless functions via standard HTTP endpoints.
- **Scalability and Reliability**: Designed for high concurrency and fault tolerance.
- **User-Friendly Interface**: Intuitive UI for task configuration and monitoring.

## Architecture

The system is built using the following components:

- **User Authentication**: Secure access using JSON Web Tokens (JWT).
- **Function Deployment**: Deploy functions to AWS Lambda and manage them through AWS API Gateway.
- **Cron Job Scheduling**: Use the Clockwerk library for creating and managing cron jobs.
- **Job Execution**: High-concurrency job execution using Golang and the fasthttp library.
- **User Management**: Manage user profiles, permissions, and notifications with Flask backend.

## Setup and Installation

### Prerequisites

- Docker
- AWS Account
- Postman (for API testing)

### Installation Steps

1. **Clone the Repository**:
   ```sh
   git clone https://github.com/yourusername/CASSE.git
   cd CASSE
   ```

2. **Environment Setup**:
Configure your AWS credentials and other environment variables in the .env file.

3. **Docker Setup:**:
Build and run the Docker containers:

```sh
docker-compose up --build
```

4. **API Documentation**:
Import the provided Postman collection to explore and test the APIs.

5. **Usage**:

User Authentication:
Sign up and obtain JWT tokens for API access.

Function Deployment:
Upload functions or write code directly in the provided editor.
Deploy to AWS Lambda and obtain the function URL.

Job Scheduling:
Create and manage cron jobs through the user interface.
Define job details and scheduling rules.

Monitoring:
Monitor job status, execution logs, and system health through the admin UI.
Project Diagrams

5. **Testing**:
```
Total Jobs: 517
Total Users: 100
Total Serverless Functions: 178
Resource Usage:
CPU: ~0.25% of a single core
Memory: ~370 MB
```

6. **Results and Conclusion**:
This project successfully addresses the challenges of dynamic task scheduling and serverless function deployment. By integrating cron scheduling with serverless computing, we provide a flexible and scalable solution for task automation in web environments. The intuitive interfaces and seamless workflows enhance developer productivity, enabling efficient task orchestration without the overhead of infrastructure management.

**Contributing**
We welcome contributions to enhance the CASSE project! Please follow the standard GitHub Flow and submit pull requests for review.

**License**
This project is licensed under the MIT License. See the LICENSE file for more details.

**Credits**
Clockwerk: https://github.com/nightsilvertech/clockwerk 

**Developed by**:

Swapnil Satish Mali
Siddhesh Sunil Kitkaru
Smit Sandeep Butle

**Under the guidance of**:

Prof. N.L. Mudegol
Dr. M. A. Shah
