class YouGuess {
    constructor() {

        // stops any timer on
        clearInterval(window.timer);

        this.props = {
            title: 'Guess the gender',
            subtitle: 'Try to guess some genders!',
            totalQuestions: 10,
            time: 0,
            email: '',
            users: [],
            question: '',
            genderChoice: '',
            playerState: []
        }

        this.fetch = new FetchYouAPIs(this.props.totalQuestions);

        // initializes page elements
        this.createDOMElements();

        // initializes DOM elements and event handlers
        this.initDOMElements();

        // sets title, subtitle, questions number and background color
        this.setTheme();

        this.renderGuessers();

    }

    modal(message, callback = undefined) {

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
            if (callback !== undefined) {
                callback();
            }
        }, 1500);

    };

    renderGuessers() {
        const tableUI = document.querySelector('#tbody-guessers');
        const data = this.getLocalData() || [];

        const trs = data
            .sort((a, b) => b.points - a.points)
            .map((value) => {
                return `
                    <tr>
                        <td>${value.email}</td>
                        <td>${value.points} pts</td>
                    </tr>
                    `;
            }).join('');

        tableUI.innerHTML = trs;
    }

    getLocalData() {
        const data = localStorage.getItem('gender-game');
        return data === null ? null : JSON.parse(data);
    }

    setLocalData() {
        const points = this.calculatePoints();
        const email = this.props.email.length > 24 ? this.props.email.substring(0, 23) : this.props.email;
        const player = this.getLocalData() === null ? [] : [...this.getLocalData()];

        player.push({ email, points });

        localStorage.setItem('gender-game', JSON.stringify(player));
    }

    setTimer() {
        this.props.time++;
        this.timerCounter.innerHTML = `Time: ${this.props.time}`;
    }

    cancelTimer() {
        clearInterval(window.timer);
    }

    createDOMElements() {
        const content = document.querySelector('#content');
        content.innerHTML = `
            
        <section class="card mb-3 card-body d-none" id="card-guess">
        <div class="badge badge-warning" id="timer-counter" style="position: absolute;bottom: 7px;right: 12px;"></div>
        <div class="d-flex border-bottom mb-5 pb-2">
            <h3 style="flex: 1;" id="name-country" ></h3>
            <h3 id="current-question"><h3>
        </div>

        <div id="gender-choice">
            <div class="btn-group-toggle mb-3">
                <label id="label-male" class="btn btn-outline-warning btn-lg" for="gender-choice-male" style="width: 130px;">
                    <i class="zmdi zmdi-male"></i> Male
                    <input type="radio" name="gender-choice" id="gender-choice-male" value="male" autoComplete="off">

                </label>

            </div>

            <div class="btn-group-toggle mb-5">
                <label id="label-female" class="btn btn-outline-warning btn-lg" for="gender-choice-female" style="width: 130px;">
                    <i class="zmdi zmdi-female"></i>
                    Female
                    <input type="radio" name="gender-choice" id="gender-choice-female" value="female" autoComplete="off">
                </label>
            </div>

        </div>

        <div class="row justify-content-center">
            <button id="play-next" class="btn btn-success " style="font-size: 1.9rem; width: 130px">
                <i class="zmdi zmdi-forward"></i> Next
            </button>
        </div>

    </section>

    <div class="row" id="card-intro">
        <div class="col-md-6 d-flex">
            <section class="card mb-3 card-body" id="card-info">
                <h3 class="card-title border-bottom mb-5 pb-2">Ok, so that's what we got</h3>

                <h5><span id="questions-number"></span> questions</h5>
                <h5>One Rule - Guess !</h5>
                <div class="input-group mb-3 mt-4">
                    <input type="email" class="form-control form-control-lg" id="user-email-input" placeholder="myemail@email.com">

                    <div class="input-group-append">
                        <button id="guess-button" class="btn btn-success" style="font-size: 1.9rem">
                        <div id="spinner" class="typing_loader d-none"></div>
                        <i class="zmdi zmdi-play-circle-outline"></i> Play
                        </button>
                    </div>

                </div>

            </section>
        </div>
        <div class="col-md-6 d-flex">
            <section class="card mb-3 card-body" id="card-info">
                <h3 class="card-title border-bottom mb-2 pb-2 text-center">Wall of Guessers</h3>
                <div class="table-wrapper">
                    <table class="table" id="guessers-table">
                        <thead class="table-success">
                            <tr>
                                <th>Name</th>
                                <th>Points</th>
                            </tr>
                        </thead>

                        <tbody id="tbody-guessers">
                            
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    </div>
        `;
    }

    createResultsDOMElements() {
        const content = document.querySelector('#content');
        content.innerHTML = `
        <div class="row">
            <div class="col">
                <section class="card mb-3 card-body">
                    <div class="d-flex border-bottom mb-3 pb-1">
                        <h3 style="flex: 1;">You've got <span id="points"></span></h3>
                        <button id="button-save" style="align-self: center;" class="btn btn-info mr-2">Save</button>
                        <button id="button-back" style="align-self: center;" class="btn btn-success">Back</button>

                    </div>

                    <div class="row" id="results">

                        
                    </div>
                </section>
            </div>
        </div>
        `;

        this.results = document.querySelector('#results');
        this.points = document.querySelector('#points');
        this.buttonSave = document.querySelector('#button-save');
        this.buttonBack = document.querySelector('#button-back');

        this.buttonSave.addEventListener('click', this.handleSave.bind(this));
        this.buttonBack.addEventListener('click', () => {
            window.guess = new YouGuess();
        });
    }

    calculatePoints() {
        const total = this.props.playerState.filter(value => value.isCorrect).length;
        const points = Math.floor(total * 100 / (this.props.time / 3))
        return points;
    }

    showResults() {
        this.points.innerHTML = `${this.calculatePoints()} pts`;

        const cards = this.props.playerState.map(({ name, country, isCorrect }) => {
            return `
            <div class="col-sm-12 col-md-3 mb-3 d-flex">
                <div class="border card-body ${isCorrect ? 'border-success' : 'border-danger'}">
                    <p class="text-capitalize">${name}</p>
                    <p>${country}</p>
                    <h3 style="position: absolute; bottom: 5px;right: 25px;">${isCorrect ? '👍' : '👎'}</h3>
                </div>
            </div>
            `;
        }).join('');

        this.results.innerHTML = cards;
    }

    handleSave() {
        this.setLocalData();
        this.modal('Saved!', () => window.guess = new YouGuess());
        setTimeout(() => {


        }, 2000);
    }

    initDOMElements() {
        this.mainTitle = document.querySelector('#main-title');
        this.mainSubtitle = document.querySelector('#main-subtitle');
        this.userEmailInput = document.querySelector('#user-email-input');
        this.questionsNumber = document.querySelector('#questions-number');
        this.guessersTable = document.querySelector('#guessers-table');
        this.guessButton = document.querySelector('#guess-button');
        this.cardGuess = document.querySelector('#card-guess');
        this.cardIntro = document.querySelector('#card-intro');
        this.nameCountry = document.querySelector('#name-country');
        this.currentQuestion = document.querySelector('#current-question');
        this.spinner = document.querySelector('#spinner');
        this.timerCounter = document.querySelector('#timer-counter');
        this.genderChoice = document.querySelector('#gender-choice');
        this.labelMale = document.querySelector('#label-male');
        this.labelFemale = document.querySelector('#label-female');
        this.playNextButton = document.querySelector('#play-next');

        //start handlers
        this.guessButton.addEventListener('click', this.handleGuess.bind(this));
        this.playNextButton.addEventListener('click', this.handleNextPlay.bind(this));
        this.genderChoice.addEventListener('click', this.handleGenderChoice.bind(this));

    }

    handleGenderChoice(event) {
        // prevents double execution of event, since event comes from label
        event.preventDefault();

        //get control value given that input is inside label
        const control = event.target.control;

        if (control !== undefined) {
            this.props.genderChoice = control.value;
            this.updateGenderUI();
        }
    }

    updateGenderUI() {
        // TODO: work on this dumb logic
        if (this.props.genderChoice === '') {
            this.labelMale.classList.remove('btn-warning');
            this.labelFemale.classList.remove('btn-warning');
            this.labelMale.classList.add('btn-outline-warning');
            this.labelFemale.classList.add('btn-outline-warning');
        } else if (this.props.genderChoice === 'male') {
            this.labelFemale.classList.add('btn-outline-warning');
            this.labelMale.classList.remove('btn-outline-warning');
            this.labelFemale.classList.remove('btn-warning');
            this.labelMale.classList.add('btn-warning');
        } else if (this.props.genderChoice === 'female') {
            this.labelFemale.classList.remove('btn-outline-warning');
            this.labelMale.classList.add('btn-outline-warning');
            this.labelFemale.classList.add('btn-warning');
            this.labelMale.classList.remove('btn-warning');
        }
    }

    setTheme() {

        this.mainTitle.innerHTML = this.props.title;
        this.mainSubtitle.innerHTML = this.props.subtitle;
        this.questionsNumber.innerHTML = this.props.totalQuestions;
        document.body.style.backgroundColor = '#c4ede5';
        document.body.style.backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 2 1'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='1' gradientTransform='rotate(0,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%23c4ede5'/%3E%3Cstop offset='1' stop-color='%234fd'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='0' y1='0' x2='0' y2='1' gradientTransform='rotate(56,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%23cf8' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23cf8' stop-opacity='1'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' gradientUnits='userSpaceOnUse' x1='0' y1='0' x2='2' y2='2' gradientTransform='rotate(279,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%23cf8' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23cf8' stop-opacity='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='2' height='1'/%3E%3Cg fill-opacity='0.55'%3E%3Cpolygon fill='url(%23b)' points='0 1 0 0 2 0'/%3E%3Cpolygon fill='url(%23c)' points='2 1 2 0 0 0'/%3E%3C/g%3E%3C/svg%3E")`;
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';

    }

    async handleGuess() {
        if (this.userEmailInput.value == '') {
            this.modal('You need to insert your email');
            return;
        }

        this.spinner.classList.remove('d-none');

        try {
            const users = await this.fetch.getUsers();

            this.props.users = users;

            this.props.email = this.userEmailInput.value;
            this.cardGuess.classList.remove('d-none');
            this.cardIntro.classList.add('d-none');

            this.spinner.classList.add('d-none');

            // initializes time to calculate points
            // uses windows to stop interval anyway
            window.timer = setInterval(this.setTimer.bind(this), 1000)

            this.nextQuestion();
            this.renderQuestion();

        } catch (err) {
            this.modal('An error has occurred! Try again later!')
            this.spinner.classList.add('d-none');

        }

    }

    handleNextPlay() {

        // verify if a gender was selected
        if (!this.isGenderSelected()) {
            this.modal('Select a gender');
            return;
        }

        this.updatePlayerState()

        // verify if it's over and update player state 
        if (this.nextQuestion()) {
            // clean male/female radio options
            this.updateGenderUI();

            this.renderQuestion();

        } else {
            // render final frame
            this.cancelTimer();
            this.createResultsDOMElements();
            this.showResults();
        }

    }

    isGenderSelected() {
        return this.props.genderChoice === '' ? false : true;
    }

    nextQuestion() {
        if (!this.props.users.length) {
            return false;
        }

        // pop question from props
        this.props.question = this.props.users.pop();

        // reset actual gender choice
        this.props.genderChoice = ''

        return true;
    }

    updatePlayerState() {

        // track gender choice, name, and country
        const isCorrect = this.props.question.gender === this.props.genderChoice ? true : false;
        const state = {
            name: this.props.question.name,
            country: this.props.question.country,
            isCorrect
        }

        this.props.playerState.push(state);

    }

    renderQuestion() {

        this.currentQuestion.innerHTML = `<span class="badge badge-success">${this.getQuestionNumber()}</span>`;
        this.nameCountry.innerHTML =
            `My name is <span class="text-capitalize">${this.props.question.name}</span>, I'm from ${this.props.question.country}`;

    }

    renderEnd() {
    }

    getQuestionNumber() {
        return (this.props.totalQuestions) - this.props.users.length;
    }
}