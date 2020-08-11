<template>
  <div
    class="hn-area-selection"
    :style="{width: `${maxWidth}px`}"
  >
    <el-row class="hn-area-selection__search">
      <el-col :span="6">
        <el-input
          v-model.trim="searchName"
          @input="handleSearchChange"
          @keyup.13.native="handleKeyUp"
          minlength="2"
          maxlength="10"
          prefix-icon="el-icon-search"
          placeholder="省份/城市"
        ></el-input>
      </el-col>
    </el-row>

    <!--常用地域-->
    <el-row class="hn-area-selection__content">
      <el-row class="check-all">
        <el-checkbox
          :indeterminate="commonArea.isIndeterminate"
          v-model="commonArea.checkedAllBoolean"
          @change="handleCheckedAllChange($event, 'commonArea')"
        >全选 - 常用地域</el-checkbox>
      </el-row>

      <el-row :gutter="20">
        <el-col
          :span="12"
          v-for="(mxArea, key) of mxAreas"
          :key="key"
        >
          <el-checkbox-group v-model="commonArea.checkedCities">
            <template v-for="(area, aKey) of mxArea">
              <el-row :key="aKey">
                <el-col
                  class="by"
                  :span="2"
                >
                  <span>{{ area.name }}</span>
                </el-col>
                <el-col :span="22">
                  <el-checkbox
                    class="bm"
                    v-for="(provinces, pKey) in area.provinces"
                    :label="provinces.id"
                    :key="pKey"
                    @change="handleCheckedProvinceChange(`${key+','+aKey+','+pKey}`, 'commonArea')"
                  >
                    <span
                      class="feedsb-ae"
                      :class="provinces.classShow ? 'feedsb-af' : ''"
                    >{{ provinces.name }}</span>
                    <template v-if="provinces.hasOwnProperty('cities')">
                      <span
                        class="ah"
                        v-if="provinces.hasOwnProperty('checkedSum') && provinces.checkedSum > 0"
                      >({{ provinces.checkedSum }})</span>
                      <el-popover
                        v-model="provinces.show"
                        placement="right"
                        width="300"
                        trigger="click"
                      >
                        <el-checkbox
                          style="line-height: 2.4"
                          v-for="(city, cKey) in provinces.cities"
                          :label="city.id"
                          :key="cKey"
                          @change="handleCheckedCityChange(`${key+','+aKey+','+pKey+','+cKey}`, city.id, 'commonArea')"
                        >
                          <span
                            class="feedsb-ae"
                            :class="city.classShow ? 'feedsb-af' : ''"
                          >{{ city.name }}</span>
                        </el-checkbox>
                        <el-button
                          class="ae"
                          slot="reference"
                          type="text"
                        >
                          <i class="el-icon-arrow-down"></i>
                        </el-button>
                      </el-popover>
                    </template>
                  </el-checkbox>
                </el-col>
              </el-row>
            </template>
          </el-checkbox-group>
        </el-col>
      </el-row>
    </el-row>

    <!--非常用地域-->
    <el-row class="hn-area-selection__content">
      <el-row class="check-all">
        <el-checkbox
          :indeterminate="otherArea.isIndeterminate"
          v-model="otherArea.checkedAllBoolean"
          @change="handleCheckedAllChange($event, 'otherArea')"
        >全选 - 非常用地域</el-checkbox>
      </el-row>

      <el-row>
        <el-checkbox-group v-model="otherArea.checkedCities">
          <el-checkbox
            v-for="(commonUse, key) in mxOtherAreas"
            :label="commonUse.id"
            :key="key"
            @change="handleCheckedProvinceChange(key, 'otherArea')"
          >
            <span
              class="feedsb-ae"
              :class="commonUse.classShow ? 'feedsb-af' : ''"
            >{{ commonUse.name }}</span>
            <template v-if="commonUse.hasOwnProperty('cities')">
              <span
                class="ah"
                v-if="commonUse.hasOwnProperty('checkedSum') && commonUse.checkedSum > 0"
              >({{ commonUse.checkedSum }})</span>
              <el-popover
                v-model="commonUse.show"
                placement="right"
                width="300"
                trigger="click"
              >
                <el-checkbox
                  style="line-height: 2.4"
                  v-for="(city, cKey) in commonUse.cities"
                  :label="city.id"
                  :key="cKey"
                  @change="handleCheckedCityChange(`${key+','+cKey}`, city.id, 'otherArea')"
                >
                  <span
                    class="feedsb-ae"
                    :class="city.classShow ? 'feedsb-af' : ''"
                  >{{ city.name }}</span>
                </el-checkbox>
                <el-button
                  class="ae"
                  slot="reference"
                  type="text"
                >
                  <i class="el-icon-arrow-down"></i>
                </el-button>
              </el-popover>
            </template>
          </el-checkbox>
        </el-checkbox-group>
      </el-row>
    </el-row>

  </div>
