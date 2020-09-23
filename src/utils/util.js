export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * 递归添加层级
 * @param {*} array
 * @param {*} level
 */
export function addLevel(array, level = 0) {
  array.forEach(arr => {
    arr.level = level;
    if (arr.children) {
      addLevel(arr.children, level + 1);
    }
  });
  return array;
}

/**
 * 去除抖动器
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function (...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}

export function getSlot(vm, name = 'default', data, optional) {
  if (vm.$scopedSlots[name]) {
    // return vm.$scopedSlots[name]!(data instanceof Function ? data() : data)
    return vm.$scopedSlots[name];
  } else if (vm.$slots[name] && (!data || optional)) {
    return vm.$slots[name];
  }
  return undefined;
}

export function convertToUnit(str, unit = 'px') {
  if (str == null || str === '') {
    return undefined;
  } else if (isNaN(+str)) {
    return String(str);
  } else {
    return `${Number(str)}${unit}`;
  }
}

export function deepClone(obj) {
  let _obj = JSON.stringify(obj);
  let objClone = JSON.parse(_obj);
  return objClone;
}
