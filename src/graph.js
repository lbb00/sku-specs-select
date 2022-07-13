import { getIntersection } from './helper'

export default class Graph {
  constructor() {
    this.vertices = []
    this.verticesIndexMap = new Map()
    this.adjMatrix = []
  }

  addVertex(v) {
    this.vertices.push(v)
    const index = this.vertices.length - 1

    this.verticesIndexMap.set(v, index)

    // 旧矩阵扩容列
    this.adjMatrix.forEach((_, i) => {
      this.adjMatrix[i].push(undefined)
    })

    // 添加新的行
    this.adjMatrix.push(Array(index + 1).fill())
  }

  addEdge(v, w, key) {
    this.__addAdjMatrix(v, w, key)
    this.__addAdjMatrix(w, v, key)
  }

  getAdjMatrixRowsSum(vertices) {
    const rows = vertices.map((v) => this.__getAdjMatrixRows(v))
    return Array(this.vertices.length)
      .fill()
      .map((_, colIndex) => {
        // 获取列，并过滤掉[1]
        const cols = rows
          .map((row) => row[colIndex])
          .filter((p) => !p || p.length > 1 || p[0] !== 1)
        if (cols.length === 0) return 1

        // 过滤空值
        if (cols.findIndex((p) => !p) > -1) {
          return 0
        }
        return getIntersection(cols).length > 0 ? 1 : 0
      })
  }

  __getAdjMatrixRows(v) {
    const index = this.verticesIndexMap.get(v)
    return this.adjMatrix[index]
  }

  __addAdjMatrix(p1, p2, key) {
    const indexP1 = this.verticesIndexMap.get(p1)
    const indexP2 = this.verticesIndexMap.get(p2)
    if (!this.adjMatrix[indexP1][indexP2]) {
      this.adjMatrix[indexP1][indexP2] = []
    }
    this.adjMatrix[indexP1][indexP2].push(key)
  }
}
