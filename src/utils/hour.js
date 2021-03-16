/**
 * str 转数组
 * @param {*} e [{"dayOfWeek":"0111110","timeSpans":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,22,23]},{"dayOfWeek":"1000001","timeSpans":[0,1,2,3,4,5,14,15,16,17,18,19,20,21,22,23]}]
 * @returns
 */
export const converse = e => {
  let i = {};
  e &&
    JSON.parse(e).forEach(function (e) {
      i[e.dayOfWeek] = e.timeSpans || [];
    });
  return [
    {
      week: "12345",
      times: i["0111110"]
    },
    {
      week: "67",
      times: i["1000001"]
    }
  ];
};

/**
 * 选中的 hour 数组转 str
 * @param {*} e
 * @returns
 */
export const reverse = e => {
  let i = !1,
    n = [];
  return (
    e.forEach(function (e) {
      let t = e.times;
      // p>1 ? p<b ? p>b :p=6 : p=3
      t.length > 0 && (i = !0),
        +e.week === 1 ? n.push({
          dayOfWeek: "0111110",
          timeSpans: t
        }) : +e.week === 6 && n.push({
          dayOfWeek: "1000001",
          timeSpans: t
        });
    }),
    i ? JSON.stringify(n) : ""
  );
};
