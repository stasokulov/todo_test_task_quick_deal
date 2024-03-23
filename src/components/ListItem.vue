<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { onClickOutside, type MaybeElement } from '@vueuse/core'
import { type TTask, useTodoStore } from '@/stores/todos'

import PencilIcon from '@/components/icons/IconPencil.vue'
import SaveIcon from '@/components/icons/IconSave.vue'
import CloseIcon from '@/components/icons/IconClose.vue'
import CancelIcon from '@/components/icons/IconCancel.vue'

const { deleteTask, updateTask, toggleIsDone, setIsEditMode } = useTodoStore()

const props = defineProps<{
  task: TTask
}>()

const listItemEl = ref<MaybeElement>(null)
const isEditMode = ref<boolean>(false)
const tempTaskText = ref<string>(props.task.text)

const taskText = defineModel({
  get() {
    return isEditMode.value ? tempTaskText.value : tempTaskText.value || props.task.text
  },
  set(value: string) {
    tempTaskText.value = value
  }
})

const enableEditMode = (): void => {
  isEditMode.value = true
}
const disableEditMode = (): void => {
  isEditMode.value = false
}
const saveChangeTask = (): void => {
  if (!isEditMode.value) return
  if (tempTaskText.value) {
    if (tempTaskText.value !== props.task.text) {
      updateTask(props.task.id, tempTaskText.value)
    }
    disableEditMode()
  } else {
    deleteTask(props.task.id)
  }
}
const abortChangeTask = (): void => {
  if (!isEditMode.value) return
  if (props.task.text) {
    tempTaskText.value = props.task.text
    isEditMode.value = false
  } else {
    deleteTask(props.task.id)
  }
}
const tryToggleIsDone = (): void => {
  if (isEditMode.value) return
  toggleIsDone(props.task.id)
}
const checkNeedToEdit = (): void => {
  if (!props.task.text) enableEditMode()
}

onClickOutside(listItemEl, (): void => {
  tempTaskText.value ? saveChangeTask() : abortChangeTask()
})

onMounted(() => {
  checkNeedToEdit()
})

watch(isEditMode, (newValue) => {
  setIsEditMode(props.task.id, newValue)
})
</script>

<template>
  <li
    ref="listItemEl"
    class="listItem mb-2"
    :class="{ 'listItem--is-edit-mode': isEditMode, 'listItem--is-done': task.isDone }"
    my="20"
  >
    <div class="listItem__input-wrap" @click="tryToggleIsDone">
      <v-text-field
        variant="solo"
        :hideDetails="true"
        density="compact"
        v-model="taskText"
        :disabled="!isEditMode"
        class="listItem__input mr-2"
        :class="{ 'listItem__input--done': task.isDone }"
      ></v-text-field>
    </div>

    <div>
      <v-btn
        v-if="!isEditMode && !task.isDone"
        variant="tonal"
        elevation="2"
        class="listItem__button"
        @click="enableEditMode"
      >
        <PencilIcon />
      </v-btn>
      <v-btn
        v-if="isEditMode && tempTaskText"
        variant="tonal"
        elevation="2"
        class="listItem__button"
        @click="saveChangeTask"
      >
        <SaveIcon />
      </v-btn>
      <v-btn
        v-if="isEditMode"
        variant="tonal"
        elevation="2"
        class="listItem__button"
        @click="abortChangeTask"
      >
        <CancelIcon />
      </v-btn>
      <v-btn
        v-if="!isEditMode"
        variant="tonal"
        elevation="2"
        class="listItem__button"
        @click="deleteTask(task.id)"
      >
        <CloseIcon />
      </v-btn>
    </div>
  </li>
</template>

<style scoped lang="scss">
.listItem {
  display: flex;
}

.listItem--is-edit-mode {
  // Делаем накрывающий псевдоэлемент, накрывающий инпут, прозрачным для клика, чтобы редактировать текст в инпуте.
  .listItem__input-wrap::before {
    pointer-events: none;
  }
}

.listItem--is-done {
  .listItem__input-wrap {
    opacity: 0.5;
  }
}

.listItem__input-wrap {
  position: relative;
  flex-grow: 1;

  // Накрываем инпут псевдоэлементом, чтобы он был ловцом кликов, когда инпут disabled.
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}

.listItem__input--done {
  text-decoration: line-through;
}

.listItem__button {
  &.v-btn {
    height: 100%;
  }
}
</style>