</template>

<script type="text/babel">
import { MX_AREA as mxArea } from '../../utils/area'

export default {
  name: "AreaSelection",
  props: {
    maxWidth: {
      type: Number,
      default: 850
    },
    item: {
      type: Object,
      require: true
    },
    query: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      mxAreas: [
        mxArea['commonUse'].slice(0, 7),
        mxArea['commonUse'].slice(7, 14)
      ],
      mxOtherAreas: mxArea['rarelyUse'],
      checkedCity: {
        commonArea: [],
        otherArea: []
      },
      searchName: '',
      commonArea: {
        allIds: [],
        isIndeterminate: false,
        checkedAllBoolean: false,
        checkedCities: []
      },
      otherArea: {
        allIds: [],
        isIndeterminate: false,
        checkedAllBoolean: false,
        checkedCities: []
      },
      template: {
        closeShow: false,
        show: false,
        name: ''
      }
    };
  },
  watch: {
    item: {
      handler(val, oldVal) {
        this.initialCommon()
        this.initial(val)
      }
    },
    'commonArea.checkedCities': {
      handler(val, oldVal) {
        this.checkedCity.commonArea = val
        this.watchCheckedCities(val, 'commonArea')
        this.areaCheckedFilter(val, 'commonArea')
      }
    },
    'otherArea.checkedCities': {
      handler(val, oldVal) {
        this.checkedCity.otherArea = val
        this.watchCheckedCities(val, 'otherArea')
        this.areaCheckedFilter(val, 'otherArea')
      }
    },
    checkedCity: {
      handler(val, oldVal) {
        this.$emit('transformPeriod', val)
      },
      deep: true
    },
    'template.name': {
      handler(val, oldVal) {
        this.$emit('changeTemplateName', {
          name: val,
          type: 'launchArea'
        })
      }
    }
  },
  created() { },
  mounted() {
    this.initialCommon()
    this.initial(this.item)
  },
  methods: {
    initialCommon() {
      let getIds = (array) => {
        const res = []
        array.forEach(items => {
          res.push(items.id)
          if (items.hasOwnProperty('cities')) {
            items.cities.forEach((city) => {
              res.push(city.id)
            })
          }
        })
        return res
      }
      let commonUseIds = []
      mxArea['commonUse'].forEach(items => {
        let temps = getIds(items.provinces)
        temps.forEach(id => {
          commonUseIds.push(id)
        })
      })
      this.commonArea.allIds = commonUseIds

      let otherAreaIds = getIds(this.mxOtherAreas)
      this.otherArea.allIds = otherAreaIds
    },
    initial(row) {
      if (!row.id) {
        if (this.query.campaignId === undefined) {
          this.commonArea.checkedCities = this.commonArea.allIds
          this.otherArea.checkedCities = []

          this.template = {
            closeShow: true,
            show: false,
            name: ''
          }
        } else {
          if (row.model.length !== 0) {
            this.commonArea.checkedCities = row.model.commonArea
            this.otherArea.checkedCities = row.model.otherArea
          } else {
            this.commonArea.checkedCities = this.commonArea.allIds
            this.otherArea.checkedCities = []
          }
          this.template = {
            closeShow: true,
            show: false,
            name: ''
          }
        }
      } else {
        this.commonArea.checkedCities = row.model.commonArea
        this.otherArea.checkedCities = row.model.otherArea

        this.template = {
          closeShow: false,
          show: true,
          name: row.name
        }
      }
    },
    areaCheckedFilter(IDs, type) {
      let areas = (type === 'commonArea') ? this.mxAreas : this.mxOtherAreas
      let checkedFilter = (c) => {
        if (c.hasOwnProperty('cities')) {
          let checkedSum = 0
          let checkedAll = false
          c.cities.forEach(d => {
            let checked = false
            if (IDs.includes(d.id)) {
              checked = true
              checkedSum = checkedSum + 1
            }
            this.$set(d, 'checked', checked)
          })
          if (checkedSum === c.cities.length) {
            checkedAll = true
          }
          this.$set(c, 'checkedAll', checkedAll)
          this.$set(c, 'checkedSum', checkedSum)
        }
      }
      areas.forEach(a => {
        if (type === 'commonArea') {
          a.forEach(b => {
            b.provinces.forEach(c => {
              checkedFilter(c)
            })
          })
        } else {
          checkedFilter(a)
        }
      })
    },
    handleSearchChange(val) {
      this.searchName = val.replace(/[^\u4E00-\u9FA5]/g, '')
    },
    handleKeyUp() {
      let showNum = 1
      let checked = (a) => {
        let show = false
        let classShow = false
        if (a.hasOwnProperty('cities')) {
          if (a.name === this.searchName.trim()) {
            classShow = true
            showNum++
          }
          a.cities.forEach(b => {
            let bClassShow = false
            if (this.searchName.trim() === b.name) {
              show = true
              bClassShow = true
              showNum++
            }
            this.$set(b, 'classShow', bClassShow)
          })
        } else {
          if (a.name === this.searchName.trim()) {
            classShow = true
            showNum++
          }
        }
        this.$set(a, 'show', show)
        this.$set(a, 'classShow', classShow)
      }

      this.mxAreas.forEach(a => {
        a.forEach(b => {
          b.provinces.forEach(c => {
            checked(c)
          })
        })
      })

      this.mxOtherAreas.forEach(a => {
        checked(a)
      })
      if (showNum === 1) {
        this.searchName = ''
      }
    },
    getArea(type) {
      let currentArea = {}
      switch (type) {
        case 'commonArea':
          currentArea = this.commonArea
          break
        case 'otherArea':
          currentArea = this.otherArea
          break
        default:
          console.log('======提示：', '选项错误')
      }
      return currentArea
    },
    watchCheckedCities(val, type) {
      let currentArea = this.getArea(type)
      currentArea.isIndeterminate = val.length > 0 && val.length < currentArea.allIds.length
      currentArea.checkedAllBoolean = val.length === currentArea.allIds.length
    },
    handleCheckedAllChange(val, type) {
      let currentArea = this.getArea(type)
      currentArea.checkedCities = val ? currentArea.allIds : []
    },
    handleCheckedProvinceChange(key, type) {
      let currentArea = this.getArea(type)
      let provinces = {}

      if (type === 'otherArea') {
        provinces = this.mxOtherAreas[key]
      } else {
        let keys = key.split(',')
        provinces = this.mxAreas[keys[0]][keys[1]].provinces[keys[2]]
      }

      if (provinces.hasOwnProperty('cities')) {
        provinces.cities.forEach((city) => {
          let index = currentArea.checkedCities.indexOf(city.id)
          if (provinces.checkedAll) {
            if (index !== -1) {
              currentArea.checkedCities.splice(index, 1)
            }
          } else {
            if (index === -1) {
              currentArea.checkedCities.push(city.id)
            }
          }
        })
      }
    },
    handleCheckedCityChange(key, id, type) {
      let currentArea = this.getArea(type)
      let keys = key.split(',')
      let province = {}
      let city = {}
      if (type === 'otherArea') {
        province = this.mxOtherAreas[key[0]]
        city = province.cities[keys[1]]
      } else {
        province = this.mxAreas[keys[0]][keys[1]].provinces[keys[2]]
        city = province.cities[keys[3]]
      }

      let cityChecked = false
      if (!city.checked) {
        // 加
        cityChecked = true
      }
      this.$set(city, 'checked', cityChecked)

      // 省是否选中
      let checkedIds = []
      province.cities.forEach((city) => {
        if (city.checked) {
          checkedIds.push(city.id)
        }
      })

      if (province.cities.length === checkedIds.length) {
        currentArea.checkedCities.push(province.id)
      } else {
        let index = currentArea.checkedCities.indexOf(province.id)
        if (index !== -1) {
          currentArea.checkedCities.splice(index, 1)
        }
      }
    },
    handleConfirm() {
      this.$emit('saveTemplate', 'launchArea')
    }
  }
};
</script>

<style lang="scss" scoped></style>
