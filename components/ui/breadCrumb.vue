<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb f-15 font-bolder">
            <li class="breadcrumb-item">
                <NuxtLink :to="to">
                    <slot name="mainPage"></slot>
                </NuxtLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page" v-if="moreOne" :to="to">
                <slot name="currentPage"></slot>
            </li>
            <li class="breadcrumb-item active" aria-current="page" v-else>
                <slot name="currentPage"></slot>
            </li>
        </ol>
    </nav>
</template>
<script>
export default {
    props: {
        moreOne: {
            type: Boolean,
            required: true,
            default: false
        },
        to: {
            type: URL,
            required: true,
        }
    },
    data() {
        return {

            items: [
                { label: ' الاعدادات ' },
                { label: ' الاشعارات' },
            ]
        }
    },


}
</script>