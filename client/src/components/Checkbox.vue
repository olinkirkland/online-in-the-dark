<template>
  <div
    class="checkbox-group"
    :class="{ compact: !label?.length, checked }"
    @click="handleChange"
  >
    <div class="icon">
      <i class="fas" :class="icon" v-if="checked || !emptyWhenUnchecked"></i>
      <span v-if="!icon">{{ text }}</span>
    </div>
    <p>{{ label }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Boolean, Array],
    required: true
  },
  label: {
    type: String,
    required: false
  },
  value: {
    type: String,
    required: false
  },
  text: {
    type: String,
    required: false,
    default: '❖'
  },
  icon: {
    type: String,
    required: false
  },
  emptyWhenUnchecked: {
    type: Boolean,
    required: false,
    default: false
  }
});

const emit = defineEmits();

const checked = computed(() => {
  if (!(props.value && Array.isArray(props.modelValue)))
    return props.modelValue;
  return props.modelValue.includes(props.value);
});

function handleChange(event: Event) {
  event.preventDefault();
  if (!(props.value && Array.isArray(props.modelValue)))
    return emit('update:modelValue', !props.modelValue);

  if (props.modelValue.includes(props.value))
    props.modelValue.splice(props.modelValue.indexOf(props.value), 1);
  else props.modelValue.push(props.value);

  emit('update:modelValue', props.modelValue);
}
</script>

<style lang="scss" scoped>
.checkbox-group {
  display: flex;
  gap: 0.8rem;
  align-items: center;
  width: fit-content;
  height: 3.2rem;
  background-color: var(--dark);
  border-radius: 3px;
  padding: 0 0.8rem;
  cursor: pointer;
  color: var(--light);

  &.compact {
    background-color: transparent;
    padding: 0.4rem;
    height: fit-content;
    p {
      display: none;
    }
  }

  &:active {
    > .icon {
      scale: 0.8;
    }
  }

  .icon {
    transition: all 0.2s ease;
    background-color: var(--light);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 100%;

    > span {
      font-size: 1.2rem;
      color: var(--dark);
      line-height: 1;
    }

    > i {
      color: var(--dark);
      font-size: 1rem;
      flex: 0 0 auto;
    }
  }

  > p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    margin-right: 0.2rem;
    font-size: 1.2rem;
    font-style: italic;
  }

  &.checked {
    p {
      color: var(--primary);
    }
    .icon {
      background-color: var(--primary);
    }
  }
}
</style>
