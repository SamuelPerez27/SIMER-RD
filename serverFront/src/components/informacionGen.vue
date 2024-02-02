<template>
  <div class="page-content">
    <div class="page-title">
      <br />
      <h2 class="title-content">Informacion general</h2>
    </div>

    <hr />
    <br />

    <!-- tabla en tiempo real y grafico -->
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <div class="card text-white">
            <div class="card-header bg-primary">
              <h5>Informaci&oacute;n en tiempo Real</h5>
            </div>

            <br />

            <div v-for="planta in plantasInformation" :key="planta.id">
              <div
                class="card-body text-dark bg-light border rounded mx-auto"
                style="width: 95%; height: 150px"
              >
                <h6 class="card-title">
                  Nombre de Planta: {{ planta.nombresPlantasRenovablesRandom }}
                </h6>
                <h6>
                  <b> Tipo de Energia: </b>
                  <span> {{ planta.tipoEnergiaPlanta }} </span>
                </h6>
                <h6>Produccion: {{ planta.produccionEnergiaPlanta }} kWh</h6>

                <h6 v-if="planta.estadoPlanta == 'Activa'">
                  Estado:
                  <span class="btn btn-success btn-sm" disabled> Activa </span>
                </h6>
                <h6 v-else-if="planta.estadoPlanta == 'Mantenimiento'">
                  Estado:
                  <span class="btn btn-warning btn-sm" disabled>
                    Mantenimiento
                  </span>
                </h6>
                <h6 v-else>
                  Estado:
                  <span class="btn btn-danger btn-sm" disabled>
                    Fuera de Servicio
                  </span>
                </h6>
              </div>

              <br />
            </div>
          </div>
        </div>

        <div class="col-md-8">
          <div class="card text-white">
            <div class="card-header bg-primary">Graficos</div>
            <div class="card-body text-dark">
              <BarChart
                ref="barChart"
                :labels="graficoLabels"
                :datasets="graficoData"
              />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>

    <br />
    <br />

    <!-- Historico de datos -->
    <div class="page-content container-fluid col-12">
      <div class="row">
        <div class="page-title col-8 text-left">
          <h2 class="title-content">
            Tabla de datos<small class="small-title">
              / Historico de registros</small
            >
          </h2>
        </div>
      </div>

      <div class="row mt-4">
        <div class="col-12">
          <table
            class="table table-striped table-bordered"
            id="tb_workItemOutPlanning"
          >
            <thead>
              <tr class="bg-light">
                <th scope="col">Nombre de Planta</th>
                <th scope="col">Tipo de Energia</th>
                <th scope="col">Producci&oacute;n</th>
                <th scope="col">Ubicaci&oacute;n</th>
                <th scope="col">Condiciones Meteorolog&iacute;cas</th>
                <th scope="col">Estado</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="list in plantasInformationHistory" :key="list.id">
                <td class="text-center">
                  {{ list.nombresPlantasRenovablesRandom }}
                </td>
                <td class="text-center">{{ list.tipoEnergiaPlanta }}</td>
                <td class="text-center">
                  {{ list.produccionEnergiaPlanta }} kWh
                </td>
                <td class="text-center">{{ list.ubicacionesPlanta }}</td>

                <td class="text-center">
                  Temperatura:
                  {{
                    list.condicionesMeteorologicasPlanta.temperatura
                  }}
                  °C<br />
                  Humedad: {{ list.condicionesMeteorologicasPlanta.humedad }}%
                  <br />
                  Velocidad del Viento:
                  {{
                    list.condicionesMeteorologicasPlanta.velocidadViento
                  }}
                  km/h
                </td>

                <td class="text-center">
                  <h6 v-if="list.estadoPlanta == 'Activa'">
                    <span class="btn btn-success btn-sm" disabled>
                      Activa
                    </span>
                  </h6>
                  <h6 v-else-if="list.estadoPlanta == 'Mantenimiento'">
                    <span class="btn btn-warning btn-sm" disabled>
                      Mantenimiento
                    </span>
                  </h6>
                  <h6 v-else>
                    <span class="btn btn-danger btn-sm" disabled>
                      Fuera de Servicio
                    </span>
                  </h6>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import DataTable from "datatables.net-dt";
import BarChart from "@/components/graficsType/BarChart.vue";
export default {
  data() {
    return {
      plantasInformation: [],
      plantasInformationHistory: [],
      socketUrl: "ws://localhost:8080",
      nombreEnergias: [],
      socketCoonection: null,
      graficoLabels: ["Santo Domingo", "Santiago", "Puerto Plata", "La Romana", "Barahona", "San Pedro de Macorís", "La Vega", "San Juan de la Maguana", "Higüey", "Monte Plata", "Dajabòn", "Duarte", "Peravia"],
      graficoData: [{ label: "Cantidad de plantas en la provincias", data: [5, 3, 8, 15, 9, 20, 5, 6, 7, 0, 2, 1,4] }],
    };
  },
  mounted() {
    this.socketCoonection = new WebSocket(this.socketUrl);
    this.socketCoonection.onmessage = (event) => {
      if (this.plantasInformation.length >= 3) {
        this.plantasInformation.splice(0, 1);
      }
      this.plantasInformation.push(JSON.parse(event.data));
      this.plantasInformationHistory.push(JSON.parse(event.data));
    };

    setTimeout(function () {
      new DataTable(`#tb_workItemOutPlanning`, {
        pageLength: 5,
        lengthMenu: [5, 10, 15, 20],
        order: [[0, "asc"]],
        dom: "Blfrtip",
        bDestroy: true,
        buttons: ["copy", "csv", "excel", "pdf", "print"],
      });
    }, 1000);
  },
  methods: {},
  components: {
    BarChart,
  },
};
</script>
