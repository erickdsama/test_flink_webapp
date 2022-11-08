<template>
  <div>
    <a
      class="text-blueGray-500 py-1 px-3"
      ref="btnDropdownRef"
      v-on:click="toggleDropdown($event)"
    >
      <i class="fas fa-ellipsis-v"></i>
    </a>
    <div
      ref="popoverDropdownRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
      v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }"
    >
      <a
        href="javascript:void(0);"
        v-on:click="viewElement"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Edit Company
      </a>
      <a
        href="javascript:void(0);"
        v-on:click="deleteElement"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Delete Company
      </a>
    </div>
  </div>
</template>
<script>
import { createPopper } from "@popperjs/core";

export default {
  props: {
    element: Object,
    delete: { type: Function },
    view: { type: Function },
  },
  data() {
    return {
      dropdownPopoverShow: false,
    };
  },
  methods: {
    deleteElement() {
      this.delete(this.element)
      this.dropdownPopoverShow = false;
    },
    viewElement() {
      this.view(this.element)
      this.dropdownPopoverShow = false;
    },
    toggleDropdown: function (event) {
      event.preventDefault();
      if (this.dropdownPopoverShow) {
        this.dropdownPopoverShow = false;
      } else {
        this.dropdownPopoverShow = true;
        createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: "bottom-start",
        });
      }
    },
  },
};
</script>
