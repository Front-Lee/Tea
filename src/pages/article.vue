<template>
    <div class="article">
      <div class="article-title">
        {{title}}
      </div>
      <div class="article-browse">{{browse}}人浏览</div>
      <div class="article-con">{{cont}}</div>
    </div>
</template>

<script>
    export default {
        name: 'article',
        data(){
          return {
            title:'天青色在等你：“天青——汝瓷艺术展”在国家大剧院开幕',
            browse:"1024",
            cont:"11 月3 日下午，“天青——汝瓷艺术展”在国家大剧院艺术沙龙厅开幕，被称为宋代五大名窑之首的汝瓷首次布展国家大剧院，用国际范向观众展现了汝瓷所承载的千年传统艺术文化积淀。本次展览立意当传统工艺邂逅当代生活，用创新视角切入传统文化的内涵，这场融合了传统经典汝瓷特色又体现当代视角的展览吸引了多方关注。"
          }
        }
    }
</script>

<style lang="less" scoped>
.article{
  min-height:100vh;background:#fff;padding:40px;overflow:hidden;
  .article-title{margin-top:24px;font-size:32px;line-height:48px;color:#000;}
  .article-browse{font-size:24px;color:#999;line-height:48px;}
  .article-con{color:#333;font-family:"微软雅黑";font-size:28px;line-height:48px;margin-top:30px;text-indent:55px;text-align:justify;padding:0 6px;}
}
</style>
