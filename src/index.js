import Graph from './graph'
import { getUnion } from './helper'

export default class SKUSelector {
  constructor(specGroups, combinations) {
    this.specGroups = specGroups
    this.combinations = combinations

    this.graph = new Graph()
    this.initGraph()
  }

  initGraph() {
    this.specGroups.forEach(({ specs }) => {
      specs.forEach((spec) => {
        this.graph.addVertex(spec.id)
      })
    })

    // 同级连线
    const combinationSpecsMap = getUnion(
      this.combinations.map(({ specs }) => specs),
      'id'
    ).reduce((map, spec) => {
      map[spec.id] = spec
      return map
    }, {})

    this.specGroups.forEach(({ specs }) => {
      specs.forEach((v, index) => {
        // 过滤不在组合中的点
        if (!combinationSpecsMap[v.id]) return
        specs.slice(index + 1, specs.length).forEach((w) => {
          // 过滤不在组合中的点
          if (!combinationSpecsMap[w.id]) return
          this.graph.addEdge(v.id, w.id, 1)
        })
      })
    })

    // 连线
    this.combinations.forEach(({ id, specs }) => {
      specs.forEach((v, i) => {
        specs.slice(i + 1, specs.length).forEach((w) => {
          this.graph.addEdge(v.id, w.id, id)
        })
      })
    })
  }

  getSpecsInfo(specs) {
    const useableSpecsIds = this.getCanUseSpecs(specs)
    const combinations = this.getSpecsCombinations(specs)
    return {
      useableSpecsIds,
      combinations,
    }
  }

  getCanUseSpecs(specsSelected) {
    const specIds = specsSelected.map((spec) => spec.id)
    if (specsSelected.length === 0) {
      return getUnion(
        this.combinations.map((combination) => combination.specs),
        'id'
      ).map((spec) => spec.id)
    } else {
      const canUse = this.graph.getAdjMatrixRowsSum(specIds)
      return this.graph.vertices
        .filter((_, i) => {
          return canUse[i]
        })
        .concat(specIds)
    }
  }

  getSpecsCombinations(selectedSpecs) {
    return selectedSpecs.length > 0
      ? this.combinations.filter((combination) =>
          selectedSpecs.every(
            (spec) =>
              combination.specs.findIndex((_spec) => spec.id === _spec.id) > -1
          )
        )
      : this.combinations
  }
}
