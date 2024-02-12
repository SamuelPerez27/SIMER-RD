const WebSocket = require("ws");   // Importar el módulo de WebSocket
const semaphore = require('semaphore')(1); //Modulo para implementar patron de semaforo



// Crear un servidor de WebSocket en el puerto 8080
const wss = new WebSocket.Server({ port: 8080 });

//
const clientsAdminConnect = [];

// Datos que se enviarán al cliente
const ubicaciones = [
  "Santo Domingo",
  "Santiago",
  "Puerto Plata",
  "La Romana",
  "Barahona",
  "San Pedro de Macorís",
  "La Vega",
  "San Juan de la Maguana",
  "Higüey",
  "Monte Plata",
  "Dajabòn",
  "Duarte",
  "Peravia",
];
const tiposEnergia = [
  "Solar",
  "Eolica",
  "Hidroelectrica",
  "Termica",
  "Nuclear",
  "Biomasa",
  "Geotermica",
  "Oceánica",
];
const produccionEnergia = {
  Solar: [100, 500], // Producción mínima y máxima para energía solar (en kilovatios-hora)
  Eolica: [200, 800], // Producción mínima y máxima para energía eólica (en kilovatios-hora)
  Hidroelectrica: [500, 1500], // Producción mínima y máxima para energía hidroeléctrica (en kilovatios-hora)
  Termica: [50, 200], // Producción mínima y máxima para energía de biomasa (en kilovatios-hora)
  Nuclear: [1000, 2000], // Producción mínima y máxima para energía nuclear (en kilovatios-hora)
  Biomasa: [2, 10], // Producción mínima y máxima para energía de biomasa (en kilovatios-hora)
  Geotermica: [100, 500], // Producción mínima y máxima para energía geotermica (en kilovatios-hora)
  Oceánica: [15, 50], // Producción mínima y máxima para energía oceanica (en kilovatios-hora)
};
const nombresPlantasRenovables = [
  "Sol de la Selva",
  "Vientos de los Andes",
  "Fuerza del Río",
  "Calor del Volcán",
  "Fuego de la Biomasa",
  "Llama de la Tierra",
  "Vida del Mar",
  "Renovación del Bosque",
  "Luz del Futuro",
];
const condicionesMeteorologicas = [
  {
    temperatura: 25,
    humedad: 60,
    velocidadViento: 10,
  },
  {
    temperatura: 15,
    humedad: 80,
    velocidadViento: 20,
  },
  {
    temperatura: 30,
    humedad: 40,
    velocidadViento: 5,
  },
  {
    temperatura: 10,
    humedad: 90,
    velocidadViento: 30,
  },
  {
    temperatura: 20,
    humedad: 70,
    velocidadViento: 40,
  },
];

const probabilidadPlantaEstadoActivo = 0.8; // Probilidad de que la planta esté activa
const probabilidadPlantaEstadoMantenimiento = 0.95; // Valor de probabilidad de que la planta esté en mantenimiento

//Metodos
function obtenerEstadoPlanta() {
  // Generar un número aleatorio entre 0 y 1
  const probabilidad = Math.random();

  if (probabilidad < probabilidadPlantaEstadoActivo) {
    return "Activa";
  } else if (probabilidad < probabilidadPlantaEstadoMantenimiento) {
    return "Mantenimiento";
  } else {
    return "Fuera de servicio";
  }
}

function obtenerCantidadEnergiasRenovables() {
  return tiposEnergia.length;
}



function verificarDisponibilidadSemaforo() {
  if (semaphore.available()) {
    console.log('El semáforo está disponible');
    return true;
  } else {
    console.log('El semáforo no está disponible');
    return false; 
  }
}

function adquirirSemaforo() {
  semaphore.take(() => {
    console.log('El semáforo ha sido adquirido');
  });
}

function liberarSemaforo() {
  semaphore.leave(1);
  console.log('El semáforo ha sido liberado');
}



