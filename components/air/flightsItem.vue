<template>
  <div class="flight-item">
    <div @click="handleShowRecommend">
      <!-- 显示的机票信息 -->
      <el-row type="flex" align="middle" class="flight-info">
        <el-col :span="6">
          <span>{{ data.airline_name }}</span>
          {{ data.flight_no }}
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="space-between" class="flight-info-center">
            <el-col :span="8" class="flight-airport">
              <strong>{{ data.dep_time }}</strong>
              <span>{{ data.org_airport_name }}{{ data.org_airport_quay }}</span>
            </el-col>
            <el-col :span="8" class="flight-time">
              <span>2时20分</span>
            </el-col>
            <el-col :span="8" class="flight-airport">
              <strong>{{ data.arr_time }}</strong>
              <span>{{ data.dst_airport_name }}{{ data.dst_airport_quay }}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="flight-info-right">
          ￥
          <span class="sell-price">{{ data.seat_infos[0].org_settle_price_child }}</span>起
        </el-col>
      </el-row>
    </div>
    <div v-if="showRecommend" class="flight-recommend">
      <!-- 隐藏的座位信息列表 -->
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="4">
          低价推荐
        </el-col>
        <el-col :span="20">
          <el-row
            v-for="(item, index) in data.seat_infos"
            :key="index"
            type="flex"
            justify="space-between"
            align="middle"
            class="flight-sell"
          >
            <el-col :span="16" class="flight-sell-left">
              <span>{{ item.name }}</span>
              | {{ item.supplierName }}
            </el-col>
            <el-col :span="5" class="price">
              ￥{{ item.org_settle_price }}
            </el-col>
            <el-col :span="3" class="choose-button">
              <el-button type="warning" size="mini" @click="handleChoose(data.id, item.seat_xid)">
                选定
              </el-button>
              <p>剩余：{{ item.discount }}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  // 父传子
  props: {
    // 数据
    data: {
      type: Object,
      // 默认是空数组
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  data() {
    return {
      showRecommend: false // 列表默认收起
    }
  },
  methods: {
    // 选择机票跳转订单页
    // eslint-disable-next-line camelcase
    handleChoose(id, seat_xid) {
      this.$router.push({
        path: `/air/order`,
        query: {
          seat_xid,
          id
        }
      })
    },
    // 控制推荐列表的展开收起
    handleShowRecommend() {
      this.showRecommend = !this.showRecommend
    }
  }
//   data () {
//     return {
//       // 列表数据
//       dataList: [],
//       flightsData: {},
//       isShow: false
//     }
//   },
//   mounted () {
//     this.$axios({
//       url: '/airs',
//       params: this.$route.query
//     }).then((res) => {
//       this.flightsData = res.data
//       const arrs = []
//       this.flightsData.flights.forEach(function (item, index) {
//         item.isShow = false
//         arrs.push(item)
//       })
//       this.dataList = arrs
//       // this.dataList = this.flightsData.flights
//       console.log(this.dataList)
//     })
//   },
//   methods: {
//     handleClick(item) {
//     //    this.isShow =!this.isShow
//     //     console.log(e.currentTarget)
//       item.isShow = !this.isShow
//       this.isShow = !this.isShow
//     }
//   }
// }
}
</script>

<style scoped lang="less">
.flight-item {
  border: 1px #ddd solid;
  margin-bottom: 10px;

  .flight-info {
    padding: 15px;
    cursor: pointer;

    > div {
      &:first-child,
      &:last-child {
        text-align: center;
      }
    }
  }

  .flight-info-center {
    padding: 0 30px;
    text-align: center;

    .flight-airport {
      strong {
        display: block;
        font-size: 24px;
        font-weight: normal;
      }
      span {
        font-size: 12px;
        color: #999;
      }
    }

    .flight-time {
      span {
        display: inline-block;
        padding: 10px 0;
        border-bottom: 1px #eee solid;
        color: #999;
      }
    }
  }

  .flight-info-right {
    .sell-price {
      font-size: 24px;
      color: orange;
      margin: 0 2px;
    }
  }
}

.flight-recommend {
  background: #f6f6f6;
  border-top: 1px #eee solid;
  padding: 0 20px;

  .flight-sell {
    border-bottom: 1px #eee solid;
    padding: 10px 0;

    &:last-child {
      border-bottom: none;
    }

    .flight-sell-left {
      font-size: 12px;
      span {
        color: green;
      }
    }

    .price {
      font-size: 20px;
      color: orange;
    }

    .choose-button {
      text-align: center;
      color: #666;
      button {
        display: block;
        width: 100%;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
