class FetchWeAPIs{
    constructor() {
        this.props = {
            apiGenderize: 'https://api.genderize.io',
            apiRestContries: 'https://restcountries.eu/rest/v2/alpha',
        }
    }

    
    // fetch all valid countries codes from genderize
    async fetchCountriesCodes(){
        const data = await fetch(`${this.props.apiGenderize}/countries`);
        return data.json();
    }

    //fetch all country names given a list of codes
    async fetchCountriesNames(codes){
        const data = await fetch(`${this.props.apiRestContries}?codes=${codes}`);
        return data.json();
    }

    // returns a list of countries codes like [AF,BC,CD]
    async getCountriesCode(){
        const codes = await this.fetchCountriesCodes();
        return codes.countries.join(';');
    }

    // returns a list of countries objects like [{code : 'AF, name: 'Asadf"}]
    async getContriesData(){
        const codes = await this.getCountriesCode();
        const data = await this.fetchCountriesNames(codes);
        
        return data
            .filter(d => d !== null)
            .map(value =>  { 
                return {code: value.alpha2Code, name: value.name}
            });
    }

    async getGuess(name, country){
        const data = await fetch(`${this.props.apiGenderize}/?name=${name}&country_id=${country}`);
        return data.json();
    }
}