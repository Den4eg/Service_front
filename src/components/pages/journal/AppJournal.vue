<template>
    <div class="main">
        <div class="scroll-wraper">
            <div class="wrap-block">
                <app-content class="app-content"></app-content>
            </div>
        </div>
        <app-sidebar v-if="test" class="app-sidebar"></app-sidebar>
    </div>
</template>

<script>
import Content from '@/components/Content.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
    components: {
        appSidebar: Sidebar,
        appContent: Content,
    },
    data: function() {
        return {
            test: true,
        };
    },
};
</script>

<style scoped>
.scroll-wraper {
    will-change: transform;
    position: relative;
    overflow-y: scroll;
    scrollbar-color: #3e3e3e #6868688e;
    scrollbar-width: thin;
}

.scroll-wraper::-webkit-scrollbar-track {
    box-shadow: inset 0 0 7px #00000098;
    border-radius: 5px;
    background-color: #f5f5f5;
}

.scroll-wraper::-webkit-scrollbar {
    width: 4px;
    border-radius: 9px;
    background-color: #f5f5f5;
}

.scroll-wraper::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #3e3e3e;
}

.wrap-block {
    width: 99.7%;
    position: absolute;
}
</style>
