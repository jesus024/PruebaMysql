#!/bin/bash

echo "🔧 Configurando conexión a MySQL..."
echo "====================================="

echo "Por favor, ingresa la contraseña de tu usuario root de MySQL:"
echo "(La misma que usas cuando ejecutas 'mysql -u root -p')"
echo ""

# Leer la contraseña de forma segura
read -s -p "Contraseña: " MYSQL_PASSWORD
echo ""

# Probar la conexión
if mysql -u root -p"$MYSQL_PASSWORD" -e "SELECT 1;" > /dev/null 2>&1; then
    echo "✅ Contraseña correcta!"
    
    # Actualizar el archivo .env
    cd backend
    echo "DB_HOST=localhost" > .env
    echo "DB_USER=root" >> .env
    echo "DB_PASSWORD=$MYSQL_PASSWORD" >> .env
    echo "DB_NAME=biblioteca_comunitaria" >> .env
    echo "DB_PORT=3306" >> .env
    echo "PORT=3000" >> .env
    
    echo "✅ Archivo .env configurado correctamente"
    echo ""
    echo "🚀 Ahora puedes iniciar el servidor:"
    echo "   npm start"
    echo ""
    echo "🌐 O abrir el frontend:"
    echo "   cd ../frontend && python3 -m http.server 8000"
    echo "   Luego abre: http://localhost:8000"
    
else
    echo "❌ Contraseña incorrecta. Intenta de nuevo."
    echo "💡 Si no recuerdas tu contraseña, puedes:"
    echo "   1. Usar 'sudo mysql' para acceder como administrador"
    echo "   2. O resetear la contraseña de MySQL"
fi 