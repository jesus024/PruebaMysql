#!/bin/bash

echo "🚀 Iniciando Sistema de Biblioteca Comunitaria"
echo "=============================================="

# Verificar si estamos en el directorio correcto
if [ ! -f "backend/package.json" ]; then
    echo "❌ Error: Ejecuta este script desde el directorio raíz del proyecto"
    exit 1
fi

# Función para configurar MySQL con sudo
configurar_mysql_sudo() {
    echo "🔧 Configurando MySQL con acceso de administrador..."
    
    # Crear usuario sin contraseña
    sudo mysql -e "CREATE USER IF NOT EXISTS 'biblioteca'@'localhost' IDENTIFIED BY ''; GRANT ALL PRIVILEGES ON biblioteca_comunitaria.* TO 'biblioteca'@'localhost'; FLUSH PRIVILEGES;" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo "✅ Usuario MySQL creado correctamente"
        
        # Configurar .env para usar el nuevo usuario
        cd backend
        echo "DB_HOST=localhost" > .env
        echo "DB_USER=biblioteca" >> .env
        echo "DB_PASSWORD=" >> .env
        echo "DB_NAME=biblioteca_comunitaria" >> .env
        echo "DB_PORT=3306" >> .env
        echo "PORT=3000" >> .env
        cd ..
        
        return 0
    else
        echo "❌ Error al crear usuario MySQL"
        return 1
    fi
}

# Función para configurar MySQL con contraseña
configurar_mysql_password() {
    echo "🔧 Configurando MySQL con contraseña..."
    echo "Por favor, ingresa la contraseña de tu usuario root de MySQL:"
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
        cd ..
        
        return 0
    else
        echo "❌ Contraseña incorrecta"
        return 1
    fi
}

# Verificar si MySQL está instalado
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL no está instalado. Por favor instala MySQL primero."
    exit 1
fi

# Verificar si la base de datos existe
if mysql -u root -e "USE biblioteca_comunitaria;" 2>/dev/null; then
    echo "✅ Base de datos ya existe"
else
    echo "📦 Creando base de datos..."
    mysql -u root < database/schema_clean.sql 2>/dev/null
    if [ $? -eq 0 ]; then
        echo "✅ Base de datos creada correctamente"
    else
        echo "❌ Error al crear la base de datos"
        exit 1
    fi
fi

# Intentar configurar MySQL
echo ""
echo "🔧 Configurando conexión a MySQL..."
echo "1. Usar sudo (recomendado)"
echo "2. Usar contraseña"
echo "3. Salir"
read -p "Selecciona una opción (1-3): " opcion

case $opcion in
    1)
        configurar_mysql_sudo
        ;;
    2)
        configurar_mysql_password
        ;;
    3)
        echo "👋 ¡Hasta luego!"
        exit 0
        ;;
    *)
        echo "❌ Opción inválida"
        exit 1
        ;;
esac

if [ $? -eq 0 ]; then
    echo ""
    echo "🚀 Iniciando servidor..."
    cd backend
    npm start &
    SERVER_PID=$!
    cd ..
    
    echo "✅ Servidor iniciado en http://localhost:3000"
    echo ""
    echo "🌐 Para abrir el frontend:"
    echo "   cd frontend && python3 -m http.server 8000"
    echo "   Luego abre: http://localhost:8000"
    echo ""
    echo "🧪 Para probar la API:"
    echo "   curl http://localhost:3000"
    echo ""
    echo "⏹️  Para detener el servidor:"
    echo "   kill $SERVER_PID"
    
    # Esperar a que el usuario presione Ctrl+C
    wait $SERVER_PID
else
    echo "❌ Error en la configuración"
    exit 1
fi 