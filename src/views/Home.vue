<template>
    <div class="home" v-if="ships">
        <Intro :title-home="title"></Intro>

        <section class="cards" id="list">
            <div class="cards__title">
                <p>{{filters.title}}</p>
            </div>
            <div class="cards__order">
                <div class="header__icon filters__icon" @click="openFilters" :class="opened_filters? 'opened' : ''">
                    <span></span><span></span><span></span>
                </div>
                <v-select v-model="selected" :options="select" :searchable="false" @input="changeSelect"></v-select>
            </div>
            <div class="cards__filters" :class="opened_filters? 'opened' : ''">
                <div class="cards__filters__block">
                    <div class="cards__filters__title">
                        {{filters.pilots}}
                        <span class="cards__filters__counter">({{allPilots.length}})</span>
                    </div>
                    <label class="checkbox" v-for="(pilot, name) in allPilots" :key="pilot.name"
                           v-show="name < pilots.toShow">
                        <input type="checkbox" :value="pilot.url" v-model="selectedPilots" @change="changePilots()">
                        <span v-text="pilot.name"></span>
                    </label>
                    <div v-if="!pilots.opened" @click="togglePilots" class="cards__filters__all">View all</div>
                    <div v-if="pilots.opened" @click="togglePilots" class="cards__filters__all">Hide</div>
                </div>
                <div class="cards__filters__block" v-if="maxCrew > 0">
                    <div class="cards__filters__title" >
                        {{filters.crewSize}}
                    </div>
                    <div class="cards__filters__inputs">
                        <input type="text" v-model.number="valueCrew[0]">
                        <input type="text" v-model.number="valueCrew[1]">
                    </div>
                    <vue-range-slider @input="changeCrewRange" v-model="valueCrew"
                                      :min="rangeSlider.min" :max="maxCrew" :enable-cross="rangeSlider.enableCross" :dotSize="17" :height="3">
                        <template slot="tooltip" scope="{valueCrew}">
                            <div class="diy-tooltip">
                                {{ valueCrew }}
                            </div>
                        </template>
                    </vue-range-slider>
                </div>
                <div class="cards__filters__block" v-if="maxPassengers > 0">
                    <div class="cards__filters__title">{{filters.passengers}}</div>
                    <div class="cards__filters__inputs">
                        <input type="number" v-model.number="valuePassengers[0]">
                        <input type="number" v-model.number="valuePassengers[1]">
                    </div>
                    <vue-range-slider @input="changePassengersCapacity" v-model="valuePassengers" :min="rangeSlider.min" :dotSize="17" :height="3"
                                      :max="maxPassengers" :enable-cross="rangeSlider.enableCross">
                        <template slot="tooltip" scope="{valuePassengers}">
                            <div class="diy-tooltip">
                                {{ valuePassengers }}
                            </div>
                        </template>
                    </vue-range-slider>
                </div>
            </div>

            <div class="cards__main" v-if="shipsToShow">

                <Card v-for="ship in shipsToShow" :key="ship.model" :ship="ship"></Card>

                <div @click="showMoreCards" v-if="shipsToShow.length < ships.length" class="cards__more btn">
                    <span>VIEW MORE</span>
                    <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 5V8L12 4L8 0V3C3.58 3 0 6.58 0 11C0 12.57 0.46 14.03 1.24 15.26L2.7 13.8C2.25 12.97 2 12.01 2 11C2 7.69 4.69 5 8 5ZM14.76 6.74L13.3 8.2C13.74 9.04 14 9.99 14 11C14 14.31 11.31 17 8 17V14L4 18L8 22V19C12.42 19 16 15.42 16 11C16 9.43 15.54 7.97 14.76 6.74Z"
                              fill="white"/>
                    </svg>
                </div>
            </div>

        </section>

        <Form :img-url="'form-home.png'"></Form>
    </div>
</template>

