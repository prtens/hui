
import { t } from '../../locale';

let Today = new Date();
let Formatter = "YYYY-MM-DD";
let ForeverStr = t('h.calendar.forever');
let DayMillisecond = 24 * 60 * 60 * 1000;
let PadZero = str => {
  return ("0" + str).slice(-2);
};

let DateReg = {
  y: {
    reg: /y+/gi,
    fn(m, d) {
      return String(d.getFullYear()).slice(-m.length);
    }
  },
  M: {
    reg: /M+/g,
    fn(m, d, t) {
      t = d.getMonth() + 1;
      return PadZero(t).slice(-m.length);
    }
  },
  d: {
    reg: /d+/gi,
    fn(m, d, t) {
      t = d.getDate();
      return PadZero(t).slice(-m.length);
    }
  },
  h: {
    reg: /h+/gi,
    fn(m, d, t) {
      t = d.getHours();
      return PadZero(t).slice(-m.length);
    }
  },
  m: {
    reg: /m+/g,
    fn(m, d, t) {
      t = d.getMinutes();
      return PadZero(t).slice(-m.length);
    }
  },
  s: {
    reg: /s+/g,
    fn(m, d, t) {
      t = d.getSeconds();
      return PadZero(t).slice(-m.length);
    }
  },
  S: {
    reg: /S+/g,
    fn(m, d, t) {
      t = d.getMilliseconds();
      return String(t).substring(0, m.length);
    }
  }
};

