<template>
  <div class="page-content">
    <div v-if="showError" class="alert alert-danger" role="alert">
      Todos los campos son requeridos
    </div>
    <div class="page-title">
      <br />
      <h2 class="title-content">Panel de Control</h2>
    </div>

    <hr />
    <br />

    <!-- tabla en tiempo real y grafico -->
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <div class="card text-white">
            <div class="card-header bg-primary">
              Cantidad de Energias Renovables Disponibles
            </div>

            <div class="card-body text-dark text-center">
              <h5 class="card-title">{{ cantidadEnergiasRenovables }}</h5>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card text-white">
            <div class="card-header bg-primary">
              Promedio de Producci&oacute;n de energia
            </div>
            <div class="card-body text-dark text-center">
              <h5 class="card-title">{{ promedioDeEnegia }} kWh</h5>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card text-white">
            <div class="card-header bg-primary">Total de energia producida</div>
            <div class="card-body text-dark text-center">
              <h5 class="card-title">{{ totalEnergiaProducida }} kWh</h5>
            </div>
          </div>
        </div>
      </div>
    </div>

    <br />

    <br />

    <div class="container">
      <h4>
        <span style="border-bottom: 2px solid black"
          >Gesti&oacute;n de Energias</span
        >
      </h4>
      <br />
      <div class="row">
        <div class="col-md-4">
          <div class="card text-white">
            <div class="card-header bg-secondary">
              Agregar una Nueva Energia Renovable
            </div>

            <div class="card-body text-dark text-left">
              <form>
                <div class="row">
                  <div class="form-group col-md-12 mb-4">
                    <label for="NombreEnergia">Nombre de Energia</label>
                    <br />
                    <input
                      type="email"
                      class="form-control"
                      id="NombreEnergia"
                    />
                  </div>

                  <div class="form-group col-md-12 mb-4">
                    <label for="">Producci&oacute;n Minima de Energia</label>
                    <br />
                    <input
                      type="email"
                      class="form-control"
                      id="ProduccionMinima"
                    />
                  </div>

                  <br />

                  <div class="form-group col-md-12 mb-2">
                    <label for="NombreEnergia"
                      >Producci&oacute;n Maxima de Energia</label
                    >
                    <br />
                    <input
                      type="email"
                      class="form-control"
                      id="ProduccionMaxima"
                    />
                  </div>
                </div>

                <br />

                <button
                  type="button"
                  @click="agregarEnergia()"
                  class="btn btn-success col-md-12"
                >
                  Agregar
                </button>
              </form>
            </div>
          </div>

          <br />
          <div class="card text-white">
            <div class="card-header bg-secondary">
              Eliminar Energia Renovable
            </div>

            <div class="card-body text-dark text-left">
              <form>
                <div class="row">
                  <div class="form-group col-md-12 mb-4">
                    <label class="mr-sm-2" for="inlineFormCustomSelect"
                      >Selecciona la Energia</label
                    >

                    <select id="eliminarEnergia" class="form-control">
                      <option
                        v-for="(list, index) in produccionPorEnergia"
                        :key="index"
                      >
                        {{ list.produccionPorEnergia }}
                      </option>
                    </select>
                  </div>
                </div>

                <br />

                <button
                  type="button"
                  @click="eliminarEnergia()"
                  class="btn btn-danger col-md-12"
                >
                  Eliminar
                </button>
              </form>
            </div>
          </div>
        </div>

        <div class="col-md-8">
          <table class="table table-striped table-bordered" id="tb_energias">
            <thead>
              <tr class="bg-light">
                <th scope="col">Nombre de la Energia</th>
                <th scope="col">Producci&oacute;n Minima de Energia</th>
                <th scope="col">Producci&oacute;n Maxima de Energia</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(list, index) in produccionPorEnergia" :key="index">
                <td class="text-center">{{ list.produccionPorEnergia }}</td>
                <td class="text-center">{{ list.produccionMinima }}</td>
                <td class="text-center">{{ list.produccionMaxima }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <br />
    <br />

    <div class="container">
      <h4>
        <span style="border-bottom: 2px solid black"
          >Gesti&oacute;n de Ubicaciones</span
        >
      </h4>
      <br />
      <div class="row">
        <div class="col-md-4">
          <div class="card text-white">
            <div class="card-header bg-secondary">
              Agregar una Nueva ubicaci&oacute;n
            </div>

            <div class="card-body text-dark text-left">
              <form>
                <div class="row">
                  <div class="form-group col-md-12 mb-4">
                    <label for="NombreProvincia">Nombre de la Provincia</label>
                    <br />
                    <input
                      type="email"
                      class="form-control"
                      id="NombreProvincia"
                    />
                  </div>
                </div>

                <br />
                <br />

                <button
                  type="button"
                  @click="agregarProvincia()"
                  class="btn btn-success col-md-12"
                >
                  Agregar
                </button>
              </form>
            </div>
          </div>
        </div>

        <div class="col-md-8">
          <table class="table table-striped table-bordered" id="tb_ubicaciones">
            <thead>
              <tr class="bg-light">
                <th scope="col">Nombre de la Provincia</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(list, index) in ubicacionesTotales" :key="index">
                <td class="text-center">{{ list }}</td>
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
export default {
  data() {
    return {
      socketUrl: "ws://localhost:8080",
      showError: false,
      socketCoonection: null,
      promedioDeEnegia: 0,
      totalEnergiaProducida: 0,
      cantidadEnergiasRenovables: 0,
      recordsHistory: 0,
      produccionPorEnergia: [],
      ubicacionesTotales: [],
    };
  },

  created() {
    this.socketCoonection = new WebSocket(this.socketUrl);
    this.socketCoonection.onmessage = (event) => {
      this.cantidadEnergiasRenovables = JSON.parse(
        event.data
      ).cantidadTotalEnergiasRenovables;

      this.totalEnergiaProducida += JSON.parse(
        event.data
      ).produccionEnergiaPlanta;

      this.recordsHistory += JSON.parse(
        event.data
      ).nombresPlantasRenovablesRandom.length;

      const data = JSON.parse(event.data);

      let lengthProduccionPorTipoEnergia = data.produccionPorTipoEnergia.length;
      let lengthUbicaciones = JSON.parse(event.data).ubicacionesTotales.length;

      if (lengthProduccionPorTipoEnergia > this.produccionPorEnergia.length) {
        this.produccionPorEnergia = data.produccionPorTipoEnergia;

        setTimeout(function () {
          new DataTable(`#tb_energias`, {
            pageLength: 10,
            lengthMenu: [5, 10, 15, 20],
            order: [[0, "asc"]],
            dom: "Blfrtip",
            bDestroy: true,
            buttons: ["copy", "csv", "excel", "pdf", "print"],
          });
        }, 1000);
      }

      if (lengthUbicaciones > this.ubicacionesTotales.length) {
        this.ubicacionesTotales = JSON.parse(event.data).ubicacionesTotales;

        setTimeout(function () {
          new DataTable(`#tb_ubicaciones`, {
            pageLength: 5,
            lengthMenu: [5, 10, 15, 20],
            order: [[0, "asc"]],
            dom: "Blfrtip",
            bDestroy: true,
            buttons: ["copy", "csv", "excel", "pdf", "print"],
          });
        }, 1000);
      }

      this.promedioDeEnegia = (
        this.totalEnergiaProducida / this.recordsHistory
      ).toFixed(2);
    };
  },
  methods: {
    agregarEnergia() {
      let nombreEnergia = document.getElementById("NombreEnergia").value;
      let produccionMinima = document.getElementById("ProduccionMinima").value;
      let produccionMaxima = document.getElementById("ProduccionMaxima").value;

      if (
        nombreEnergia == "" ||
        produccionMinima == "" ||
        produccionMaxima == ""
      ) {
        this.showError = true;

        setTimeout(() => {
          this.showError = false;
        }, 5000);
      } else {
        this.socketCoonection.send(
          JSON.stringify({
            tipo: "argegarEnergia",
            nombreEnergia: nombreEnergia,
            produccionMinima: produccionMinima,
            produccionMaxima: produccionMaxima,
          })
        );

        window.location.reload();
      }
    },
    eliminarEnergia() {
      let eliminarEnergia = document.getElementById("eliminarEnergia").value;

      this.socketCoonection.send(
        JSON.stringify({
          tipo: "eliminarEnergia",
          nombreEnergia: eliminarEnergia,
        })
      );

      window.location.reload();
    },
    agregarProvincia() {
      let nombreProvincia = document.getElementById("NombreProvincia").value;

      if (nombreProvincia == "") {
        this.showError = true;

        setTimeout(() => {
          this.showError = false;
        }, 5000);
      } else {
        this.socketCoonection.send(
          JSON.stringify({
            tipo: "agregarProvincia",
            nombreProvincia: nombreProvincia,
          })
        );

        window.location.reload();
      }
    },
  },
};
</script>
