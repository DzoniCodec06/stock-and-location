const timeEl = document.getElementById("time");

const updateTime = () => {
    const date = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const time = date.toLocaleTimeString();
    const day = date.toLocaleDateString(undefined, options);

    //console.log(day);

    timeEl.innerHTML = `${day}, ${time}`;
}
updateTime();
const interval = setInterval(updateTime, 1000);

const editButtons = document.querySelectorAll("#edit");

const editField = document.getElementById("editField");
const searchBar = document.getElementById("searchBar");
const containers = document.getElementById("cntrs");

const closeBtn = document.getElementById("close");

let clicked = false;

editButtons.forEach(editBtn => {
    editBtn.addEventListener("click", e => {
        if (!clicked) {
            clicked = true;
            searchBar.classList.replace("search-bar", "search-bar-false");
            containers.classList.replace("containers", "containers-false");
            editField.classList.replace("edit-field-false", "edit-field");
        }
        console.log(e.value);
    });
})

closeBtn.addEventListener("click", () => {
    if (clicked) {
        clicked = false;
        editField.classList.replace("edit-field", "edit-field-false");
        searchBar.classList.replace("search-bar-false", "search-bar");
        containers.classList.replace("containers-false", "containers");
    }
})

const submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", e => {
    e.preventDefault();
})

const searchInput = document.getElementById("search");

document.addEventListener("keypress", e => {
    if (e.key == "Enter") {
        if (searchInput.value != "") {
            let button = document.querySelector(`.b${searchInput.value}`);
            searchInput.value = "";
            button.style.backgroundColor = "green";
            setTimeout(() => {
                button.style.backgroundColor = "#D9D9D9";
            }, 500);
            setTimeout(() => {
                button.style.backgroundColor = "green";
            }, 1000);
            setTimeout(() => {
                button.style.backgroundColor = "#D9D9D9";
            }, 1500);
            setTimeout(() => {
                button.style.backgroundColor = "green";
            }, 2000);
            setTimeout(() => {
                button.style.backgroundColor = "#D9D9D9";
            }, 2500);
        }
        else return;
    }
})