#!/bin/bash

# Función para mostrar mensajes de estado
show_status() {
    echo "==============================="
    echo "$1"
    echo "==============================="
}

### Instalando MYSQL.
# Verificar si MySQL está instalado
if ! command -v mysql &> /dev/null; then
    show_status "Instalando MySQL..."

    # Actualizar la lista de paquetes
    sudo apt-get update

    # Instalar MySQL
    sudo apt-get install -y mysql-server

    # Configurar MySQL para permitir el acceso root sin contraseña (inseguro, solo para desarrollo)
    sudo mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'; FLUSH PRIVILEGES;"
else
    show_status "MySQL ya está instalado."
fi


### Configuración de MySQL ###
show_status "Configurando MySQL..."

# Asegurarse de que MySQL esté en funcionamiento
sudo service mysql start

# Crear la base de datos y la tabla si no existen
mysql -u root -proot -e "CREATE DATABASE IF NOT EXISTS notes; USE notes; CREATE TABLE IF NOT EXISTS note (id_note VARCHAR(250) PRIMARY KEY, title VARCHAR(45), completed TINYINT, archived TINYINT);"

### Configuración del Backend ###

# Directorio del backend
backend_dir="./backend"

# Verificar si existe el directorio backend
if [ -d "$backend_dir" ]; then
    show_status "Configurando el backend..."

    # Entrar al directorio backend
    cd "$backend_dir"

    # Instalación de dependencias necesarias para el backend
    show_status "Instalando dependencias para el backend..."
    npm install

    # Instalación de nodemon globalmente
    show_status "Instalando nodemon globalmente..."
    sudo npm install -g nodemon

    # Iniciar el backend
    show_status "Iniciando el backend..."
    npm start &

    # Regresar al directorio raíz del proyecto
    cd ..
else
    echo "Error: No se encontró el directorio '$backend_dir'. Asegúrate de que el backend esté presente."
    exit 1
fi

### Configuración del Frontend ###

# Directorio del frontend
frontend_dir="./frontend"

# Verificar si existe el directorio frontend
if [ -d "$frontend_dir" ]; then
    show_status "Configurando el frontend..."

    # Entrar al directorio frontend
    cd "$frontend_dir"

    # Instalación de dependencias necesarias para el frontend
    show_status "Instalando dependencias para el frontend..."
    npm install

    # Instalación de dependencias de desarrollo para el frontend si es necesario

    # Configuración adicional para el frontend aquí si es necesario

    # Iniciar el frontend
    show_status "Iniciando el frontend..."
    npm run dev &

    # Regresar al directorio raíz del proyecto
    cd ..
else
    echo "Error: No se encontró el directorio '$frontend_dir'. Asegúrate de que el frontend esté presente."
    exit 1
fi

# Mensaje final del script
echo "Proyectos configurados y en ejecución. Consulta la salida de los logs para verificar el estado de cada proyecto."

