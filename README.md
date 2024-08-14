# MongoDB Data Upload and Monitoring with Node.js

This project demonstrates how to use Node.js, Mongoose, and worker threads to upload CSV data to MongoDB and monitor server performance. The project includes APIs for data upload, searching, and aggregation, as well as CPU utilization monitoring.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Monitoring](#monitoring)
- [Running the Application](#running-the-application)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js version 22.x or higher.
- MongoDB installed and running locally or on a server.
- nvm (Node Version Manager) installed (optional but recommended).

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Ensure MongoDB is running:

    Start your MongoDB server if it's not already running:

    ```bash
    sudo service mongod start
    ```

4. Set up your environment:

    Make sure your MongoDB connection string is correctly configured in your application files.

## Project Structure

The project consists of the following key files:

- `index.js`: Main application entry point, where the starts the server.
- `worker.js`: Worker thread handling CSV data processing.
- `models`: establishes MongoDB connection, and Mongoose models.
- `monitor.js`: Script to monitor CPU usage and restart the server if it exceeds a threshold.
- `routes`: Route handling CSV file uploads and other tasks.

## API Endpoints

### 1. Upload API

- **Endpoint:** `/upload`
- **Method:** POST
- **Description:** Uploads a CSV file and processes the data to save it to the MongoDB Agent collection.
- **Example:**

    ```bash
    curl -X POST -F 'file=@/path/to/your/file.csv' http://localhost:3000/upload
    ```

### 2. Search API

- **Endpoint:** `/policy-info`
- **Method:** GET
- **Description:** Searches for policy information by username.
- **Example:**

    ```bash
    curl http://localhost:3000/policy/policy-info?username=JohnDoe
    ```

### 3. Aggregation API

- **Endpoint:** `/aggregated-policies`
- **Method:** GET
- **Description:** Provides aggregated policy information by each user.
- **Example:**

    ```bash
    curl http://localhost:3000/policy/aggregated-policies
    ```

## Monitoring

### monitor.js

The `monitor.js` script monitors the CPU utilization of the Node.js server. If CPU usage exceeds 70%, the server will automatically restart.

#### Setting Up Monitoring

1. Run the monitor script:

    ```bash
    node monitor.js
    ```

## Running the Application

1. Start the server:

    Run the following command to start the Node.js server:

    ```bash
    pm2 start index.js --name data-upload-assessment
    or
    node index.js
    ```

2. Upload a CSV file:

    Use the `/upload` API to upload a CSV file.

3. Search or Aggregate:

    Use the `/search` and `/aggregate` APIs to query the data.

4. Monitor the server:

    Run `monitor.js` in a separate terminal to monitor CPU utilization.

    ```bash
    pm2 start scripts/monitor.js --name cpu-monitor
    or
    node scripts/monitor.js
    ```
