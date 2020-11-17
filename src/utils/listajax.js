import { request } from "./request";

/**
 * 列表请求方法
 * @overview 列表请求方法
 * @param options 初始化配置信息
 * @property listState 列表状态
 * @property pageTotal 页码总量
 * @property config 配置信息
 * @property getList 获取数据
 * @property delData 删除参数
 * @property changeData 改变参数
 * @property changeURL 改变url
 * @property refreshPage 刷新列表
 */
class listAjax {
  listState = 0; // 0 加载中 1 正常加载 2 暂无数据 3 已无更多
  pageTotal = 1;
  constructor(options) {
    this.config = Object.assign(
      {
        data: {},
        method: "POST",
        current: 0,
        size: 10
      },
      options
    );
  }
  getList(current) {
    const that = this;
    if (this.listState !== 0) {
      return Promise.reject({
        msg: "list loading"
      });
    }
    this.listState = 0;
    if (current && current <= this.pageTotal) {
      this.config.current = current;
    } else {
      this.config.current++;
    }
    return request({
      url: this.config.url,
      data: Object.assign(
        {
          processData: true,
          current: this.config.current,
          size: this.config.size
        },
        this.config.data
      ),
      method: this.config.method
    })
      .then(res => {
        res = res.data;
        that.pageTotal = res.data.pages;
        if (that.pageTotal === 0) {
          that.listState = 2;
        } else if (that.pageTotal === that.config.current) {
          that.listState = 3;
        } else {
          that.listState = 0;
        }
        return res;
      })
      .catch(err => {
        this.listState = 0;
        return Promise.reject(err);
      });
  }
  /**
   * 新增或改变参数
   * @param data 参数
   */
  changeData(data) {
    this.config.data = Object.assign(true, this.config.data, data);
  }
  /**
   * 删除参数
   * @param name 参数名
   */
  delData(name) {
    delete this.config.data[name];
  }
  /**
   * 改变请求url地址
   * @param url 新的请求地址
   */
  changeURL(url) {
    this.config.url = url;
  }
  /**
   * 重置列表,列表状态
   */
  refreshPage() {
    this.config.current = 0;
    this.getList(0);
  }
  reset() {
    this.listState = 0
    this.pageTotal = 1
    this.config.current = 0
  }
}

export default listAjax;
