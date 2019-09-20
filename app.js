new Vue({
    el: '#app',
    data: {
        title: 'Currency Converter',
        currencies: {},
        amount: 0,
        from: '',
        to: '',
        result: 0,
        loading: false
    },

    mounted() {
        this.getCurrencies();
    },

    watch: {
        from() {
            this.result = 0;
        },

        to() {
            this.result = 0;
        }
    },

    computed: {
        formattedCurrencies() {
            return Object.values(this.currencies);

        },
        calculatedResult() {
            return (Number(this.amount) * this.result).toFixed(3);
        },
        disabled() {
            return this.amount === 0 || this.amount === '' || this.loading;
        }
    },

    methods: {
        getCurrencies() {
            const currencies = localStorage.getItem('currencies');

            if (currencies) {
                this.currencies = JSON.parse(currencies);

                return;
            }

            axios.get("https://free.currconv.com/api/v7/currencies?apiKey=sample-key-do-not-use")
                .then(response => {
                    this.currencies = response.data.results;
                    // console.log(this.currencies);
                    localStorage.setItem('currencies', JSON.stringify(response.data.results))
                });
        },

        convertCurrencies() {

            const key = `${this.from}_${this.to}`;
            this.loading = true;
            axios.get(`https://free.currconv.com/api/v7/convert?apiKey=sample-key-do-not-use&q=${key}`)
                .then(response => {
                    // console.log(response);
                    this.loading = false;
                    this.result = response.data.results[key].val
                });
        }
    },
});
