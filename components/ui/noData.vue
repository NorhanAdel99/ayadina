<template>
    <div class="p-5 text-center">
        <h5 class="mb-3" > <slot></slot></h5>
        <img src="/imgs/no-connection.png" alt="no_data" class="nodataImg" loading="lazy">
    </div>
</template>
<style>
.nodataImg{
    width: 70px;
    height: 70px;
   object-fit: contain;
}
</style>