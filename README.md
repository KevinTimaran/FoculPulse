# FocusPulse ⌚️

FocusPulse is an interactive smartwatch simulator tailored for a Xiaomi Smart Band 7 form factor. It uses the `dickwu/apple-design-skill` guidelines to deliver a premium OLED interface (Apple HIG) combined with a "Wizard of Oz" external control panel for real-time demonstrations.

Built with **Next.js**, **React Context**, **Tailwind CSS**, and **Lucide Icons**.

## 🚀 Instalación Rápida (1 Clic)

Se han incluido scripts para configurar y levantar el proyecto automáticamente en cualquier computadora nueva sin configuraciones manuales:

1. Clona este repositorio en tu computadora local:
   ```bash
   git clone git@github.com:KevinTimaran/FoculPulse.git
   ```

2. Entra en la carpeta del proyecto. Dependiendo de tu sistema operativo, ejecuta el script correspondiente:

### Para Windows
Simplemente dale **doble clic** al archivo `setup.bat` desde el explorador de archivos. 
El script verificará que tengas Node.js instalado, instalará todas las dependencias y levantará el servidor en un solo paso.

### Para macOS y Linux
Abre una terminal en la carpeta del proyecto y ejecuta el script:
```bash
./setup.sh
```

> **Nota:** Si el sistema te indica permisos insuficientes, otorga primero permisos de ejecución ejecutando: `chmod +x setup.sh`

---

## 🎮 ¿Cómo utilizar el simulador?

Una vez levantado el servidor (disponible en `http://localhost:3000`), la pantalla principal se dividirá en dos componentes interactivos:

1. **El Reloj Inteligente (Izquierda):**
   - Una interfaz que reacciona a los eventos externos. Puedes interactuar directamente presionando el botón "Play", y alternar entre los distintos modos de la aplicación (Idle, Active, History, Summary).
   - Incluye un interruptor de "Tema Claro/Oscuro" (Sun/Moon icon) en la vista principal.

2. **Panel de Control "Wizard of Oz" (Derecha):**
   - **Heart Rate:** Desliza la barra para alterar en tiempo real el ritmo cardíaco de las pulsaciones que aparecen dentro del reloj.
   - **Concentration:** Presiona High, Medium o Low para cambiar visualmente el anillo de energía (color) del reloj de forma fluida.
   - **Triggers:** Usa el botón de **Force Distraction Event** para interrumpir de manera abrupta la sesión y disparar la alerta de desconcentración en la pantalla del reloj de inmediato.

---
*Este proyecto fue generado y automatizado con Antigravity IDE.*
