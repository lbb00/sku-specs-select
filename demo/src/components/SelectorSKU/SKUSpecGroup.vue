<template>
  <div class="ec-spec-group">
    <div class="ec-spec-group__title">{{ group.name }}</div>
    <div class="ec-spec-group__items">
      <div
        v-for="spec in group.specs"
        :class="[
          'ec-spec-group__item',
          { 'ec-spec-group__item--selected': selectedSpecs.findIndex((i) => i.id === spec.id) > -1 },
          { 'ec-spec-group__item--disabled': !useableSpecsIds.includes(spec.id) },
        ]"
        :key="spec.id"
        @click="clickSpec(spec)"
      >
        {{ spec.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const emits = defineEmits(['change'])

const props = defineProps({
  useableSpecsIds: {
    type: Array,
    required: true,
  },
  group: {
    type: Object,
    required: true,
  },
  selectedSpecs: {
    type: Array,
  },
})

function clickSpec(spec) {
  const { useableSpecsIds, group } = props
  if (!useableSpecsIds.includes(spec.id)) return
  emits('change', spec, group)
}
</script>

<style lang="scss">
.ec-spec-group {
  margin: 32px 0 0;
  &__title {
    color: rgba(32, 36, 38, 1);
    font-weight: 600;
    font-size: 28px;
    line-height: 40px;
  }
  &__items {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -12px;
  }
  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 152px;
    height: 64px;
    margin: 24px 12px 0;

    color: rgba(32, 36, 38, 0.6);
    font-size: 24px;
    line-height: 40px;

    background: #fff;

    border: 2px solid rgba(32, 36, 38, 0.2);
    border-radius: 40px;

    &--selected {
      color: #fff;

      background: rgba(255, 64, 122, 1);
      border: none;
    }
    &--disabled {
      color: #fff;

      background: rgba(32, 36, 38, 0.1);
      border: none;
    }
  }
}
</style>
