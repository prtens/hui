export function formatWeek(index) {
  return "星期" + ["一", "二", "三", "四", "五", "六", "日"][index % 7];
}

export function discountArray2Report(columnNum, rowNum, multiple, e) {
  let o = columnNum;
  let r = rowNum;
  let n = (multiple, []);
  for (let i = 0; i < o; i++) {
    n[i] = 0;
    let a = [];
    for (let d = 0; d < r; d++) {
      let c = e[i * r + d];
      if (c) {
        let l = a[a.length - 1];
        l && l.discount === c && l.end === d
          ? (l.end = d + 1)
          : a.push({ start: d, end: d + 1, discount: c });
      }
    }
    let f = a.map(function(e) {
      return getDuration(rowNum, multiple, e.start, e.end) + ":" + e.discount;
    });
    f && f.length > 0 && (n[i] = f.join(","));
  }
  return n.join(";");
}

export function report2Array(rowNum, multiple, e) {
  let t = [];
  let o = rowNum;
  let r = multiple;
  let n = e.split(";");
  for (let i = 0, a = n.length; i < a; i++) {
    for (let d = n[i].split(","), c = 0, l = d.length; c < l; c++) {
      if (d[c] !== "0") {
        let f = d[c].match(/(\d{2}):(\d{2})-(\d{2}):(\d{2}):(\d+)/);
        let u = parseInt(f[1]) * r + o * i;
        f[2] === "30" && u++;
        let p = parseInt(f[3]) * r + o * i;
        f[4] === "30" && p++;
        for (let h = parseInt(f[5]), g = u; g <= p - 1; g++) t[g] = h;
      }
    }
  }
  return t;
}

export function getDuration(rowNum, multiple, e, t, s) {
  let o = rowNum;
  let r = getTimeFromNum(rowNum, multiple, e);
  let n = "";
  let i =
    r + "-" + (n = t % o === 0 ? "24:00" : getTimeFromNum(rowNum, multiple, t));
  return s && (i = s.replace("%s", r).replace("%s", n)), i;
}

export function getTimeFromNum(rowNum, multiple, e) {
  let s = rowNum;
  let o = multiple;
  let r = Math.floor((e % s) / o);
  return (
    (r + "").length === 1 && (r = "0" + r),
    r + ":" + ((e % s) % o === 1 ? "30" : "00")
  );
}
