<template>
  <div>
    <company-modal
        :show-modal="showModal"
        :edit-mode="editMode"
        :company-data="companySelected"
        @add="addCompany"
        @edit="editCompany"
        @toggle="toggleModal" >

    </company-modal>
    <div class="flex flex-wrap">
      <div
          class="relative w-full xl:w-6/12 mb-12 xl:mb-0 px-4 shadow-lg rounded"
          :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']"
      >
        <div class="rounded-t mb-0 px-4 py-3 border-0">
          <div class="flex flex-wrap items-center">
            <div class="relative w-5 px-4 max-w-full flex-grow flex-1">
              <h3
                  class="font-semibold text-lg"
                  :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']"
              >
                Companies
              </h3>
            </div>
            <div
                class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"
            >
              <h3
                  class="font-semibold text-lg"
                  :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']"
              >
                <button
                    class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    v-on:click="toggleModal"
                >
                  New Company
                </button>
              </h3>
            </div>
          </div>
        </div>
        <div class="block w-full overflow-x-auto">
          <!-- Projects table -->
          <table class="items-center w-full bg-transparent border-collapse">
            <thead>
            <tr>
              <th
                  class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                  :class="[
                    color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                  ]"
              >
                Name
              </th>
              <th
                  class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                  :class="[
                    color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                  ]"
              >
                Description
              </th>
              <th
                  class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                  :class="[
                    color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                  ]"
              >
                Symbol
              </th>
              <th
                  class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                  :class="[
                    color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                  ]"
              >
                Last Market Value
              </th>
              <th
                  class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                  :class="[
                    color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                  ]"
              ></th>
            </tr>
            </thead>
            <tbody>
            <tr
                @click="assignCompany(company)"
                v-bind:key="company.id" v-for="company in companies">
              <th
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
              >
                <img
                    :src="getImg(company.symbol)"
                    class="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                />
                <span
                    class="ml-3 font-bold"
                    :class="[
                      color === 'light' ? 'text-blueGray-600' : 'text-white',
                    ]"
                >
                    {{company.name}}
                  </span>
              </th>
              <td

                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                {{company.description}}
              </td>
              <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                {{company.symbol}}
              </td>
              <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                <i class="fas fa-circle text-orange-500 mr-2"></i>
                {{ currencyUSD(company.market_values[0]) }}
              </td>

              <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
              >
                <table-dropdown
                    :element="company"
                    :delete="deleteCompany"
                    :view="editCompanyToggle"
                />
              </td>
            </tr>
            </tbody>
            <tfoot>
            <th
                class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                :class="[
                    color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                  ]"
            >
              Total: {{total}}
            </th>
            <th
                colspan="3"
                class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                :class="[
                    color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                  ]"
            >
            </th>
            <th
                colspan="1"
                class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                :class="[
                    color === 'light'
                      ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                      : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                  ]"
            >
            </th>
            </tfoot>
          </table>
          <div class="py-2">
            <nav class="block">
              <ul class="flex pl-0 rounded list-none flex-wrap">
                <li >
                  <a v-if="previous" v-on:click="getData(previous)"  class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-emerald-500 bg-white text-emerald-500">
                    <i class="fas fa-chevron-left -ml-px"></i>
                  </a>
                </li>
                <li v-for="index in pages" :key="index">
                  <a v-on:click="getData(baseUrl+'?page='+index)" class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-emerald-500 bg-white text-emerald-500">
                    {{index}}
                  </a>
                </li>
                <li>
                  <a v-if="next" v-on:click="getData(next)"  class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-emerald-500 bg-white text-emerald-500">
                    <i class="fas fa-chevron-right -mr-px"></i>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div
          class="relative w-full xl:w-6/12 px-4 shadow-lg rounded bg-blueGray-700"
      >
        <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full max-w-full flex-grow flex-1">
              <h6 class="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                Overview
              </h6>
              <h2 v-if="companySelected" class="text-white text-xl font-semibold">
                Market Values: {{companySelected.name}}
              </h2>
            </div>
          </div>
        </div>
        <div class="p-4 flex-auto">
          <!-- Chart -->
          <div class="relative h-350-px">
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import TableDropdown from "@/components/Dropdowns/TableDropdown.vue";
import Chart from "chart.js";


