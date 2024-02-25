<template>
    <div class="p-5 text-center">
        <h5 class="mb-3" > <slot></slot></h5>
        <img src="../../assets/imgs/no-connection.png" alt="" class="nodataImg">
    </div>
</template>
<style>
.nodataImg{
    width: 70px;
    height: 70px;
   object-fit: contain;
}
</style>