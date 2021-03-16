/**
 * str 转换为时段数组
 * @param {*} e 00:00-12:00:60,12:00-24:00:250;00:00-24:00:240;00:00-24:00:100;00:00-24:00:220;00:00-24:00:100;00:00-24:00:100;00:00-24:00:100
 * @returns
 */
export function transformPeriod(e) {
  let i = []
  e.split(';').forEach((e, t) => {
    let n = []
    if (e === '0') {
      n = [{ time: '00:00-24:00', discount: 0 }]
    } else {
      for (let r = e.split(','), s = 0; s < r.length; s++) {
        let c = r[s]
        let o = r[s + 1]
        if ((n.push({ time: c.slice(0, 11), discount: c.slice(12) }), o)) {
          let u = c.slice(6, 11)
          let a = o.slice(0, 5)
          u !== a && n.push({ time: [u, a].join('-'), discount: 0 })
        }
      }
      let f = n[0].time.slice(0, 5)
      f !== '00:00' && n.unshift({ time: ['00:00', f].join('-'), discount: 0 })
      let m = n[n.length - 1].time.slice(6, 11)
      m !== '24:00' && n.push({ time: [m, '24:00'].join('-'), discount: 0 })
    }
    i.push({ timeSpanList: n })
  })
  return i
}
