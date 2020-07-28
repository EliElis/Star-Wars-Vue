import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api';
import * as types from './mutation-types';
import { mixins } from '../mixins';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      allShips: [],
      pilots: [],
      singleShip: {},
  },
  getters: {
    allShips: state => state.allShips,
    pilots: state => state.pilots,
    singleShip: state => state.singleShip
  },

  mutations: {
    [types.STORE_FETCHED_SHIPS] (state, { ships }) {
      state.allShips = ships
    },
    [types.ALL_PILOTS] (state, { pilots }) {
      state.pilots = pilots
    },
    [types.STORE_POST] (state, { ship }) {
      state.singleShip = ship
    },

  },

  actions: {
    getAllShips:({commit},) => {
      return new Promise((resolve) => {
        api.getShips().then(ships => {
          // console.log('ships', ships);
        let pilotsLinks = [], pilots = [];

        ships.forEach((el) => {
          mixins.formatValues(el);
        });

        commit(types.STORE_FETCHED_SHIPS, {ships});

        ships.forEach((el) => {
          if (el.pilots && el.pilots.length > 0) {
            el.pilots.forEach((elem) => {
              if (!pilotsLinks.includes(elem)) {
                pilotsLinks.push(elem);
              }
            })
          }
        });

        pilotsLinks.forEach((link) => {
          api.getPilot(link, item => {
            pilots.push(item)
          })
        });

        commit(types.ALL_PILOTS, {pilots});
          resolve(true)
      })
      })
    },
    getShip({commit}, id){
      return new Promise((resolve) => {
        api.getSingleShip(id, ship => {
          commit(types.STORE_POST, { ship });
          resolve()
        })
      })
    }

  },
  modules: {
  }
})
