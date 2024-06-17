#!/bin/bash

# Function to display status messages
show_status() {
    echo "==============================="
    echo "$1"
    echo "==============================="
}

### MySQL Installation ###

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    show_status "Installing MySQL..."

    # Update package list
    sudo apt-get update

    # Install MySQL
    sudo apt-get install -y mysql-server

    # Configure MySQL to allow root access without password (insecure, for development only)
    sudo mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'; FLUSH PRIVILEGES;"
else
    show_status "MySQL is already installed."
fi

### MySQL Restart ###

show_status "Restarting MySQL..."

# Stop MySQL if it's running
sudo service mysql stop

# Start MySQL
sudo service mysql start

# Create database and table if they don't exist
show_status "Configuring MySQL..."
mysql -u root -proot -e "CREATE DATABASE IF NOT EXISTS notes; USE notes; CREATE TABLE IF NOT EXISTS note (id_note VARCHAR(250) PRIMARY KEY, title VARCHAR(45), completed TINYINT, archived TINYINT);"

### Backend Configuration ###

# Backend directory
backend_dir="./backend"

# Check if backend directory exists
if [ -d "$backend_dir" ]; then
    show_status "Configuring backend..."

    # Enter backend directory
    cd "$backend_dir"

    # Install necessary dependencies for backend
    show_status "Installing dependencies for backend..."
    npm install

    # Install nodemon globally
    show_status "Installing nodemon globally..."
    sudo npm install -g nodemon

    # Start backend
    show_status "Starting backend..."
    npm start &

    # Return to root project directory
    cd ..
else
    echo "Error: Directory '$backend_dir' not found. Make sure the backend is present."
    exit 1
fi

### Frontend Configuration ###

# Frontend directory
frontend_dir="./frontend"

# Check if frontend directory exists
if [ -d "$frontend_dir" ]; then
    show_status "Configuring frontend..."

    # Enter frontend directory
    cd "$frontend_dir"

    # Install necessary dependencies for frontend
    show_status "Installing dependencies for frontend..."
    npm install

    # Additional setup for frontend if needed

    # Start frontend
    show_status "Starting frontend..."
    npm run dev &

    # Return to root project directory
    cd ..
else
    echo "Error: Directory '$frontend_dir' not found. Make sure the frontend is present."
    exit 1
fi

# Final message of the script
echo "Projects configured and running. Check the output logs to verify the status of each project."