import axios from "axios";
import CompanyModal from "@/components/modals/CompanyModal";

export default {
  data() {
    let companies = [];
    let pages = 1;
    let baseUrl = "http://0.0.0.0:8090/company/"
    let companySelected = null;
    let editMode = false;
    let showModal = false;
    let next = null;
    let previous = null;
    let year = new Date().getFullYear()
    let total = 0;
    return {
      pages,
      editMode,
      baseUrl,
      next,
      previous,
      year,
      showModal,
      companySelected,
      companies,
      total,
    };
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal;
      this.companySelected = {}
    },
    assignCompany(company) {
      this.companySelected = company
      this.buildLineChart();
    },
    async getData(url) {
      try {

        if(url === undefined) {
          url = this.baseUrl
        }
        const response = await axios.get(
            url
        );
        // JSON responses are automatically parsed.
        this.companies = response.data.results;
        this.companySelected = this.companies[0];
        this.total = response.data.count;
        this.next = response.data.next;
        this.previous = response.data.previous;
        this.pages = Math.ceil(this.total/10);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteCompany(company) {
      try {
        await axios.delete(
            `http://0.0.0.0:8090/company/${company.uuid}/`
        );
        await this.getData();
        // JSON responses are automatically parsed.
      } catch (error) {
        console.log(error);
      }
    },
    async editCompanyToggle(company) {
      this.companySelected = company;
      console.log(company)
      this.editMode = true;
      this.toggleModal();
    },
    async addCompany(companyData) {
      try {
        await axios.post(
            "http://0.0.0.0:8090/company/",
            companyData
        );
        this.getData();
        this.showModal = false;
        // JSON responses are automatically parsed.
      } catch (error) {
        console.log(error)
      }
    },
    async editCompany(companyData) {
      try {
        await axios.put(
            `http://0.0.0.0:8090/company/${companyData.uuid}/`,
            companyData
        );
        this.getData();
        this.showModal = false;
        // JSON responses are automatically parsed.
      } catch (error) {
        console.log(error)
      }
    },
    async getCompany(companyId) {
      try {
        const response = await axios.get(
            `http://0.0.0.0:8090/company/${companyId}/`
        );
        // JSON responses are automatically parsed.
        this.companies = response.data.results;
      } catch (error) {
        console.log(error);
      }
    },
    getImg(symbol) {
      return 'https://financialmodelingprep.com/image-stock/'+symbol+'.png'
    },
    currencyUSD(value) {
      return  Intl.NumberFormat().format(value) + " $"
    },
    buildLineChart() {
      let length = this.companySelected.market_values.length
      var config = {
        type: "line",
        data: {
          labels: Array.from({length: (length)}, (v, k) =>  this.year - length + k + 1),
          datasets: [
            {
              label: this.companySelected.symbol,
              backgroundColor: "#4c51bf",
              borderColor: "#4c51bf",
              data: this.companySelected.market_values.reverse(),
              fill: false,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            xAxes: [
              {
                ticks: {
                  fontColor: "rgba(255,255,255,.7)",
                },
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Year",
                  fontColor: "white",
                },
                gridLines: {
                  display: false,
                  borderDash: [2],
                  borderDashOffset: [2],
                  color: "rgba(33, 37, 41, 0.3)",
                  zeroLineColor: "rgba(0, 0, 0, 0)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  fontColor: "rgba(255,255,255,.7)",
                },
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Value",
                  fontColor: "white",
                },
                gridLines: {
                  borderDash: [3],
                  borderDashOffset: [3],
                  drawBorder: false,
                  color: "rgba(255, 255, 255, 0.15)",
                  zeroLineColor: "rgba(33, 37, 41, 0)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
          },
        },
      };


      var ctx = document.getElementById("line-chart").getContext("2d");
      window.myLine = new Chart(ctx, config);
    }
  },
  async mounted() {
    await this.getData();
    this.buildLineChart();
  },
  components: {
    CompanyModal,
    TableDropdown,
  },
  props: {
    color: {
      default: "light",
      validator: function (value) {
        // The value must match one of these strings
        return ["light", "dark"].indexOf(value) !== -1;
      },
    },
  },
};
</script>
