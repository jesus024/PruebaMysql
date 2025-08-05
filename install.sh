#!/bin/bash

echo "🚀 Instalando Biblioteca Comunitaria 'Lecturas Libres'"
echo "=================================================="

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instale Node.js primero."
    exit 1
fi

# Verificar si MySQL está instalado
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL no está instalado. Por favor instale MySQL primero."
    exit 1
fi

echo "✅ Node.js y MySQL están instalados"

# Instalar dependencias del backend
echo "📦 Instalando dependencias del backend..."
cd backend
npm install
cd ..

echo "✅ Dependencias instaladas"

# Crear archivo .env
echo "⚙️ Configurando variables de entorno..."
if [ ! -f backend/.env ]; then
    cp backend/env.example backend/.env
    echo "✅ Archivo .env creado. Por favor configure las credenciales de la base de datos."
else
    echo "✅ Archivo .env ya existe"
fi

echo ""
echo "🎯 Próximos pasos:"
echo "1. Configure las credenciales de MySQL en backend/.env"
echo "2. Ejecute el script de base de datos: mysql -u root -p < database/schema.sql"
echo "3. Inicie el servidor: cd backend && npm start"
echo "4. Abra el frontend en: frontend/index.html"
echo ""
echo "📚 ¡Sistema de Biblioteca Comunitaria listo!" 