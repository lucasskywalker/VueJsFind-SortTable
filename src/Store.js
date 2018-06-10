import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource';

Vue.use(VueResource);
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiData: [],
  },
  actions: {
    loadApiData({commit}) {
      Vue.http.get('static/data/test.json').then(response => {
        let transformedArray = response.data.map((current) => {
          let searchString = '';

          for (let key in current) {
            searchString += current[key]
          }

          current.searchString = searchString.toLocaleLowerCase();

          return current;
        });

        commit('UPDATE_API_DATA', transformedArray);
      });
    },
    changeApiData({commit, state}, params) {
      let transformedArray = state.apiData.map((current) => {
        if (current.id === params.id) {
          current[params.category] = params.value;

          let searchString = '';

          for (let key in current) {
            if (key !== 'searchString') {
              searchString += current[key]
            }
          }

          current.searchString = searchString.toLocaleLowerCase();
        }

        return current;
      });

      commit('UPDATE_API_DATA', transformedArray);
    }
  },
  mutations: {
    UPDATE_API_DATA(state, data) {
      state.apiData = data;
    }
  },
  getters: {
    apiData(state) {
      return state.apiData
    }
  }
});
