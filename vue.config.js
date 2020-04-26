// module.exports = {
//     devServer:{
//         proxy: {
//             'http://139.199.66.15:8003': {
//               //设置你调用的接口域名和端口号 别忘了加http
//               target: 'http://139.199.66.15:8003',
//               changeOrigin: true,
//               ws:true,
//               pathRewrite: {
//                 '^http://139.199.66.15:8003': ''
//                 //这里理解成用‘/web'代替target里面的地址，后面组件中我们掉接口时直接用web代替 比如我要调用'http://192.168.12.36:9000http://139.199.66.15:8003/SourceManage/user/add'，直接写‘/web/user/add'即可
//               }
//             }
//           }
//     }
// }

