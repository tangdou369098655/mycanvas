// getDataItem(a, b,c) {
//     let formdata = {
//         category: a,
//         data: b
//     };
//     this.axios.post('/Redraw', formdata).then(res => {
//         if (res.data) {
//             c=res.data.map(_ => {
//                 return {
//                     x: _.x,
//                     aa: _.x + _.w
//                 }
//             })
//         }
//     })
// };
// return this.axios.post().then(res => {
//             if (成立) {
//                 return { 
//                     被兑现 返回数据
//                 } else {
//                      Promise.reject(new Error('原因')) }}})
//                      .catch(err => {
//                          被拒绝处理
//                         })