class WeGuess {
    constructor() {

        // stops any timer on
        clearInterval(window.timer);

        this.props = {
            compliments: [
                'an amazing', 'an excelent', 'a strong', 'a famous', 'a great'
            ],
            cardInfo: true,
            finalMessage: true,
            title: 'Your Gender',
            subtitle: 'Let us try to figure out your gender',
        }

        // initializes class to fetch data from APIs
        this.fetch = new FetchWeAPIs();

        // initializes page elements
        this.createDOMElements();

        // initializes DOM elements and event handlers
        this.initDOMElements();

        // sets title, subtitle and background color
        this.setTheme();

        // retrieves country data from api and fill country-select
        this.fetch.getContriesData().then(data => {

            this.fillCountrySelect(data);

        });

        this.render();
    }

    modal(message) {

        const dialog = `
            <div class="modal" id="modal-control">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Look Up!</h5>
                    
                </div>
                <div class="modal-body">
                    <p>${message}</p>
                </div>
                
                </div>
            </div>
            
            </div>
            <div class="modal-backdrop show " id="backdrop-control"></div>
            
            `;
        const modal = document.querySelector('#modal');
        modal.innerHTML = dialog;

        setTimeout(() => {
            modal.innerHTML = '';
        }, 1500);

    };

    createDOMElements() {
        const content = document.querySelector('#content');
        content.innerHTML = `        
        <section class="card mb-3 card-body" id="card-info">

        <div class="row">

            <div class=" col-sm-12 col-md-6">
                <label for="user-name-input" class="col-form-label col-form-label-lg">Please, provide your name</label>

                <div class="input-group mb-3">

                    <div class="input-group-prepend">
                        <span class="input-group-text">
                            <i class="zmdi zmdi-account" style="color: #3498DB;"></i>
                        </span>
                    </div>
                    <input type="email" class="form-control form-control-lg" id="user-name-input">

                </div>
            </div>

            <div class="col-sm-12 col-md-6 ">
                <label for="country-select" class="col-form-label col-form-label-lg">What's your country?</label>
                <div class="input-group mb-3">

                    <div class="input-group-prepend">
                        <span class="input-group-text">
                            <i class="zmdi zmdi-pin" style="color: #3498DB;"></i>
                        </span>
                    </div>
                    <select id="country-select" class="form-control form-control-lg"></select>
                </div>
            </div>

        </div>



        <div class="row justify-content-center" style="margin: 50px 0 10px 0">
            <button id="guess-button" class="btn btn-info" style="font-size: 1.9rem">
                <div id="spinner" class="typing_loader d-none"></div>
                <i class="zmdi zmdi-mail-send"></i> Go and Guess
            </button>

        </div>
    </section>

    <section class="card mb-3 card-body d-none" id="card-guess">
        <div>

            <div id="success-find">
                <h4>Ok, so that's what we got...</h4>
                <h3 class="text-info text-center">
                    We are
                    <span id="guess-percentage" class="display-4 font-weight-bold"></span>
                    sure that your are
                    <span id="guess-gender" class="display-4 font-weight-bold"></span>

                </h3>
            </div>

            <div id="fail-find" class="d-none">
                <h3 class="text-info text-center" style="margin: 20px;">
                    We are very sorry, but we can't tell your gender!

                </h3>
            </div>



        </div>

        <div class="row justify-content-center" style="margin: 50px 0 10px 0">
            <button id="play-again-button" class="btn btn-info" style="font-size: 1.9rem">
                <i class="zmdi zmdi-mood"></i> Play again
            </button>

        </div>
    </section>
        `
    }

    initDOMElements() {
        //select dom elements
        this.userNameInput = document.querySelector('#user-name-input');
        this.countrySelect = document.querySelector('#country-select');
        this.guessButton = document.querySelector('#guess-button');
        this.playAgainButton = document.querySelector('#play-again-button');
        this.cardInfo = document.querySelector('#card-info');
        this.cardGuess = document.querySelector('#card-guess');
        this.successFind = document.querySelector('#success-find');
        this.failFind = document.querySelector('#fail-find');
        this.guessPercentage = document.querySelector('#guess-percentage');
        this.guessGender = document.querySelector('#guess-gender');
        this.spinner = document.querySelector('#spinner');

        //start handlers
        this.guessButton.addEventListener('click', this.guessHandler.bind(this));
        this.playAgainButton.addEventListener('click', this.playAgainHandler.bind(this));
    }

    setTheme() {
        const mainTitle = document.querySelector('#main-title');
        const mainSubtitle = document.querySelector('#main-subtitle');
        mainTitle.innerHTML = this.props.title;
        mainSubtitle.innerHTML = this.props.subtitle;


        document.body.style.backgroundColor = '#C7E6FA';
        document.body.style.backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='810' height='675' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.05'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/svg%3E")`;

    }
    // fill select component with countries data
    fillCountrySelect(data) {

        const countries = data.map(d => `<option value="${d.code}">${d.name}</option>`).join(' ');
        this.countrySelect.innerHTML += countries;
    }

    guessHandler() {
        const user = this.userNameInput.value;

        if (user === '') {
            this.modal('Please, provide your name');
            return;
        }

        const country = this.countrySelect.value;

        this.spinner.classList.remove('d-none');

        this.fetch.getGuess(user, country)
            .then(data => {
                const compliments = this.props.compliments;

                // verifies whether a name was matched
                if (this.props.finalMessage = data.gender == null ? false : true) {

                    // defines accuracy percentage
                    this.guessPercentage.innerHTML = `${data.probability * 100}%`

                    // picks a compliment and inserts into the DOM
                    const compliment = compliments[Math.floor(Math.random() * compliments.length)];
                    this.guessGender.innerHTML = `${compliment} ${data.gender}`
                }


                this.props.cardInfo = false;

                this.spinner.classList.add('d-none');

                this.render();
            })
            .catch(err => {
                this.spinner.classList.add('d-none');
                this.modal('An error has occurred! Try again later!')

            })


    }

    playAgainHandler() {
        this.userNameInput.value = ''
        this.props.cardInfo = true;
        this.render();
    }

    render() {

        if (this.props.finalMessage) {
            this.successFind.classList.remove('d-none');
            this.failFind.classList.add('d-none');
        } else {
            this.successFind.classList.add('d-none');
            this.failFind.classList.remove('d-none');
        }

        if (this.props.cardInfo) {
            this.cardGuess.classList.add('d-none')
            this.cardInfo.classList.remove('d-none')
        } else {
            this.cardInfo.classList.add('d-none')
            this.cardGuess.classList.remove('d-none')
        }
    }

}