<script>
    // @ is an alias to /src
    // import * as types from '../store/mutation-types'
    import {mapGetters} from 'vuex';
    import Intro from '@/components/Intro.vue';
    import Card from '@/components/Card.vue';
    import Form from '@/components/Form.vue';
    import {mixins} from '../mixins';
    import VueRangeSlider from 'vue-range-component';

    export default {
        name: 'Home',
        data() {
            return {
                opened_filters: false,
                ships: [],
                shipsToShow: [],
                pilots: {
                    perPage: 5,
                    opened: false,
                    toShow: 5,
                },
                selectedPilots: [],
                valueCrew: [0, 0],
                valuePassengers: [0, 0],
                maxCrew: 0,
                maxPassengers: 0,
                rangeSlider: {
                    min: 0,
                    enableCross: false,
                    tooltip: 'hover',
                },
                perPage: 6,
                title: "MAY THE FORCE BE WITH YOU",
                filters: {
                    title: 'Our starships',
                    pilots: 'Pilots',
                    crewSize: 'Crew size',
                    passengers: 'Passengers capacity'
                },
                selected: {label: 'BY CREW SIZE', code: 'crew'},
                select: [
                    {label: 'BY CREW SIZE', code: 'crew'},
                    {label: 'BY COST IN CREDITS', code: 'cost_in_credits'},
                    {label: 'BY MGLT NUMBER', code: 'MGLT'},
                ]
            }
        },
        components: {
            Intro,
            Card,
            Form,
            VueRangeSlider,
        },
        computed: {
            ...mapGetters({
                allShips: 'allShips',
                allPilots: 'pilots'
            }),
        },
        beforeMount() {
            this.$store.dispatch('getAllShips')
                .then(() => {
                    this.ships = mixins.sortBy('crew', this.allShips);
                    this.shipsToShow = mixins.getPageByNumber(0, this.ships);
                    this.maxPassengers = this.maxPassengersCapacity();
                    this.maxCrew = this.maxCrewSize();
                    this.valueCrew[1] = this.maxCrewSize();
                    this.valuePassengers[1] = this.maxPassengersCapacity();

                })
        },
        methods: {
            maxCrewSize() { //Maximum crew size in ships array
                return this.allShips.reduce((max, el) => {
                    return max < +el.crew ? +el.crew : max;
                }, 0);
            },
            maxPassengersCapacity() {
                return this.allShips.reduce((max, el) => {
                    return max < +el.passengers ? +el.passengers : max;
                }, 0);
            },

            changeSelect(selectObj) {
                this.ships = mixins.sortBy(selectObj.code, this.ships);
                this.shipsToShow = mixins.getPageByNumber(0, this.ships);
            },

            filterChanged() {
                mixins.filterByPilot(this.selectedPilots, this.allShips, ships => {
                    this.ships = this.selectedPilots.length > 0 ? ships : this.allShips;
                    mixins.filterBy(this.valueCrew[0], this.valueCrew[1], 'crew', this.ships, ships => {
                        this.ships = ships;
                        mixins.filterBy(this.valuePassengers[0], this.valuePassengers[1], 'passengers', this.ships, ships => {
                            this.ships = ships;
                            this.ships = mixins.sortBy(this.selected.code, this.ships)
                            this.shipsToShow = mixins.getPageByNumber(0, this.ships);
                        })
                    });
                });
            },

            changeCrewRange() {
                this.filterChanged();
            },

            changePassengersCapacity() {
                this.filterChanged();
            },

            changePilots() {
                this.filterChanged();
            },
            togglePilots() {
                if (this.pilots.toShow < this.allPilots.length) {
                    this.pilots.toShow = this.allPilots.length;
                } else {
                    this.pilots.toShow = this.pilots.perPage;
                }
                this.pilots.opened = !this.pilots.opened;
            },
            showMoreCards() {
                let pageNum = this.shipsToShow.length / 6;
                this.shipsToShow = this.shipsToShow.concat(mixins.getPageByNumber(pageNum, this.ships));
            },
            openFilters(){
                this.opened_filters  = !this.opened_filters ;
            },
        }
    }
</script>


<style lang="scss">
    @import "@/assets/scss/home.scss";
</style>