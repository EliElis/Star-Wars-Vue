<template>
    <div class="post">
        <div class="post__intro">
            <div class="post__intro__inner">
                <h1>PROFILE DESCRIPTION</h1>
                <div class="post__intro__img">
                    <img src="../assets/img/intro-post.png">
                </div>
            </div>
        </div>
        <div class="post__info">
            <div class="post__info__left">
                <div>
                    <p class="post__title">{{singleShip.name}}</p>
                    <p class="post__description">Model: {{singleShip.model}}</p>
                    <p class="post__description">Manufacturer: {{singleShip.manufacturer}}</p>
                    <p class="post__description">Starship class: {{singleShip.starship_class}}</p>
                </div>
            <div class="post__copy" @click="copyText(singleShip.url)">Copy api Url</div>
            </div>

            <div class="post__thumbnail">
                <p class="post__thumbnail__title">{{thumbnailText(singleShip.name)}}</p>
                <p class="post__thumbnail__text">MGLT: {{singleShip.MGLT}}</p>
            </div>
        </div>

        <div class="post__options">
            <div class="post__option">
                <p class="post__option__title">COST IN CREDITS</p>
                <p class="post__option__content" :class="formatOutput(singleShip.cost_in_credits).class ? 'unknown' : ''">{{formatOutput(singleShip.cost_in_credits).val}}</p>
            </div>
            <div class="post__option">
                <p class="post__option__title">CREW</p>
                <p class="post__option__content" :class="formatOutput(singleShip.crew).class ? 'unknown' : ''">{{formatOutput(singleShip.crew).val}}</p>
        </div>
            <div class="post__option">
                <p class="post__option__title">passengers</p>
                <p class="post__option__content" :class="formatOutput(singleShip.passengers).class ? 'unknown' : ''">{{formatOutput(singleShip.passengers).val}}</p>
            </div>
            <div class="post__option">
                <p class="post__option__title">CARGO CAPACITY</p>
                <p class="post__option__content" :class="formatOutput(singleShip.cargo_capacity).class ? 'unknown' : ''">
                    {{formatOutput(singleShip.cargo_capacity).val}}</p>
            </div>
            <div class="post__option">
                <p class="post__option__title">consumables</p>
                <p class="post__option__content" :class="formatOutput(singleShip.consumables).class ? 'unknown' : ''"> {{formatOutput(singleShip.consumables).val}}</p>
            </div>
            <div class="post__option">
                <p class="post__option__title">FILMS COUNTER</p>
                <p v-if="singleShip.films" class="post__option__content" >{{singleShip.films.length}}</p>
            </div>
        </div>
        <Form :img-url="'form-post.png'"></Form>
    </div>
</template>

<script>
    import { mixins } from '../mixins';
    import {mapGetters} from 'vuex';
    import Form from '@/components/Form.vue';
    export default {
        name: 'Post',
        data() {
            return {


            }
        },
        components: {
            Form,
        },
        beforeMount() {
            this.$store.dispatch('getShip', { slug: this.$route.params.slug })
                .then(() => {
                    mixins.formatValues(this.singleShip)
                })
        },
        methods:{
            thumbnailText(name){
                if(name){
                    return mixins.thumbnailText(name)
                }
            },
            formatOutput(val){
                let paramsObj = {};
                if(val === 'unknown' || isNaN(val)){
                    paramsObj.val = 'unknown';
                    paramsObj.class = true;
                }else{
                    paramsObj.val = val;
                    paramsObj.class = false;
                }
                return paramsObj;
            },
            copyText(url){
                navigator.clipboard.writeText(url)
            },
        },
        computed: {
            ...mapGetters({
                singleShip: 'singleShip'
            })
        },
    }

</script>

<style lang="scss">
    @import "@/assets/scss/post.scss";
</style>