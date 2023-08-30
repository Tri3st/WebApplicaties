const   R        = 10,          // straal van een element
        STEP     = 2*R,         // stapgrootte
        LEFT     = "left",        // bewegingsrichtingen
        RIGHT    = "right",
        UP       = "up",
        DOWN     = "down",

        XMIN     = R,           // minimale x waarde
        YMIN     = R,           // minimale y waarde

        SLEEPTIME = 500,        // aantal milliseconde voor de timer

        SNAKE   = "DarkRed" ,    // kleur van een slangsegment
        FOOD    = "Olive",       // kleur van voedsel
        HEAD    = "DarkOrange",  // kleur van de kop van de slang
        CURRENTLOGGEDIN = 'currentLoggedIn', // de huidig ingelogde gebruiker (in localStorage)
        ALLUSERS = 'all_users',  // wordt ook gebruikt in inloggen.js
        DBNAME = 'MyTestDB';     // idem


const USERMODEL = {
      username: '',
      password: '',
      userData: {
        nrOfFoods: -1,
        highScore: -1,
        dateOfHighScore: '',
    }
};

export {
    R,
    STEP,
    LEFT,
    RIGHT,
    UP,
    DOWN,
    XMIN,
    YMIN,
    SLEEPTIME,
    SNAKE,
    FOOD,
    HEAD,
    CURRENTLOGGEDIN,
    ALLUSERS,
    USERMODEL,
    DBNAME
};