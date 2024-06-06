"use strict";

var bin = "";
var element_to_delete;

document.addEventListener("DOMContentLoaded", function() {
    
});

function confirm_del(){
    if (element_to_delete != null) {
        var index = element_to_delete.textContent.indexOf(" -");
        if (index !== -1) { // -1 jak go nie ma
            element_to_delete.textContent = element_to_delete.textContent.substring(0, index);
        }
        bin = element_to_delete.textContent;
        element_to_delete.remove();
        reset_colors();  
        modal.style.display = "none";
    }
}

function cancel_del(){
    element_to_delete.style.textDecoration = "";
    element_to_delete.style.backgroundColor = "white";  

    var index = element_to_delete.textContent.indexOf(" -");
    if (index !== -1) {
        element_to_delete.textContent = element_to_delete.textContent.substring(0, index);
    }
    element_to_delete.append(make_delete_button());
    reset_colors();

    element_to_delete = null;
    modal.style.display = "none";
}

function close_del(){
    element_to_delete.style.textDecoration = "";
    element_to_delete.style.backgroundColor = "white"; 
    reset_colors();

    element_to_delete = null;
    modal.style.display = "none";
}



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

    delete_button.addEventListener('click', function(event) {
        event.stopPropagation(); // zeby nie bylo szare jak naciskam X bo psuje w cancel button
        delete_note.call(this);
    });

    new_element.appendChild(delete_button);
}

function delete_note() {
    var modal = document.getElementById("modal");
    modal.style.display = "block";

    
    var element = this.parentElement;
    var text = element.textContent;
    console.log(text);

    var task = document.getElementById("task-text");
    task.textContent = text;

    var element = this.parentElement;
    element_to_delete = element;
    //element.remove();
    //reset_colors();  
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
    delete_button.onclick = delete_note;
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


function get_text_deletion(){

    return "test1";
}



