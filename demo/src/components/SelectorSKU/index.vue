<template>
  <div class="sku-select">
    <SpecGroup
      v-for="group in specGroups"
      :key="group.id"
      :group="group"
      :selectedSpecs="selectedSpecs"
      :useableSpecsIds="useableSpecsIds"
      @change="changeSelectedSpecs"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SKUSelector from 'sku-specs-select'
import SpecGroup from './SKUSpecGroup.vue'

const specGroups = [
  {
    id: 1,
    name: '款式',
    specs: [
      { id: 11, name: '树莓红茶' },
      { id: 12, name: '樱花金' },
      { id: 13, name: '柠檬海盐' },
      { id: 14, name: '白夜霓虹' },
    ],
  },
  {
    id: 2,
    name: '长度',
    specs: [
      { id: 21, name: '39cm' },
      { id: 22, name: '43cm' },
      { id: 23, name: '45cm' },
      { id: 24, name: '48cm' },
    ],
  },
  {
    id: 3,
    name: '尺码',
    specs: [
      { id: 31, name: 'S' },
      { id: 32, name: 'M' },
      { id: 33, name: 'L' },
    ],
  },
]

const products = [
  {
    id: '1',
    specs: [
      { id: 12, name: '樱花金' },
      { id: 21, name: '39cm' },
      { id: 31, name: 'S' },
    ],
  },
  {
    id: '2',
    specs: [
      { id: 12, name: '樱花金' },
      { id: 21, name: '39cm' },
      { id: 32, name: 'M' },
    ],
  },
  {
    id: '3',
    specs: [
      { id: 12, name: '樱花金' },
      { id: 22, name: '43cm' },
      { id: 32, name: 'M' },
    ],
  },
  {
    id: '4',
    specs: [
      { id: 11, name: '树莓红茶' },
      { id: 22, name: '43cm' },
      { id: 33, name: 'L' },
    ],
  },
]

const selectedSpecs = ref([])

const skuSelector = new SKUSelector(specGroups, products)

const useableSpecsIds = computed(
  () => {
    return skuSelector.getSpecsInfo(selectedSpecs.value).useableSpecsIds
  },
  {
    immediate: true,
  }
)

function changeSelectedSpecs(spec, group) {
  const index = selectedSpecs.value.findIndex((i) => group.specs.findIndex((b) => b.id === i.id) > -1)

  if (index > -1) {
    if (spec.id === selectedSpecs.value[index].id) {
      selectedSpecs.value.splice(index, 1)
    } else {
      selectedSpecs.value[index] = spec
    }
  } else {
    selectedSpecs.value.push(spec)
  }
}
</script>

<style lang="scss">
.sku-select {
  background: #fff;
}
</style>
