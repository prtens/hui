<template>
  <div class="hn-area-selection">
    <div class="area-search-box">
      <el-input
        :placeholder="placeholder"
        prefix-icon="el-icon-search"
        v-model="searchName"
        @keyup.13.native="search"
      >
      </el-input>
    </div>

    <div
      class="mb10"
      v-for="(type, typeIndex) of types"
      :key="typeIndex"
    >
      <div class="all">
        <label class="cursor-pointer">
          <el-checkbox
            v-model="type.checked"
            @change="changeAll(typeIndex)"
          ></el-checkbox>
          <span class="ml5">全选 - {{ type.name }}</span>
        </label>
      </div>

      <div class="clearfix">
        <div
          :class="type.half ? 'area-half' : ''"
          v-for="(group,groupIndex) of type.groups"
          :key="groupIndex"
        >
          <div
            v-for="(area,areaIndex) of group"
            :key="areaIndex"
          >
            <div class="area">
              <div
                class="area-name"
                v-if="area.name"
              >{{ area.name }}
              </div>
              <div class="provinces clearfix">
                <div
                  class="province"
                  v-for="(province,provinceIndex) of area.provinces"
                  :key="provinceIndex"
                  :style="{'min-width': (!type.half ? (100/lineNumber)*(province.lineNumberMulti || 1) : '' )}"
                >
                  <label class="province-label cursor-pointer clearfix">
                    <el-checkbox
                      v-model="province.checked"
                      @change="changeOne({checked:province.checked,typeIndex:typeIndex,province:province.id})"
                    ></el-checkbox>
                    <span :class="`name${province.highlight ? highlight : ''}`">{{ province.name }}
                      <span
                        class="province-count"
                        v-if="province.hasCity && (province.count > 0)"
                      >
                        ({{ province.count }})</span>
                    </span>
                    <template v-if="province.hasCity">
                      <i
                        :class="`el-icon-arrow-down province-arrow ${province.hasCity && (province.id == showProvinceId) ? 'province-expand' : ''}`"
                        @click="toggleCity({province:province.id})"
                      ></i>
                    </template>
                  </label>
                  <div
                    :style="`display: ${(province.hasCity && (province.id == showProvinceId)) ? 'block' : 'none'}`"
                    class="cities mx-shadow clearfix"
                  >
                    <label
                      class="city cursor-pointer"
                      v-for="(city, cityIndex) of province.cities"
                      :key="cityIndex"
                    >
                      <el-checkbox
                        v-model="city.checked"
                        @change="changeOne({checked:city.checked,typeIndex:typeIndex,province:province.id,city:city.id})"
                      ></el-checkbox>
                      <span :class="`name ${city.highlight? 'highlight' : ''}`">{{ city.name }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import {deepClone} from '../../utils/util'
import * as Atds from './data'

export default {
  name: "AreaSelection",
  props: {
    selected: {
      type: Array,
      default() {
        return [];
      }
    },
    // 是否可选城市
    city: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    // 单行显示个数
    lineNumber: {
      type: Number,
      default: 6
    }
  },
  data() {
    return {
      types: [],
      cityVisible: false,
      placeholder: '',
      showProvinceId: -1,
      searchName: ''
    };
  },

  mounted() {
    this.init()
  },
  methods: {
    init() {
      let that = this
      let selected = (that.selected || []).map(id => {
        return +id;
      });
      let cityVisible = (/^true$/i).test(that.city);

      let data = (that.data.length === 0) ? [] : deepClone(that.data),
        types = [];

      if (data.length === 0) {
        let commonAreas = deepClone(Atds.default.commonAreas),
          commonAllChecked = true,
          lastProvinces = deepClone(Atds.default.lastProvinces),
          lastAllChecked = true;

        commonAreas.forEach(area => {
          area.provinces.forEach(province => {
            that.initProvince(province, selected, cityVisible);
            commonAllChecked = commonAllChecked && province.checked;
          })
        })

        lastProvinces.forEach(province => {
          that.initProvince(province, selected, cityVisible);
          lastAllChecked = lastAllChecked && province.checked;
        })

        types = [
          {
            name: '常用地域',
            id: 'more',
            half: true,
            checked: commonAllChecked,
            groups: [commonAreas.splice(0, 7), commonAreas]
          },
          {
            name: '非常用地域',
            id: 'less',
            checked: lastAllChecked,
            groups: [
              [{
                provinces: lastProvinces
              }]
            ]
          }]
      } else {
        // 自定义数据
        types = data.map((item, index) => {
          let allChecked = true;
          let provinces = item.provinces;
          provinces.forEach((province, pi) => {
            if (pi === provinces.length - 1) {
              // 可能出现数据超长的情况，最后一个数据特殊处理下
              let remainder = provinces.length % that.lineNumber;
              province.lineNumberMulti = (remainder > 0) ? (that.lineNumber - remainder + 1) : 1;
            }
            that.initProvince(province, selected, cityVisible);
            allChecked = allChecked && province.checked;
          })

          return {
            name: item.name,
            id: index,
            checked: allChecked,
            groups: [
              [{
                provinces: item.provinces
              }]
            ]
          }
        })
      }

      that.types = types
      that.cityVisible = cityVisible
      that.placeholder = '省份' + (cityVisible ? '/城市' : '')
    },

    toggleCity(event) {
      let that = this;
      let {province: provinceId} = event,
        oldProvince = that.showProvinceId;

      if (provinceId === oldProvince) {
        that.showProvinceId = -1
      } else {
        that.showProvinceId = provinceId
      }

      console.log(that.showProvinceId)
    },

    changeAll(typeIndex) {
      let that = this;
      let {types} = that;
      let type = types[typeIndex];
      let checked = type.checked;
      type.groups.forEach(group => {
        group.forEach(area => {
          area.provinces.forEach(province => {
            let cities = province.cities;
            province.checked = checked;
            cities.forEach(city => {
              city.checked = checked;
            })

            province.count = checked ? cities.length : 0;
          })
        })
      })

      that.fire();
    },

    changeOne(event) {
      let that = this;

      let {checked, typeIndex, province: provinceId, city: cityId} = event;
      let types = that.types;
      let type = types[typeIndex]

      let allChecked = true;
      type.groups.forEach(group => {
        group.forEach(area => {
          area.provinces.forEach(province => {
            if (province.id === provinceId) {
              let cities = province.cities;

              if (cityId) {
                // 选择城市
                let count = 0;
                cities.forEach(city => {
                  if (city.id === cityId) {
                    city.checked = checked;
                  }
                  if (city.checked) {
                    count++;
                  }
                })
                province.checked = (count > 0) && (count === cities.length);
                province.count = count;
              } else {
                // 选择省
                province.checked = checked;
                province.count = checked ? cities.length : 0;
                cities.forEach(city => {
                  city.checked = checked;
                })
              }
            }
            allChecked = allChecked && province.checked;
          })
        })
      })
      types[typeIndex].checked = allChecked;
      that.fire();
    },

    fire() {
      let that = this;
      let selected = that.getSelected();
      let values = selected.map(item => item.id);
      let aa = {
        selected,
        values
      }
      this.$emit("on-change", selected, values);
    },

    initProvince(province, selected, cityVisible) {
      // province 省的id被选中了，则其全部城市id不传
      // for example 1 = (2 + 3 + ... + 18)
      province.checked = (selected.indexOf(+province.id) > -1);

      let count = 0;
      province.cities = province.cities || [];
      province.cities.forEach(city => {
        if (province.checked) {
          city.checked = true;
        } else {
          city.checked = (selected.indexOf(+city.id) > -1);
        }
        if (city.checked) {
          count++;
        }
      })

      province.count = count;

      province.hasCity = (province.cities.length > 0) && cityVisible;
    },

    search() {
      let that = this;
      let searchName = that.searchName;
      let {types, cityVisible} = that;

      let provinceId, isCity = false;
      types.forEach(type => {
        let typeHighlight = false;
        type.groups.forEach(group => {
          group.forEach(area => {
            area.provinces.forEach(province => {
              province.highlight = false;
              if (province.name === searchName) {
                provinceId = province.id;
                province.highlight = true;
              }
              if (cityVisible) {
                let cities = province.cities;
                cities.forEach(city => {
                  city.highlight = false;
                  if (city.name === searchName) {
                    provinceId = province.id;
                    isCity = true;
                    city.highlight = true;
                  }
                })
              }
            })
          })
        })
      })

      that.showProvinceId = isCity ? provinceId : -1
    },

    val(full) {
      let that = this;
      let {types, cityVisible} = that;
      let selected = [];
      let all = [];
      types.forEach(type => {
        type.groups.forEach(group => {
          group.forEach(area => {
            area.provinces.forEach(province => {
              if (province.checked) {
                selected.push(province.id);
                all.push(province);
              } else {
                if (cityVisible) {
                  province.cities.forEach(city => {
                    if (city.checked) {
                      selected.push(city.id);
                      all.push(city);
                    }
                  })
                }
              }
            })
          })
        })
      })
      if (full) {
        return deepClone(all);
      } else {
        return selected;
      }
    },

    getSelected() {
      return this.val(true);
    }
  }
};
</script>

<style lang="scss" scoped></style>
