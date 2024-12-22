# Financial Instruments

This project is a  financial data platform designed to manage, and visualize market data efficiently. It is built with scalability and high performance in mind, leveraging modern technologies like **React**, **Node.js**, **Express**,  **MongoDB**, and **Redis**, all orchestrated with **Docker** 

To explore the platform, check out the live demo at [Demo](https://financial-instruments-neon.vercel.app/).

For more details please visit **`docs/`**

## Prerequisites

- Docker
- Docker Compose

Make sure Docker and Docker Compose are installed on your machine. You can check by running the following commands:

```bash
docker --version
docker-compose --version

```

## Project Structure

- **frontend**: The client-side application built with React.js.
- **backend**: The backend API built with Node.js and Express.
- **mongo**: A MongoDB container for database storage.
- **redis**: A Redis container for caching.

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/Mahmoud-Elwazeer/financial-instruments.git

cd financial-instruments
```

### 2. Create `.env` file

Create a `.env` file in the root directory to configure the project settings like ports, cache expiry time, and logging driver. Here’s an example `.env` file:

```
# Ports
FRONTEND_PORT=8080
BACKEND_PORT=3000

# Cache Expiry Time (in seconds)
EXPIRY_TIME_FOR_CACHE=3600

# Logging drivers
# Use 'json-file' to enable logs
# Use 'none' to diable logs
LOGGING_DRIVER=json-file
```

### 3. Modify Docker Compose (Optional)

The `docker-compose.yml` file uses environment variables defined in the `.env` file. If needed, you can change the configuration directly in the `.env` file:

- **Ports**: Adjust the `FRONTEND_PORT` and `BACKEND_PORT` to change the ports used for the frontend and backend.
- **Cache Expiry**: Change `EXPIRY_TIME_FOR_CACHE` to control the expiry time for cached data (in seconds).
- **Logging Driver**: Set the `LOGGING_DRIVER` to control the logging behavior. The default is `json-file`, but you can change it to `none`or other supported drivers.

### 4. Start the Services

Run the following command to start the services:

```bash
docker-compose up --build
```

This will build and start the services based on the configuration in the `docker-compose.yml` file. Docker Compose will automatically read the `.env` file for any environment variables.

### 5. Access the Application

- The frontend will be available at `http://localhost:<FRONTEND_PORT>`, where `<FRONTEND_PORT>` is the port defined in your `.env` file (default is `8080`).
- The backend will be available at `http://localhost:<BACKEND_PORT>`, where `<BACKEND_PORT>` is the port defined in your `.env` file (default is `3000`).

### 6. View Logs

If you have set the logging driver to `json-file`, you can view logs for each container using:

```bash
docker logs <container_name>
```

For example, to view logs for the frontend service:

```bash
docker logs frontend
```

To follow logs in real-time:

```bash
docker logs -f frontend
```

### 7. Stopping the Services

To stop the services, run:

```bash
docker-compose down
```

This will stop and remove the containers.

## Environment Variables

You can configure the following environment variables in the `.env` file:

| Variable | Description | Default Value |
| --- | --- | --- |
| `FRONTEND_PORT` | Port for the frontend service | `8080` |
| `BACKEND_PORT` | Port for the backend service | `3000` |
| `EXPIRY_TIME_FOR_CACHE` | Expiry time for cache (in seconds) | `3600` |
| `LOGGING_DRIVER` | Docker logging driver (`json-file`, `none`, etc.) | `json-file` |

## Troubleshooting

- **Port Conflicts**: If you encounter port conflicts, check if any other services are using the same ports and update the `.env` file accordingly.
- **Logs Not Appearing**: Ensure that the `LOGGING_DRIVER` is set to a value other than `none` in the `.env` file.

---