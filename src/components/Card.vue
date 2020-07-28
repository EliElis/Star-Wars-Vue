<template>
    <div class="card">
        <router-link :to="{path: `/ship/${getId(ship.url)}`, params: {id: getId(ship.url)}}">

        <div class="card__thumbnail">
            <div class="card__thumbnail__icon">
                <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.01 9H0V11H7.01V14L11 10L7.01 6V9ZM12.99 8V5H20V3H12.99V0L9 4L12.99 8Z" fill="black"/>
                </svg>
            </div>
            <p class="card__thumbnail__title">{{thumbnailText(ship.name)}}</p>
            <p class="card__thumbnail__text">
               {{params.mglt}}: <span v-text="formatOutput(ship.MGLT)"></span>
            </p>
        </div>
        </router-link>

        <p class="card__title">{{ship.name}}</p>
        <p class="card__options">
            <span>{{params.cr}}:</span>
            <span v-text="formatOutput(ship.cost_in_credits)"></span>
        </p>
        <p class="card__options">
            <span>{{params.crew}}:</span>
            <span v-text="formatOutput(ship.crew)">
            </span>
        </p>
        <p class="card__options">
            <span>{{params.psngs}}:</span>
            <span v-text="formatOutput(ship.passengers)">
            </span>
        </p>

    </div>
</template>
<script>
    import { mixins } from '../mixins';
export default {
    name: 'Card',
    data() {
        return{
            params: {
                mglt: 'MGLT',
                cr: 'CR',
                crew: 'CREW',
                psngs: 'PSNGS'
            }

        }
    },
    mounted(){
        this.getId(this.ship.url)
    },
    methods: {
        getId(url){
            let id = url.substr(0, url.length - 1);
            id = id.slice(id.lastIndexOf('/') + 1, id.length);
            return id;
        },
        formatOutput(val){
            return isNaN(val)? 'unknown': val;
        },
        thumbnailText(name){
            return mixins.thumbnailText(name)
        }
    },
    props:['ship']
}
</script>