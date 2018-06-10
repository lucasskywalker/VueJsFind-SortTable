<template>
    <div class="table">
        <div class="table__search">
            <input type="text" v-model="searchValue">
        </div>
        <div class="table__head">
            <div class="table__row">
                <div class="table__col"><b>id</b></div>
                <div class="table__col" @click="sortColumn('name')"><b>name</b></div>
                <div class="table__col" @click="sortColumn('location')"><b>location</b></div>
                <div class="table__col" @click="sortColumn('currency')"><b>currency</b></div>
            </div>
        </div>

        <div class="table__body">
            <div class="table__row" v-for="item in outputList">
                <div class="table__col">
                    {{item.id}}
                </div>
                <div class="table__col">
                    <input type="text" :value="item.name"
                           @input="validationValue({type: 'string', input: $event.target})"
                           @blur="changeValue({id: item.id, category: 'name', value: $event.target.value})">
                </div>
                <div class="table__col">
                    <input type="text" :value="item.location"
                           @input="validationValue({type: 'string', input: $event.target})"
                           @blur="changeValue({id: item.id, category: 'location', value: $event.target.value})">
                </div>
                <div class="table__col">
                    <input type="text" :value="item.currency"
                           @input="validationValue({type: 'number', input: $event.target})"
                           @blur="changeValue({id: item.id, category: 'currency', value: $event.target.value})">
                </div>
            </div>
        </div>

        <div class="table__total">
            <div class="table__row">
                <div class="table__col"></div>
                <div class="table__col"></div>
                <div class="table__col"></div>
                <div class="table__col"><b>Total {{totalCurrency}}</b></div>
            </div>
        </div>
    </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    data() {
      return {
        searchValue: '',
        sort: {
          category: 'name',
          reverse: false
        }
      }
    },
    computed: {
      ...mapGetters(['apiData']),
      outputList() {
        const sortDirection = this.sort.reverse ? -1 : 1;

        return this.apiData
          .filter((item) => {
            return item.searchString.indexOf(this.searchValue.toLocaleLowerCase()) > -1
          })
          .sort((a, b) => {
            if (this.sort.category === 'currency') return sortDirection * (a[this.sort.category] - b[this.sort.category]);

            return sortDirection * a[this.sort.category].toLocaleLowerCase().localeCompare(b[this.sort.category].toLocaleLowerCase())
          });
      },
      totalCurrency() {
        return this.outputList.reduce((sum, current) => {
          return sum + current.currency;
        }, 0);
      }
    },
    methods: {
      ...mapActions(['changeApiData']),
      sortColumn(category) {
        this.sort.reverse = this.sort.category === category ? !this.sort.reverse : false;
        this.sort.category = category;
      },
      changeValue(params) {
        this.changeApiData({
          id: params.id,
          category: params.category,
          value: params.category === 'currency' ? +params.value : params.value
        });
      },
      validationValue(params) {
        switch(params.type) {
          case 'number':
            params.input.value = params.input.value.replace(/[^\d]/,'');
            break;
          case 'string':
            params.input.value = params.input.value.replace(/\d/, '');
            break;
        }
      }
    }
  }
</script>