let DateParse = date => {
  let result;
  if (date instanceof Date) {
    return date;
  } else {
    // date = new Date(Date.parse(String(date).replace(/-/g, '/')));
    // Date.parse('2019/12') safari 下不支持
    // Date.parse('2019-12') safari 下支持
    result = new Date(Date.parse(String(date).replace(/\//g, "-")));
    if (date && (result === "Invalid Date" || isNaN(result))) {
      // safari兼容处理
      let vs = String(date).split(/[^0-9]/);
      result = new Date(
        vs[0] || "",
        vs[1] ? +vs[1] - 1 + "" : "",
        vs[2] || "",
        vs[3] || "",
        vs[4] || "",
        vs[5] || ""
      );
    }
  }
  if (result instanceof Date && result !== "Invalid Date" && !isNaN(result)) {
    return result;
  }
  return null;
};

let DateFormat = (date, formatter) => {
  date = DateParse(date);
  formatter = formatter || Formatter;
  let key;
  let replacement = match => {
    return DateReg[key].fn(match, date);
  };
  for (key in DateReg) {
    formatter = formatter.replace(DateReg[key].reg, replacement);
  }
  return formatter;
};

let GetOffsetDate = (offset, date) => {
  if (!date) {
    date = new Date();
  }
  offset = offset || 0;
  let uom = new Date(date.getTime() + offset * DayMillisecond);
  uom = uom.getFullYear() + "/" + (uom.getMonth() + 1) + "/" + uom.getDate();
  return new Date(uom);
};

export default {
  foreverStr: ForeverStr,
  getOffsetDate: GetOffsetDate,
  dateParse: DateParse,
  dateFormat: DateFormat,
  padZero: PadZero,
  getDefaultDate: (min, max, formatter) => {
    min = DateParse(min);
    max = DateParse(max);
    let today = Today;
    let init;
    if (min && min.getTime() > today.getTime()) {
      init = min;
    } else if (max && max.getTime() < today.getTime()) {
      init = max;
    } else {
      init = today;
    }
    return DateFormat(init, formatter);
  },
  /**
   * 包含dynamic的动态快捷日期，跟开始时间有关
   */
  getQuickInfos: (quickDates, startStr, formatter) => {
    let quickInfos = [];
    quickDates = quickDates || [];
    quickDates.forEach(quickKey => {

      let text, start, end, tip;
      if (quickKey === "today") {
        text = t("h.calendar.today");
        tip = t("h.calendar.today");
        start = GetOffsetDate(0);
        end = GetOffsetDate(0);
      } else if (quickKey === "yesterday") {
        text = t("h.calendar.yesterday");
        tip = t("h.calendar.yesterday");
        start = GetOffsetDate(-1);
        end = GetOffsetDate(-1);
      } else if (quickKey === "beforeYesterday") {
        text = t("h.calendar.beforeYesterday");
        tip = t("h.calendar.beforeYesterday");
        start = GetOffsetDate(-2);
        end = GetOffsetDate(-2);
      } else if (quickKey === "preMonth") {
        text = t("h.calendar.lastMonth");
        tip = t("h.calendar.lastMonth");
        start = new Date(Today.getFullYear(), Today.getMonth() - 1, 1);
        let startYear = start.getFullYear(),
          startMonth = start.getMonth(),
          lastDay = 32 - new Date(startYear, startMonth, 32).getDate();
        end = new Date(startYear, startMonth, lastDay);
      } else if (quickKey === "preWeekSun") {
        text = t("h.calendar.lastWeek");
        tip = t("h.calendar.lastWeekSunday");
        let temp = GetOffsetDate(-7);
        let offset = 0 - temp.getDay();
        start = GetOffsetDate(offset, temp);
        end = GetOffsetDate(offset + 6, temp);
      } else if (quickKey === "preWeekMon") {
        text = t("h.calendar.lastWeek");
        tip = t("h.calendar.lastWeekMonday");
        let temp = GetOffsetDate(-7);
        let offset = 1 - temp.getDay();
        start = GetOffsetDate(offset, temp);
        end = GetOffsetDate(offset + 6, temp);
      } else if (quickKey === "lastestWeekSun") {
        text = t("h.calendar.thisWeek");
        tip = t("h.calendar.thisWeekSunday");
        let offset = 0 - Today.getDay();
        start = GetOffsetDate(offset);
        end = GetOffsetDate(0);
      } else if (quickKey === "lastestWeekMon") {
        text = t("h.calendar.thisWeek");
        tip = t("h.calendar.thisWeekMonday");
        let offset = 1 - Today.getDay();
        start = GetOffsetDate(offset);
        end = GetOffsetDate(0);
      } else if (quickKey === "passedThisMonth") {
        text = t("h.calendar.thisMonth");
        tip = t("h.calendar.thisMonthYestarday");
        start = GetOffsetDate(-Today.getDate() + 1);
        end = GetOffsetDate(-1);
      } else if (quickKey === "lastestThisMonth") {
        text = t("h.calendar.thisMonth");
        tip = t("h.calendar.thisMonthToday");
        start = GetOffsetDate(-Today.getDate() + 1);
        end = GetOffsetDate(0);
      } else if (/^passed\d+$/i.test(quickKey)) {
        let n = +quickKey.replace("passed", "");
        text =
          t("h.calendar.passed") + " " + n + " " + t("h.calendar.unit");
        tip =
          t("h.calendar.passed") +
          " " +
          n +
          " " +
          t("h.calendar.unitYesterday");
        start = GetOffsetDate(0 - n);
        end = GetOffsetDate(-1);
      } else if (/^lastest\d+$/i.test(quickKey)) {
        let n = +quickKey.replace("lastest", "");
        text =
          t("h.calendar.lastest") + " " + n + " " + t("h.calendar.unit");
        tip =
          t("h.calendar.lastest") +
          " " +
          n +
          " " +
          t("h.calendar.unitToday");
        start = GetOffsetDate(1 - n);
        end = GetOffsetDate(0);
      } else if (/^dynamicStart\d+$/i.test(quickKey)) {
        let n = +quickKey.replace("dynamicStart", "");
        text = t("h.calendar.dynamicEnd").replace("{day}", n);
        tip = t("h.calendar.dynamicEndTip").replace("{day}", n);
        start = DateParse(startStr);
        end = GetOffsetDate(n - 1, start);
      } else if (quickKey === "dynamicEndThisMonth") {
        text = t("h.calendar.naturalMonth");
        tip = t("h.calendar.naturalMonthTip");
        start = DateParse(startStr);
        let startYear = start.getFullYear(),
          startMonth = start.getMonth(),
          lastDay = 32 - new Date(startYear, startMonth, 32).getDate();
        end = new Date(startYear, startMonth, lastDay);
      } else if (quickKey === "dynamicEndNextMonth") {
        text = t("h.calendar.nextMonth");
        tip = t("h.calendar.nextMonthTip");
        start = DateParse(startStr);
        let startYear = start.getFullYear(),
          nextMonth = start.getMonth() + 1,
          lastDay = 32 - new Date(startYear, nextMonth, 32).getDate();
        end = new Date(startYear, nextMonth, lastDay);
      } else if (quickKey === "forever") {
        text = ForeverStr;
        tip = t("h.calendar.foreverTip");
        start = DateParse(startStr);
        end = ForeverStr;
      }
      if (text && tip && start) {
        quickInfos.push({
          key: quickKey,
          text,
          tip,
          start: DateFormat(start, formatter),
          end: end === ForeverStr ? ForeverStr : DateFormat(end, formatter)
        });
      } else if (typeof quickKey === "object") {
        // 用户自定义的快捷日期
        quickInfos.push(quickKey);
      }
    });
    return quickInfos;
  },
  parseDateType: type => {
    if (!type) {
      type = "all";
    }
    let enables = {
      year: true,
      month: true,
      day: true
    };
    if (type !== "all") {
      for (let p in enables) {
        if (type.indexOf(p) === -1) {
          delete enables[p];
        }
      }
    }
    return enables;
  }
};
