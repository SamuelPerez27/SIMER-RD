<template>

 <div class="container-fluid">
          <div class="row">
              <MenuSideCards class="col-2" />
              <router-view class="col-10"/>
          </div>
      </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  'MenuSideCards' : require("@/components/MenuSideCards.vue").default,
 
  }
}
</script>

<style>

</style>
