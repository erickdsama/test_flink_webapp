<template>
  <div>
    <div v-if="modalState" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-6 mx-auto max-w-3xl">
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 class="text-3xl font-semibold">
              New Company
            </h3>
            <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" @click="$emit('toggle')">
              <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
            <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
            >
              <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form>
                  <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    Company Data
                  </h6>
                  <div class="flex flex-wrap">
                    <div class="w-full lg:w-6/12 px-4">
                      <div class="relative w-full mb-3">
                        <label
                            class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        >
                          Name
                        </label>
                        <input
                            v-model="localCompanyData.name"
                            type="text"
                            class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </div>
                    </div>
                    <div class="w-full lg:w-6/12 px-4">
                      <div class="relative w-full mb-3">
                        <label
                            class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        >
                          Symbol
                        </label>
                        <input
                            type="text"
                            v-model="localCompanyData.symbol"
                            class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                      </div>
                    </div>
                  </div>
                  <hr class="mt-6 border-b-1 border-blueGray-300" />
                  <div class="flex flex-wrap">
                    <div class="w-full lg:w-12/12 px-4">
                      <div class="relative w-full mb-3">
                        <label
                            class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        >
                          Description
                        </label>
                        <textarea
                            v-model="localCompanyData.description"
                            type="text"
                            class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            rows="4"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="$emit('toggle')">
              Close
            </button>
            <button v-if="!editMode" class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="$emit('add', localCompanyData)">
              Save Changes
            </button>
            <button v-if="editMode" class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" @click="$emit('edit', localCompanyData)">
              Edit Company
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="modalState" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

<script>
export default {
  name: "company-modal",
  props: {
    showModal: {type: Boolean, default: false},
    editMode: {type: Boolean, default: false},
    companyData: {type: Object, default: null}
  },
  watch:{
    showModal(state){
      this.modalState = state;
      if(!this.editMode) {
        this.localCompanyData = {}
      }
    },
    companyData(state){
        this.localCompanyData = state;
    }
  },
  data() {
    return {
      localCompanyData: this.companyData,
      modalState: this.showModal,
    }
  },
}
</script>