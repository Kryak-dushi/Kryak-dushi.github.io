window.onload = () => {
    longestStringSet();
    FrequentSymbolSet();
}

function longestStringSet() {
    let input_btn = document.getElementById('longest_string_add');
    let arr_out = document.getElementById("longest_string_array");
    let arr = [];

    input_btn.onclick = () => {
        let input = document.getElementById('longest_string_input');
        arr[arr.length] = input.value;
        input.value = "";
        arr_out.innerHTML = `Массив: ${arr.join(', ')}`;
    }

    document.getElementById('longest_string_result_button').onclick = () => {
        document.getElementById('longest_string_result').innerHTML = `Результат: ${longestString(arr)}`;
    }
}

function longestString(array) {
    let max = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i].length > max.length) max = array[i];
    }
    return max;
}

function FrequentSymbolSet() {
    document.getElementById("frequent_symbol_result_button").onclick = () => {
        let char = FrequentSymbol(document.getElementById("frequent_symbol_input").value);
        document.getElementById("frequent_symbol_result").innerText = `Самый частый символ: ${char}`;
    }
}

function FrequentSymbol(str) {
    var max = 0,
        maxChar = '';
    str.split('').forEach(function (char) {
        if (str.split(char).length > max) {
            max = str.split(char).length;
            maxChar = char;
        }
    });
    return maxChar;
}

function FrequentSymbolReplacementSet() {
    let str = document.getElementById("symbol_replacement_input_string").value;
    let char_rep = document.getElementById("symbol_replacement_input_symbol").value;
    let maxChar = FrequentSymbol(str);

    if (str != '') {
        str = str.split(maxChar).join(char_rep[0]);
        document.getElementById("symbol_replacement_result").innerText = str;
    } else document.getElementById("symbol_replacement_result").innerText = "Строка пустая"
}

function Anagram() {
    let str1 = document.getElementById("anagram_input_1").value;
    let str2 = document.getElementById("anagram_input_2").value;

    if (str1.toLowerCase().split('').sort().join('').trim() === str2.toLowerCase().split('').sort().join('').trim()) {
        document.getElementById("anagram_result").innerHTML = "Являются анаграммами";
    } else document.getElementById("anagram_result").innerHTML = "Не являются анаграммами";

}