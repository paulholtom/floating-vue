<template>
  <div class="example space-y-12 md:space-y-6">
    <VDropdown
      :triggers="[]"
      :shown="true"
      :auto-hide="false"
      placement="right"
      :offset="tempOffset"
      :modifiers="[
        { name: 'preventOverflow', enabled: false }
      ]"
    >
      <button class="px-4 py-12 md:p-16 bg-gray-500 text-white rounded-lg !md:text-sm">
        Reference
      </button>

      <template #popper>
        <div>Offset: {{ tempOffset }}</div>
        <div
          v-if="info"
          class="text-sm text-gray-500 !md:max-w-32"
        >
          {{ info }}
        </div>
      </template>
    </VDropdown>

    <div class="flex !md:flex-col items-center !md:space-y-6 md:space-x-6">
      <input
        v-model.number="tempOffset[0]"
        type="range"
        min="-32"
        max="32"
        class="w-full"
      >

      <input
        v-model.number="tempOffset[1]"
        type="range"
        min="-64"
        max="64"
        class="w-full"
      >

      <button
        class="flex-none border border-gray-300 rounded px-8 !md:py-3 md:px-2"
        @click="tempOffset = [...offset]"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['offset', 'info'],

  data () {
    return {
      tempOffset: [...this.offset],
    }
  },
}
</script>
