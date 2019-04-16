const {
  clipboard
} = require('electron')

new Vue({
  el: '#app',
  data: {
    baseList: [],
    list: [],
    title: '',
    subtitle: '',
    text: '',
    isShowDone: false,
    search: ''
  },
  created: function () {
    this.baseList = JSON.parse(localStorage.getItem('list'))
    
    if (this.baseList == null) {
      this.baseList = []
    }
  },
  methods: {
    action() {
      this.baseList.push({
        'title': this.title,
        'subtitle': this.subtitle,
        'text': this.text,
        'done': false,
        'index': this.baseList.length
      })
      localStorage.setItem('list', JSON.stringify(this.baseList))
      // this.title = ''
      // this.subtitle = ''
      this.text = ''
    },
    done(item) {
      this.baseList[item.index].done = !this.baseList[item.index].done
      localStorage.setItem('list', JSON.stringify(this.baseList))
    },
    clear(item) {
      console.log(item.index);
      
      this.baseList.splice(item.index, 1)
      localStorage.setItem('list', JSON.stringify(this.baseList))
    },
    changeList(flag) {
      this.isShowDone = flag
    }
  },
  computed: {
    getDataList() {
      return this.baseList.filter((item, index) => {
        // isShowDone=true->item.done=trueも配列に入れる
        if (this.isShowDone == true) {
          if (this.search!=="") {
            if (item["title"].indexOf(this.search) > -1) {
              item["index"] = index
              return item
            } else if (item["subtitle"].indexOf(this.search) > -1) {
              item["index"] = index
              return item
            } else if (item["text"].indexOf(this.search) > -1) {
              item["index"] = index
              return item
            }
          } else {
            item["index"] = index
            return item
          }
        } else {
          if (item.done != true) {
            if (this.search !== "") {
              if (item["title"].indexOf(this.search) > -1) {
                item["index"] = index
                return item
              } else if (item["subtitle"].indexOf(this.search) > -1) {
                item["index"] = index
                return item
              } else if (item["text"].indexOf(this.search) > -1) {
                item["index"] = index
                return item
              }
            } else {
              item["index"] = index
              return item
            }
          }
        }
      });
    },
    getTotalCount() {
      return this.baseList.length
    },
    getCount() {
      let count = this.baseList.filter(item => {
        if (item.done != true) {
          return item
        }
      })
      return count.length
    }
  }
})