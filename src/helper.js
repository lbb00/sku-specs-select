export function getUnion(aggregatesArr, by) {
  if (by) {
    return aggregatesArr.reduce((union, arr) => {
      return arr.reduce((u, obj) => {
        if (u.findIndex((n) => n[by] === obj[by]) === -1) u.push(obj)
        return u
      }, union)
    }, [])
  } else {
    return [
      ...new Set(
        aggregatesArr.reduce((union, arr) => {
          return union.concat(arr)
        }, [])
      ),
    ]
  }
}

export function getIntersection(aggregatesArr) {
  return aggregatesArr.reduce((intersection, arr, index) => {
    if (index === 0) {
      return arr
    } else if (arr.length === 0) {
      return []
    } else {
      return intersection.filter((n) => arr.includes(n))
    }
  }, [])
}
