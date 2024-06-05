"use strict";

var bin = "";


function add_new_note() {
    var tekst_pola = document.getElementById('input_field1').value;
    if (tekst_pola === "") {
        alert("Puste pole tekstowe");
        return 0;
    }

    var element = document.createElement("li");
    var text_elementu = document.createTextNode(tekst_pola);
    element.append(text_elementu);
    element.addEventListener('click', mark_as_done);
    document.getElementById("note_list").appendChild(element);

    var note_list = document.getElementById("note_list");
    var elements_from_list = note_list.getElementsByTagName("li");
    var new_element = elements_from_list[elements_from_list.length - 1];


    var delete_button = make_delete_button();

    new_element.appendChild(delete_button);
}

function usun_element() {
    var element = this.parentElement;
    bin = element.textContent;
    element.remove();
    reset_colors();  
}



function mark_as_done() {
    if (this.style.textDecoration === "") {
        this.style.textDecoration = "line-through";
        this.style.backgroundColor = "grey";
        var today = new Date().toDateString();
        this.textContent += " -" + today;
        this.append(make_delete_button());
    } else {
        this.style.textDecoration = "";
        this.style.backgroundColor = "white";  

        var index = this.textContent.indexOf(" -");
        if (index !== -1) {
            this.textContent = this.textContent.substring(0, index);
        }
        this.append(make_delete_button());
        reset_colors();  
    }
}

function make_delete_button() {
    var delete_button = document.createElement("span");


    delete_button.style.backgroundImage = "url('assets/remove.png')";
    delete_button.style.backgroundSize = "32px 34px";
    delete_button.style.backgroundRepeat = "no-repeat";
    delete_button.style.backgroundPosition = "center";

    var div_for_button = document.createElement("div");
    delete_button.style.width = "44px";
    delete_button.style.height = "44px";

    delete_button.className = "delete_button";
    delete_button.onclick = usun_element;
    delete_button.appendChild(div_for_button);

    return delete_button;
}


function reset_colors() {
    var note_list = document.getElementById("note_list");
    var elements_from_lists = note_list.getElementsByTagName("li");
    for (var i = 0; i < elements_from_lists.length; i++) {
        var color;
        if (elements_from_lists[i].style.backgroundColor !== "grey"){
            if (i % 2 === 0){
                color = "#b9e7f3";
            } else {
                color = "#9fe2f3";
            }
            elements_from_lists[i].style.background = color;
        }
    }
}

document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.key === 'z') {
        restore_from_bin();
    }
});

function restore_from_bin() {
    if (bin === ""){
        alert("kosz jest pusty");
        return;
    }
    var element = document.createElement("li");
    var text_elementu = document.createTextNode(bin);
    element.append(text_elementu);
    element.addEventListener('click', mark_as_done);
    document.getElementById("note_list").appendChild(element);

    var note_list = document.getElementById("note_list");
    var elements_from_list = note_list.getElementsByTagName("li");
    var new_element = elements_from_list[elements_from_list.length - 1];


    var delete_button = make_delete_button();

    new_element.appendChild(delete_button);
    bin = "";
}