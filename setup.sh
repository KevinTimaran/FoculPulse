#!/bin/bash

echo "=========================================="
echo "🚀 Iniciando configuración de FoculPulse"
echo "=========================================="

# 1. Verificar si Node.js y npm están instalados
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js no está instalado."
    echo "👉 Por favor, instálalo desde: https://nodejs.org/"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm no está instalado."
    exit 1
fi

echo "✅ Node.js detectado: $(node -v)"
echo "✅ npm detectado: $(npm -v)"
echo ""

# 2. Instalar todas las dependencias
echo "📦 Instalando todas las dependencias del proyecto..."
echo "⏳ Esto puede tardar unos minutos dependiendo de tu conexión."
npm install

echo ""
echo "✅ Dependencias instaladas correctamente."
echo ""

# 3. Iniciar el proyecto automáticamente
echo "✨ ¡Todo listo! Levantando el simulador de FoculPulse..."
echo "👉 Abre http://localhost:3000 en tu navegador si no se abre automáticamente."
echo "=========================================="

npm run dev
