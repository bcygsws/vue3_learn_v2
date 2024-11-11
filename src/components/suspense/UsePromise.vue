<template>
  <div class="use_timeout">
    <h3>十六、Suspense组件的使用</h3>
    <p>promise+setTimeout方法制作异步组件：{{ msg }}</p>
  </div>
</template>

<script lang="ts">
/**
 *
 * @ Suspense 组件
 * 用途：在等待异步加载组件过程中的一些后备内容
 *
 */
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'UseSuspense',
  async setup() {
    // setup最终返回的是{msg:res.msg}，作为setup的返回值
    return new Promise((resolve, _) => {
      // 相当于3.5后，setup才返回了msg；在此期间，使用Suspense标签内的后备内容模板
      setTimeout(() => {
        resolve({ msg: '我是异步组件的数据' });
      }, 3500);
    }).then((res: any) => {
      return {
        msg: res.msg
      };
    });
  }
});
</script>
<style lang="scss" scoped>
.use_timeout {
  background-color: blue;
}
</style>
