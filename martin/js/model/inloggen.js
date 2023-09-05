/**
 * DataBaseManager class
 *
 * Klasse voor het bijhouden van onze database
 *
 */
class DataBaseManager {
    /**
     * Array van User objecten.
     */
    users;
    /**
     * Als er iemand ingelogd is, wordt dat hiermee aangegeven. De username van de User
     * staat hier dan vermeld.
     */
    currentLoggedIn;
    /**
     * constructor
     * Maakt de lege lijst van users en roept getUsers aan om bestaande users van localStorage
     * in te lezen. Het converteren van en naar JSON strings gebeurt hier in de klasse.
     *
     * Er wordt gebruik gemaakt van de klasse User (onder deze klasse beaschreven) om één en
     * ander te vereenvoudigen en te abstraheren.
     */
    constructor() {
        this.users = [];
        this.getUsers();
    }

    /**
     * getUsers
     * Haalt de users binnen van localStorage.
     */
    getUsers() {
        let users = JSON.parse(localStorage.getItem("users"));
        if (!users) this.users = [];
        else {
            this.users.splice(0, 0, ...users);
        }
    }

    /**
     * saveUsers
     * Schrijft de users lijst in de localStorage.
     */
    saveUsers() {
        const stringifiedUsers = JSON.stringify(this.users);
        localStorage.setItem("users", stringifiedUsers);
    }

    /**
     * findUser
     * Kijkt of een username bestaat in de lijst met users. Als deze bestaat wordt de index in de array
     * geretourneerd. Anders een false.
     * @param {string} username Naam waarop gezocht moet worden
     * @returns {boolean|number} index van de user of false
     */
    findUser(username) {
        const idx = this.users.findIndex((u) => u.username === username);
        return idx === -1 ? false : idx;
    }

    /**
     * verifyUser
     * Kijkt of de username in de array van users zit en of het passwoord dan ook klopt met de
     * user in de lijst.
     *
     * @param {string} username
     * @param {string} password
     * @returns {boolean} Of de username klopt met het paswoord
     */
    verifyUser(username, password) {
        const idx = this.findUser(username);
        if (idx !== false && idx > -1) {
            return (
                this.users[idx].username === username &&
                this.users[idx].password === password
            );
        }
    }

    /**
     * addUser
     * voegt een user toe aan de lijst met users.
     * @param {string} username
     * @param {string} password
     */
    addUser(username, password) {
        const newUser = new User(username, password);
        const idx = this.findUser(newUser.getUsername());
        if (idx === false) {
            this.users.push(newUser);
            this.saveUsers();
        }
    }

    /**
     * removeUser
     * Haalt een gebruiker weg uit de lijst.
     *
     * @param {string} username
     * @returns {boolean} true als het gelukt is. Anders false.
     */
    removeUser(username) {
        const idx = this.findUser(username);
        if (idx) {
            this.users.splice(idx, 1);
            this.saveUsers();
            return true;
        } else {
            return false;
        }
    }

    /**
     * setCurrentLoggedIn
     *
     * @param {string} username Naam die als currentLoggedInUser moet worden gezet.
     */
    setCurrentLoggedIn(username) {
        this.currentLoggedIn = username;
        localStorage.setItem('currentLoggedIn', username)
    }

    /**
     * getCurrentloggedIn
     * haalt de username van degene die op dit moment is ingelogd.
     * Anders false
     * @return {string|boolean} Username of false
     */
    getCurrentLoggedIn() {
        const current = localStorage.getItem('currentLoggedIn');
        if (current) {
            this.currentLoggedIn = current;
            return current;
        }
        else return false;
    }
}

/**
 * Class User
 * Een klasse om de gegevens van de user bij te houden.
 */
class User {
    /**
     * username van de gebruiker
     */
    username;
    /**
     * passwoord van de gebruiker.
     * TODO zo maken dat er alleen een MD5 waarde wordt gebruikt en daarop wordt gechecked.
     */
    password;
    /**
     * waanneer de gebruiker gecreeeerd werd
     */
    created;
    /**
     * de instelling voor het snake spel. Kan bewaard worden.
     */
    nrOfFoods;
    /**
     * de highscore in snake
     */
    highscore;
    /**
     * wanneer de highscore behaald werd
     */
    dateOfHighscore;
    /**
     * houdt bij hoe vaak een user gewonnen dan wel verloren heeft. En wanneer dit voor het laatste
     * geregitreerd is. (lastUpdated)
     */
    winsLosses;

    /**
     * Hiermee wordt een nieuwe user aangemaakt.
     * Standaard wordt de highscore op 0 gezet en nrOfFoods op 15.
     * @param {string} username Username
     * @param {string} password Paswoord
     */
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.created = new Date();
        this.nrOfFoods = 15;
        this.highscore = 0;
        this.dateOfHighscore = "";
        this.winsLosses = {
            wins: 0,
            losses: 0,
            lastUpdated: ''
        }
    }

    /**
     * valideert of het opgegeven wachtwoord klopt met het wachtwoord van de user
     * @param {string} password Wachtwoord dat gechecked moet worden.
     * @return {boolean} Of het opgegeven wachtwoord klopt met die van de User.
     */
    checkPassword(password) {
        return this.password === password;
    }

    /**
     * getUsername
     * geeft de username van dit User object
     * @return {string}
     */
    getUsername() {
        return this.username;
    }

    /**
     * getNrOfFoods
     * getter voor de nrOfFoods
     * @return {number} waarde waarop nrOfFoods ingesteld is
     */
    getNrOfFoods() {
        return this.nrOfFoods;
    }

    /**
     * setNrOfFoods
     * setter voor nrOfFoods
     * @param {number} nr waarde die nrOfFoods moet krijgen
     */
    setNrOfFoods(nr) {
        this.nrOfFoods = nr;
    }

    /**
     *
     */
    getWinsLosses() {}

    setWinsLosses(){}

    /**
     * getHighscore
     * getter voor highscore. Haalt de highscore op en de datum waarop deze werd behaald.
     * @return {object} waarde die highscore heeft {score: number, date: date}
     */
    getHighscore() {
        return this.highscore;
    }

    /**
     * setHighscore
     * setter voor highscore. Zet de waarde van highscore. Object met score en date
     * @param {object} highscore {score: number, date: date}
     */
    setHighscore(highscore) {
        this.highscore = highscore;
        this.dateOfHighscore = new Date();
    }
}

export { DataBaseManager, User };