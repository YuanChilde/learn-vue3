module.exports={
    outputDir: 'dist',
     devServer: {
         port: 8081,
         proxy: {
             '/api': {
                 target: "http://xx",
                 changeOrgin: true
             }
         }
     },
}