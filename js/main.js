let elBody = document.querySelector(".tBody")
let elTemplate = document.querySelector(".template").content;
let elForm = document.querySelector(".form");
let elNomi = document.querySelector("#nomi")
let elEditNomi = document.querySelector("#edit-nomi")
let elSotuvchi = document.querySelector("#sotuvchi")
let elEditSotuvchi = document.querySelector("#edit-sotuvchi")
let elRangi = document.querySelector("#rangi")
let elEditRangi = document.querySelector("#edit-rangi")
let elRam = document.querySelector("#ram")
let elEditRam = document.querySelector("#edit-ram")
let elXotira = document.querySelector("#xotira")
let elEditXotira = document.querySelector("#edit-xotira")
let elNarx = document.querySelector("#narxi")
let elEditNarx = document.querySelector("#edit-narxi")
let elEditForm = document.querySelector("#edit-form")

elForm.addEventListener("submit", function (evt) {
    evt.preventDefault();

    (
        async function () {
            let responce = await fetch("http://localhost:3000/Phones", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Name: elNomi.value.trim(),
                    Sotuvchi: elSotuvchi.value.trim(),
                    Rangi: elRangi.value.trim(),
                    Ram: elRam.value.trim() - 0,
                    Xotira: elXotira.value.trim() - 0,
                    Narx: elNarx.value.trim() - 0
                })
            })

            try {
                if (responce.ok) {
                    let data = await responce.json()
                }
            } catch (error) {
                alert(error)
            }
        }
    )()

});

(
    async function () {
        let responce = await fetch("http://localhost:3000/Phones")
        try {
            if (responce.ok) {
                let data = await responce.json()
                renderPhones(data, elBody)
            }
        } catch (error) {
            alert(error)
        }
    }
)()


function renderPhones(phone, list) {
    list.innerHTML = null
    let count = 0
    let fragment = document.createDocumentFragment()

    phone.map(item => {
        let templateDiv = elTemplate.cloneNode(true)

        templateDiv.querySelector(".id").textContent = count += 1,
            templateDiv.querySelector(".name").textContent = item.Name
        templateDiv.querySelector(".surName").textContent = item.Sotuvchi
        templateDiv.querySelector(".rangi").textContent = item.Rangi
        templateDiv.querySelector(".ram").textContent = item.Ram
        templateDiv.querySelector(".memory").textContent = item.Xotira
        templateDiv.querySelector(".price").textContent = item.Narx
        templateDiv.querySelector("#delete-btn").dataset.deletePhone = item.id
        templateDiv.querySelector("#edit-btn").dataset.editPhone = item.id


        fragment.appendChild(templateDiv)
    })

    list.appendChild(fragment)
}


elBody.addEventListener("click", function (evt) {

    let findBtn = evt.target.dataset.deletePhone
    let findEditBtn = evt.target.dataset.editPhone

    if (findBtn) {
        (
            async function () {
                let responce = await fetch(`http://localhost:3000/Phones/${findBtn}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: findBtn
                    })
                })
            }
        )()
    }

    if (findEditBtn) {
        (
            async function () {
                let responce = await fetch(`http://localhost:3000/Phones/${findEditBtn}`)
                try {
                    if (responce.ok) {
                        let data = await responce.json()
                        elEditNomi.value = data.Name
                        elEditSotuvchi.value = data.Sotuvchi
                        elEditRangi.value = data.Rangi
                        elEditRam.value = data.Ram
                        elEditXotira.value = data.Xotira
                        elEditNarx.value = data.Narx
                    }
                } catch (error) {
                    alert(error)
                }
            }
        )()
    }

})
elForm.addEventListener("submit", function (evt) {
    evt.preventDefault();

    (
        async function () {
            let responce = await fetch("http://localhost:3000/Phones", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Name: elEditNomi.value.trim(),
                    Sotuvchi: elEditSotuvchi.value.trim(),
                    Rangi: elEditRangi.value.trim(),
                    Ram: elEditRam.value.trim() - 0,
                    Xotira: elEditXotira.value.trim() - 0,
                    Narx: elEditNarx.value.trim() - 0
                })
            })

            try {
                if (responce.ok) {
                    let data = await responce.json()
                }
            } catch (error) {
                alert(error)
            }
        }
    )()

});