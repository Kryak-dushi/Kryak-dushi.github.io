window.onload = () => {
    showFilms();
}

window.addEventListener('load', function () {
    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
}, false);

class FilmCard {
    constructor(filmName, country, genre, director, plot, producer, operator, composer, budget, proceed, ageRestrictions, duration, date, poster, id, comments) {
        this.filmName = filmName;
        this.country = country;
        this.genre = genre;
        this.director = director;
        this.plot = plot;
        this.producer = producer;
        this.operator = operator;
        this.composer = composer;
        this.budget = budget;
        this.proceed = proceed;
        this.ageRestrictions = ageRestrictions;
        this.duration = duration;
        this.date = (date != "" && date !== undefined) ? new Date(date) : "";
        this.poster = poster;
        this.id = id;
        this.comments = comments
    }

    showFilmCard() {
        let container_films = document.getElementById("container_films");

        let container_card = document.createElement("div");
        container_card.classList.add("filmcard_container");
        container_films.append(container_card);

        let poster = document.createElement("img");
        poster.src = this.poster;
        poster.classList.add("film_poster");
        container_card.append(poster);

        let div = document.createElement("div");
        div.classList.add("row_block");

        let name = document.createElement("h1");
        name.innerHTML = `"${this.filmName}"`;
        div.append(name);

        let del_btn = document.createElement("button");
        del_btn.classList.add("delete_button");
        del_btn.onclick = () => { deleteFilm(this.id); }
        div.append(del_btn);
        container_card.append(div);

        let table = document.createElement("table");
        table.classList.add("film_info");
        container_card.append(table);

        function render(obj) {
            const { val, title } = obj;

            if (val != "" && val !== undefined) {
                let tr = document.createElement("tr");

                let td_title = document.createElement("td");
                td_title.innerHTML = title;
                td_title.classList.add("film_info_title");

                let td_value = document.createElement("td");
                td_value.innerHTML = val;

                tr.append(td_title, td_value);
                table.append(tr);
            }
        }

        let table_data = [
            {
                val: this.country,
                title: "Страна"
            },
            {
                val: this.genre,
                title: "Жанр"
            },
            {
                val: this.plot,
                title: "Описание"
            },
            {
                val: this.director,
                title: "Режиссёр"
            },
            {
                val: this.producer,
                title: "Продюсер"
            },
            {
                val: this.operator,
                title: "Оператор"
            },
            {
                val: this.composer,
                title: "Композитор"
            },
            {
                val: (this.budget != "" && this.budget !== undefined) ? '$ ' + this.budget : "",
                title: "Бюджет"
            },
            {
                val: (this.proceed != "" && this.proceed !== undefined) ? '$ ' + this.proceed : "",
                title: "Мировые сборы"
            },
            {
                val: (this.ageRestrictions != "" && this.ageRestrictions !== undefined) ? this.ageRestrictions + "+" : "",
                title: "Возрастное ограничение"
            },
            {
                val: (this.date != "" && this.date !== undefined) ? this.date.getFullYear() : "",
                title: "Год выхода"
            },
            {
                val: (this.duration != "" && this.duration !== undefined) ? this.duration + " минут" : "",
                title: "Длительность"
            }
        ]

        table_data.forEach(elem => { render(elem); })

        let com_btn = document.createElement("button");
        com_btn.classList.add("btn", "btn-primary", "btn-lg", "button");
        com_btn.innerHTML = "Добавить отзыв";
        com_btn.setAttribute("data-toggle", "modal");
        com_btn.setAttribute("data-target", "#exampleModalCenter");
        com_btn.onclick = () => { addCommentShowBlock(this.id); }
        container_films.append(com_btn);

        if (this.comments.length > 0) {
            this.comments.forEach(element => {
                let container_comment = document.createElement("div");
                container_comment.classList.add("comment_container");

                let author = document.createElement("h3");
                author.innerHTML = element.author;

                let text = document.createElement("p");
                text.classList.add("comment_text");
                text.innerHTML = element.text;

                let rating = document.createElement("div");
                rating.classList.add("row_block");

                for (let i = 0; i < element.rate; i++) {
                    let rate = document.createElement("div");
                    rate.classList.add("rate");
                    rating.append(rate);
                }

                for (let i = element.rate; i < 5; i++) {
                    let rate = document.createElement("div");
                    rate.classList.add("rate_bg");
                    rating.append(rate);
                }

                container_comment.append(author, text, rating);
                container_films.append(container_comment);

                let del_btn = document.createElement("button");
                del_btn.classList.add("delete_button");
                del_btn.onclick = () => { element.deleteComment(); }
                container_comment.append(del_btn);
            })
        }
    }
}

class Comment {
    constructor(author, text, rate) {
        this.author = author;
        this.text = text;
        this.rate = rate;
    }

    deleteComment() {
        if (localStorage.getItem("arr") !== undefined && localStorage.getItem("arr") !== null) {
            window.arr = JSON.parse(localStorage.getItem("arr"));
            let tmp = window.arr.find(function (element, index, array) {
                for (let i = 0; i < element.comments.length; i++) {
                    if (element.comments[i].author == this.author && element.comments[i].text == this.text && element.comments[i].rate == this.rate) return element;
                }
            }, this);

            if (tmp != -1) {
                let ind = tmp.comments.findIndex(function (element, index, array) {
                    if (element.author == this.author && element.text == this.text && element.rate == this.rate) return element;
                }, this)

                if (ind != -1) {
                    tmp.comments.splice(ind, 1);
                }
            }

            localStorage.setItem("arr", JSON.stringify(window.arr));
            location.reload();
        }
    }
}

