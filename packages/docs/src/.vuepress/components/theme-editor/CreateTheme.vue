<script>
import Button from './Button.vue'
import Input from './Input.vue'
import Modal from './Modal.vue'
import { createNewTheme } from './state'

export default {
  components: { Modal, Button, Input },

  data () {
    return {
      name: '',
    }
  },

  methods: {
    createNewTheme () {
      if (!this.name) return
      createNewTheme({
        name: this.name,
      })
      this.close()
    },

    close () {
      this.$emit('close')
    },
  },
}
</script>

<template>
  <Modal>
    <div class="text-lg border-b border-gray-100">
      Create theme
    </div>

    <div class="space-y-2 w-96">
      <Input
        v-model="name"
        placeholder="Theme name"
        auto-focus
        @keyup.enter="createNewTheme()"
      />
    </div>

    <template #actions>
      <Button
        color="gray"
        class="flex-1 p-2"
        @click="close()"
      >
        Cancel
      </Button>

      <Button
        class="flex-1 p-2"
        @click="createNewTheme()"
      >
        Create theme
      </Button>
    </template>
  </Modal>
</template>
