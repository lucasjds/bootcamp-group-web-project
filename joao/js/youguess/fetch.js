class FetchYouAPIs {
    constructor(qtd) {
        this.props = {
            apiRandomUser: 'https://randomuser.me/api/',
            apiRestContries: 'https://restcountries.eu/rest/v2/alpha',
            inc: 'gender,name,nat',
            qtd
        }
    }

    //fetch all country names given a list of codes
    async fetchCountriesNames(codes) {
        const data = await fetch(`${this.props.apiRestContries}?codes=${codes}`);
        return data.json();
    }

    async fetchUsers() {
        const data = await fetch(`${this.props.apiRandomUser}/?results=${this.props.qtd}&inc=${this.props.inc}`);
        return data.json();
    }

    async getUsers() {
        // fetching users from API - results.results
        const users = await this.fetchUsers();

        // generating list of codes to search country name
        const codes = users.results.map(v => v.nat).join(';');

        //fetching contries names by code
        const contriesObjs = await this.fetchCountriesNames(codes);

        // mapping contries names to a proper country object
        const countriesNames = contriesObjs.reduce((ac, c) => {
            ac[c.alpha2Code] = c.name;
            return ac;


        }, {})

        // mapping result to proper user object
        return users.results
            .map(value => {
                return {
                    name: `${value.name.first} ${value.name.last}`,
                    gender: value.gender,
                    country: countriesNames[value.nat]
                }
            });

    }

}