var arr = [];
var index = 0;

document.getElementById("add_film_btn").onclick = () => {
    document.getElementById("form_film").style.display = "block";
    document.getElementById("add_film_btn").style.display = "none";
}

document.getElementById("add_film_info_btn").onclick = () => {
    let form = document.getElementById("form_film");

    if (checkValid(form) === true) {
        addFilm();
        closeAddingFilmBlock();
    }
}

function checkValid(form) {
    let inputs = form.querySelectorAll('form > div > div > input');
    let flag = true;

    inputs.forEach(elem => {
        flag = flag && elem.checkValidity();
    })
    return flag;
}

function addFilm() {
    let data_in = document.querySelectorAll('#form_film > div > div > input, #form_film > div > div > textarea');
    let data = [];

    for (let i = 0; i < data_in.length; i++) {
        data[i] = data_in[i].value.trim();
    }

    if (localStorage.getItem("index") !== undefined && localStorage.getItem("index") !== null) {
        index = localStorage.getItem("index");
        index++;
    } else index = 1;
    localStorage.setItem("index", index);

    if (localStorage.getItem("arr") !== undefined && localStorage.getItem("arr") !== null) {
        window.arr = JSON.parse(localStorage.getItem("arr"));
    }
    window.arr.push(new FilmCard(data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7], data[8], data[9], data[10], data[11], data[12], data[13], localStorage.getItem("index"), []));
    localStorage.setItem("arr", JSON.stringify(window.arr));
    window.arr[window.arr.length - 1].showFilmCard();

    for (let i = 0; i < data_in.length; i++) {
        data_in[i].value = "";
    }
}

function closeAddingFilmBlock() {
    document.getElementById("form_film").style.display = "none";
    document.getElementById("add_film_btn").style.display = "block";
}

function showFilms() {
    if (localStorage.getItem("arr") !== undefined && localStorage.getItem("arr") !== null) {
        window.arr = JSON.parse(localStorage.getItem("arr"));
        window.arr.forEach((element) => {
            getFilmCardFromObj(element).showFilmCard();
        })
    }
}

function getFilmCardFromObj(obj) {
    let { filmName, country, genre, director, plot, producer, operator, composer, budget, proceed, ageRestrictions, duration, date, poster, id, comments } = obj;
    let commets_obj = [];

    comments.forEach(elem => {
        let { author, text, rate } = elem;
        commets_obj.push(new Comment(author, text, rate));
    })
    return new FilmCard(filmName, country, genre, director, plot, producer, operator, composer, budget, proceed, ageRestrictions, duration, date, poster, id, commets_obj);
}

function deleteFilm(id) {
    if (localStorage.getItem("arr") !== undefined && localStorage.getItem("arr") !== null) {
        window.arr = JSON.parse(localStorage.getItem("arr"));
        let tmp = window.arr.findIndex(function (element, index, array) { if (element.id == id) return index; });

        if (tmp != -1) {
            window.arr.splice(tmp, 1);
        }

        localStorage.setItem("arr", JSON.stringify(window.arr));
        location.reload();
    }
}

function addCommentShowBlock(id) {
    let form = document.querySelector("#form_comment");

    document.getElementById("add_comment_btn").onclick = () => {
        if (checkValid(form) === true) {
            addComment(id, form);
        }
    }
}

function addComment(id, form) {
    let com_data = form.querySelectorAll('form > div > div > input');

    if (localStorage.getItem("arr") != undefined) {
        window.arr = JSON.parse(localStorage.getItem("arr"));
        elem = window.arr.find(function (element, index, array) { if (element.id == id) return element; });
        elem.comments.push(new Comment(com_data[0].value, com_data[1].value, com_data[2].value));
        localStorage.setItem("arr", JSON.stringify(window.arr));
    }
}

document.getElementById("filter_films_btn").onclick = () => {
    document.getElementById("filter_films").style.display = "block";
}

document.getElementById("filter_films_info_btn").onclick = () => {
    let chosen = document.getElementById("inlineFormCustomSelect").options.selectedIndex;
    let val = document.getElementById("inputText9").value;
    let container = document.getElementById("container_films");

    container.innerHTML = "";
    filterFilms(chosen, val).forEach((element) => {
        getFilmCardFromObj(element).showFilmCard();
    });
}

function filterFilms(chosen, val) {
    window.arr = JSON.parse(localStorage.getItem("arr"));
    let arr_filtered = [];
    let atrs = [
        {
            value_ch: 0,
            field: 'country'
        },
        {
            value_ch: 1,
            field: 'genre'
        },
        {
            value_ch: 2,
            field: 'date'
        }
    ]
    let propertyName = atrs.find(function (element, index, array) { if (element.value_ch == chosen) return element; }).field;

    window.arr.forEach(element => {
        if (element[propertyName].toLowerCase().includes(`${val}`.toLowerCase())) {
            arr_filtered.push(getFilmCardFromObj(element));
        }
    })

    return arr_filtered;
}