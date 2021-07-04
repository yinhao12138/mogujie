export default {
  addCart(context, payload) {
    // console.log(payload);
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        context.commit('addCounter', oldProduct)
        resolve('添加商品数量+1')
      } else {
        payload.count = 1
        context.commit('addToCart', payload)
        resolve('添加新的商品')
      }
    })
  }
}