<template>
        <ui-main-title>
            الملف الشخصي
        </ui-main-title>
        <profile-tabs></profile-tabs>
        <div class="row justify-content-center">
            <div class="col-md-10">
                <ui-base-card>
                    <!-- '/subCategory/'+content.id -->
                    <NuxtLink   :to="localePath('/profile/chat/' + `${chat.id}`)"  v-for="chat in chats" :key="chat.id" class="mb-3 border-bottom pb-3 text-dark d-block">
                            <div class="d-flex gap-10 mb-3">
                                <img :src="chat.img" class="circleImg">
                                <div>
                                    <h6 class="mb-1">{{ chat.name }}</h6>
                                    <p> {{ chat.rateDate }}</p>
                                </div>
                            </div>
                        <!-- rate -->
                        <p class="text-muted">
                            {{ chat.description }}
                        </p>
                    </NuxtLink>


                </ui-base-card>
            </div>
        </div>

   
</template>
<script>

export default {
    data() {
        return {
            visible: false,
            visibleCertainModal: false,
            localePath: useLocalePath(),
            chats: [
                {
                    id: 'c1',
                    name: 'طارق محمد ',
                    rateDate: '12/12/2023',
                    description: 'هذا النص مثال لنص ممكن ان يستبدل هذا النص مثال لنص ممكن ان يستبدل هذا النص مثال لنص ممكن ان يستبدل ل',
                    img: new URL('../../assets/imgs/logo.png', import.meta.url)
                },
                {
                    id: 'c2',
                    name: 'طارق  احمد ',
                    rateDate: '12/12/2023',
                    description: 'هذا النص مثال لنص ممكن ان يستبدل هذا النص مثال لنص ممكن ان يستبدل هذا النص مثال لنص ممكن ان يستبدل ل',
                    img: new URL('../../assets/imgs/sport.png', import.meta.url)
                },
                {
                    id: 'c3',
                    name: 'طارق هاني ',
                    rateDate: '12/12/2023',
                    description: 'هذا النص مثال لنص ممكن ان يستبدل هذا النص مثال لنص ممكن ان يستبدل هذا النص مثال لنص ممكن ان يستبدل ل',
                    img: new URL('../../assets/imgs/sport.png', import.meta.url)

                }
            ]
        }

    },
  

}
</script>