// Eventos del WebSocket
wss.on("connection", function connection(ws) {
  console.log("Cliente conectado");

  const interval = setInterval(() => {
    const tipoEnergiaPlanta =
      tiposEnergia[Math.floor(Math.random() * tiposEnergia.length)];
    const [produccionMinima, produccionMaxima] =
      produccionEnergia[tipoEnergiaPlanta];
    const produccionEnergiaPlanta =
      Math.floor(Math.random() * (produccionMaxima - produccionMinima + 1)) +
      produccionMinima;
    const ubicacionesPlanta =
      ubicaciones[Math.floor(Math.random() * ubicaciones.length)];

    const nombresPlantasRenovablesRandom =
      nombresPlantasRenovables[
        Math.floor(Math.random() * nombresPlantasRenovables.length)
      ];
    const condicionesMeteorologicasPlanta =
      condicionesMeteorologicas[
        Math.floor(Math.random() * condicionesMeteorologicas.length)
      ];

    const cantidadTotalEnergiasRenovables = obtenerCantidadEnergiasRenovables();
    const estadoPlanta = obtenerEstadoPlanta();

    const produccionPorTipoEnergia = tiposEnergia.map((tipo) => ({
      produccionPorEnergia: tipo,
      produccionMinima: produccionEnergia[tipo][0],
      produccionMaxima: produccionEnergia[tipo][1],
    }));

    const data = JSON.stringify({
      nombresPlantasRenovablesRandom,
      tipoEnergiaPlanta,
      produccionEnergiaPlanta,
      ubicacionesPlanta,
      condicionesMeteorologicasPlanta,
      estadoPlanta,
      cantidadTotalEnergiasRenovables,
      produccionPorTipoEnergia,
      ubicacionesTotales: ubicaciones,
    });
   // console.log('Enviando: ' + data);
    ws.send(data);
  }, 5000);

  ws.on("close", function close() {
    console.log("Cliente desconectado");
    clearInterval(interval);
  });

  ws.on("message", function incoming(message) {
    const { tipo } = JSON.parse(message);

    if (tipo == "argegarEnergia") {
      const { tip, nombreEnergia, produccionMinima, produccionMaxima, idPeticion  } =
        JSON.parse(message);

        console.log('ID idPeticion Recibida: ' , idPeticion);


        if (verificarDisponibilidadSemaforo()) {
      
          //se llama la funcion para adquirir el semaforo
          adquirirSemaforo();

          console.log('Se adquirio el semaforo');

          ws.send(JSON.stringify({
            estadoSolicitud: `Solicitud ${idPeticion} En Proceso`
          }));

          setTimeout(function() {
            
            tiposEnergia.push(`${nombreEnergia}`);
            produccionEnergia[`${nombreEnergia}`] = [
              produccionMinima,
              produccionMaxima,
            ];
            
            console.log('Se agrego la energia', nombreEnergia, 'con produccion minima', produccionMinima, 'y produccion maxima', produccionMaxima);
  
            liberarSemaforo(); //Se llama la funcion para liberar el semaforo
          
            ws.send(JSON.stringify({ estadoSolicitud: `Solicitud ${idPeticion} finalizada` }));
  
            console.log('----- Solicitud Finalizada -----');

          }, 20000);

        }
        else {
          console.log('Se envio solicitud en espera');
          ws.send(JSON.stringify({ estadoSolicitud: `Solicitud ${idPeticion} En Espera` }));
        }
                  
    } else if (tipo == "eliminarEnergia") {
      const { tip, nombreEnergia, idPeticion } = JSON.parse(message);

      console.log('ID idPeticion Recibida: ' , idPeticion);


      if (verificarDisponibilidadSemaforo()) {
      
        //se llama la funcion para adquirir el semaforo
        adquirirSemaforo();

        console.log('Se adquirio el semaforo');

        ws.send(JSON.stringify({
          estadoSolicitud: `Solicitud ${idPeticion} En Proceso`
        }));

        setTimeout(function() {
          
          const index = tiposEnergia.indexOf(nombreEnergia);
          if (index > -1) {
            tiposEnergia.splice(index, 1);
          }
          delete produccionEnergia[`${nombreEnergia}`];
          
          console.log('Se elimino la energia', nombreEnergia);

          liberarSemaforo(); //Se llama la funcion para liberar el semaforo
        
          ws.send(JSON.stringify({ estadoSolicitud: `Solicitud ${idPeticion} finalizada` }));

          console.log('----- Solicitud Finalizada -----');

        }, 20000);

      }
      else {
        console.log('Se envio solicitud en espera');
        ws.send(JSON.stringify({ estadoSolicitud: `Solicitud ${idPeticion} En Espera` }));
      }

    
    } else if (tipo == "agregarProvincia") {
      const { tipo, nombreProvincia, idPeticion } = JSON.parse(message);
     
      console.log('ID idPeticion Recibida: ' , idPeticion);


      if (verificarDisponibilidadSemaforo()) {
      
        //se llama la funcion para adquirir el semaforo
        adquirirSemaforo();

        console.log('Se adquirio el semaforo');

        ws.send(JSON.stringify({
          estadoSolicitud: `Solicitud ${idPeticion} En Proceso`
        }));

        setTimeout(function() {
          
          ubicaciones.push(`${nombreProvincia}`);
          
          console.log('Se agrego la provincia ', nombreProvincia);

          liberarSemaforo(); //Se llama la funcion para liberar el semaforo
        
          ws.send(JSON.stringify({ estadoSolicitud: `Solicitud ${idPeticion} finalizada` }));

          console.log('----- Solicitud Finalizada -----');

        }, 20000);

      }
      else {
        console.log('Se envio solicitud en espera');
        ws.send(JSON.stringify({ estadoSolicitud: `Solicitud ${idPeticion} En Espera` }));
      }
      
    }
  });
});
