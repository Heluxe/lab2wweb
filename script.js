const outputEl = document.getElementById('output');

function log(msg) {
    console.log(msg);
    outputEl.textContent += msg + '\n';
}

function logSection(title) {
    const sep = '═'.repeat(60);
    log('\n' + sep);
    log('  ' + title);
    log(sep);
}

// 1
logSection('ЧАСТИНА 1: Створення об\'єктів');

const car1 = new Object();
car1.model = "Mustang";
car1.brand = "Ford";
car1.year = 2022;
car1.color = "Red";
car1.driver = new Object();
car1.driver.name = "Student";
car1.driver.category = "C";
car1.driver.personalLimitations = "Не можна їздити вночі";

car1.drive = function () {
    log("I am not driving at night");
};

log('car1 = ' + JSON.stringify(car1, null, 2));
car1.drive();
const car2 = {
    model: "Civic",
    brand: "Honda",
    year: 2021,
    color: "Blue",
    driver: {
        name: "Student",
        category: "B",
        personalLimitations: null
    },
    drive() {
        log("I can drive anytime");
    }
};

log('\ncar2 = ' + JSON.stringify(car2, null, 2));
car2.drive();

// 2
logSection('ЧАСТИНА 2: Конструктор Truck та прототипи');

function Truck(brand = "Volvo", model = "FH16", capacity = 25000) {
    this.brand = brand;
    this.model = model;
    this.capacity = capacity;
}

Truck.prototype.AssignDriver = function (name, category, experience) {
    this.driver = { name, category, experience };
};

Truck.prototype.trip = function () {
    if (!this.driver) {
        log(`Driving ${this.brand} ${this.model} — no driver assigned!`);
        return;
    }
    log(`Driving ${this.brand} ${this.model} with ${this.driver.name} at the wheel`);
};

const truck1 = new Truck();
truck1.AssignDriver("Professional Driver", "CE", 10);
log('truck1 = ' + JSON.stringify(truck1, null, 2));
truck1.trip();

const truck2 = new Truck("MAN", "TGX", 20000);
truck2.AssignDriver("Junior Driver", "C", 2);
log('\ntruck2 = ' + JSON.stringify(truck2, null, 2));
truck2.trip();

// 3
logSection('ЧАСТИНА 3: ES6 Класи та наслідування');

class Square {
    constructor(side) {
        this.side = side;
    }

    static help() {
        return "Square — фігура з 4 рівними сторонами та прямими кутами.";
    }

    length() {
        return 4 * this.side;
    }

    square() {
        return this.side ** 2;
    }

    info() {
        log(`[Square] сторона = ${this.side}, периметр = ${this.length()}, площа = ${this.square()}`);
    }
}

const sq = new Square(10);
log(Square.help());
sq.info();

class Rectangle extends Square {
    constructor(side, side2) {
        super(side);
        this.side2 = side2;
    }

    static help() {
        return "Rectangle — прямокутник з двома парами рівних сторін та прямими кутами.";
    }

    length() {
        return 2 * (this.side + this.side2);
    }

    square() {
        return this.side * this.side2;
    }

    info() {
        log(`[Rectangle] a = ${this.side}, b = ${this.side2}, периметр = ${this.length()}, площа = ${this.square()}`);
    }
}

const rect = new Rectangle(10, 20);
log('\n' + Rectangle.help());
rect.info();

class Rhombus extends Square {
    #alpha;
    #beta;

    constructor(side, alpha, beta) {
        super(side);
        this.#alpha = alpha;
        this.#beta = beta;
    }

    get alpha() { return this.#alpha; }
    set alpha(val) { this.#alpha = val; }

    get beta() { return this.#beta; }
    set beta(val) { this.#beta = val; }

    static help() {
        return "Rhombus — ромб з 4 рівними сторонами та попарно рівними кутами.";
    }

    length() {
        return 4 * this.side;
    }

    square() {
        const rad = this.#alpha * Math.PI / 180;
        return this.side ** 2 * Math.sin(rad);
    }

    info() {
        log(`[Rhombus] сторона = ${this.side}, α = ${this.#alpha}°, β = ${this.#beta}°, периметр = ${this.length()}, площа = ${this.square().toFixed(2)}`);
    }
}

const rhomb = new Rhombus(10, 60, 120);
log('\n' + Rhombus.help());
rhomb.info();

log(`  getter alpha: ${rhomb.alpha}`);
rhomb.alpha = 45;
log(`  setter alpha = 45 → нова площа = ${rhomb.square().toFixed(2)}`);
rhomb.alpha = 60;

class Parallelogram extends Rectangle {
    #alpha;
    #beta;

    constructor(a, b, alpha, beta) {
        super(a, b);
        this.#alpha = alpha;
        this.#beta = beta;
    }

    static help() {
        return "Parallelogram — паралелограм з попарно рівними та паралельними сторонами.";
    }

    length() {
        return 2 * (this.side + this.side2);
    }

    square() {
        const rad = this.#alpha * Math.PI / 180;
        return this.side * this.side2 * Math.sin(rad);
    }

    info() {
        log(`[Parallelogram] a = ${this.side}, b = ${this.side2}, α = ${this.#alpha}°, β = ${this.#beta}°, периметр = ${this.length()}, площа = ${this.square().toFixed(2)}`);
    }
}

const para = new Parallelogram(10, 15, 45, 135);
log('\n' + Parallelogram.help());
para.info();


// 4

logSection('ЧАСТИНА 4: Функції, деструктуризація, замикання');

function Triangular({ a, b, c }) {
    const perimeter = a + b + c;
    const s = perimeter / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    log(`Трикутник: a = ${a}, b = ${b}, c = ${c}`);
    log(`  Периметр = ${perimeter}`);
    log(`  Площа (формула Герона) = ${area.toFixed(2)}`);
}

Triangular({ a: 3, b: 4, c: 5 });

log('');
function PiMultiplier(number) {
    return function () {
        return number * Math.PI;
    };
}

const piTimes2 = PiMultiplier(2);
const piTimesTwoThirds = PiMultiplier(2 / 3);
const piDivideBy2 = PiMultiplier(1 / 2);

log(`PiMultiplier(2)      = ${piTimes2().toFixed(6)}`);
log(`PiMultiplier(2/3)    = ${piTimesTwoThirds().toFixed(6)}`);
log(`PiMultiplier(1/2)    = ${piDivideBy2().toFixed(6)}`);

log('');
function Painter(color) {
    return function (obj) {
        if (obj && obj.type) {
            log(`Painter: ${obj.type} пофарбовано у колір ${color}`);
        } else {
            log("No 'type' property occurred!");
        }
    };
}

const paintRed = Painter("Red");
const paintBlue = Painter("Blue");

paintRed({ type: "SUV" });
paintBlue({ type: "Sedan" });
paintRed({ id: "123" });

