export const converse = e => {
  var i = {};
  e &&
    JSON.parse(e).forEach(function(e) {
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

export const reverse = e => {
  var i = !1,
    n = [];
  return (
    e.forEach(function(e) {
      var t = e.times;
      // p>1 ? p<b ? p>b :p=6 : p=3
      t.length > 0 && (i = !0),
        e.week == 1
          ? n.push({
              dayOfWeek: "0111110",
              timeSpans: t
            })
          : e.week == 6 &&
            n.push({
              dayOfWeek: "1000001",
              timeSpans: t
            });
    }),
    i ? JSON.stringify(n) : ""
  );
};
