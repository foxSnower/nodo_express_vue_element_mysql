<template>
  <div class="box">
    <ul class="sudu">
      <li class="sdli">
        <span class="sdspan" contenteditable="true">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan br">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan br">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
      </li>
      <li class="sdli">
        <span class="sdspan" contenteditable="true">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan br">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan br">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
      </li>
      <li class="sdli"><span class="sdspan" contenteditable="true">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan br">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan br">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
      </li>
      <li class="sdli"><span class="sdspan" contenteditable="true">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
      </li>
      <li class="sdli"><span class="sdspan" contenteditable="true">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
      </li>
      <li class="sdli"><span class="sdspan" contenteditable="true">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span></li>
      <li class="sdli"><span class="sdspan" contenteditable="true">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span></li>
      <li class="sdli"><span class="sdspan" contenteditable="true">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span></li>
      <li class="sdli"><span class="sdspan" contenteditable="true">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span>
        <span class="sdspan">1</span></li>
    </ul>
  </div>

</template>

<script>
export default {
  name: 'SuDu',
  data() {
    return {
      matrix : []
    };
  },
  mounted() {
    	this.matrix = Array.apply(null,{length:9})
			.map((v,i)=>Array.apply(null,{length:9})
			.map((v,i)=>i+1));
  },
  methods: {
  
  }
};
</script>

<style lang="scss" scoped>
.box {
  margin: 30px auto;
  min-width: 320px;
  .sudu {
    width: 100%;
    list-style: none;
    .sdli {
      padding: 5px 0;
      line-height: 24px;
      .sdspan {
        text-align: center;
        float: left;
        width: 26px;
        height: 26px;
        padding: 10px;
        border: 1px dashed red;
        outline: none;
        &.br {
          border-right: 2px solid red;
        }
      }
    }
  }
}
</style>
