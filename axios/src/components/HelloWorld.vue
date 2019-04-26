<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <!-- <svg width="500px" height="500px">
      <rect x="0" y="0" width="100" height="100" fill="#feac5e">
        <animate attributeName="x" from="0" to="500" dur="2s" repeatCount="indefinite" />
      </rect>
      <rect x="250" y="250" width="50" height="50" fill="#4bc0c8">
        <animateTransform attributeName="transform" type="rotate" begin="0s" dur="10s" from="0 200 200" to="360 400 400" repeatCount="indefinite" />
      </rect>
    </svg> -->
    <input type="text">
    <select name="" id="">
      <option value="a">选项一</option>
      <option value="b">选项一二</option>
      <option value="c">选项三</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your ',
      arr:['one','two'],
    }
  },
  created() {
    
    this.test()
  },
  methods: {
    test(){
      
      // var draw = window.SVG('drawing').size(300,300) //设置大小,如果是百分比则跟随父窗体变化,drawing是html的divid
      // console.log(draw)
      // var rect = draw.rect(100, 100).attr({ fill: '#f06' })//draw.rect 画一个矩形，fill颜色是#06
	  //文件下载
	  
		 const req = new XMLHttpRequest();
         req.responseType = "blob";
         req.onload = function onload(){
            filename = decodeURI(filename);
            filename = filename.replace(/%23/g,'#');
            filename = filename.replace(/%2B/g,'+');
            filename = filename.replace(/%2c/g,',');
            let curl = window.URL.createObjectURL(this.response);
            const anchor = document.createElement('a');
            anchor.style.display ='none';
            anchor.href = curl;
            anchor.download = filename;
            anchor.click();
         }
         req.onreadystatechange = ()=>{
           if(req.readyState === XMLHttpRequest.OPENED){
             req.setRequestHeader('Accept','application/pdf');
             req.setRequestHeader('Accept','application/zip');
             req.setRequestHeader('Accept','image/jpeg');
             req.send();
           }
         }
        //  req.open('get',url)
     
    }

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input,select{
  height: 30px;
  padding: 0 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  /* padding: 0 4px; */
  transition: all ease-in .1s;
}
input:focus{
    border-color: #66afe9;
    outline:0;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
}
select:focus{
    border-color: #66afe9;
    outline:0;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
