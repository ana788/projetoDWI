let selected = 'carros'

const abrirModal = (idModal) => {
    const divModal = document.querySelector(idModal)
    divModal.style.display = 'flex'
}

const fecharModal = (idModal) => {
    const divModal = document.querySelector(idModal)
    divModal.style.display = 'none'
}

const CarregarPagina = async (event) => {
    try {
        const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas`)
        const data = await response.json() //transforma a resposta JSON em objeto

        for (let i = 0; i < data.length; i++) {
            const nomeMarca = data[i]["nome"]

            const newCard =
                `<div class="card">
                    <img class="close" onclick="removeCard(event)" src="/img/fechar-simbolo-de-botao-circular.png">
                    <h2>${nomeMarca}</h2>
                </div>
                `

            const cardsList = document.querySelector("#cards-list")
            cardsList.innerHTML = cardsList.innerHTML + newCard
            addEventsListeners()
        }
    } catch (error) {
        alert(error)
    }
}

const AdicionarCard = async (event) => {
    event.preventDefault()//impede que o form seja enviado
    const cardsList = document.querySelector("#cards-list")
    cardsList.innerHTML = ''
    const marca = event.target.marca.value
    console.log(marca)

    try {
        const response = await fetch(`https://parallelum.com.br/fipe/api/v1/${selected}/marcas`)
        const data = await response.json() //transforma a resposta JSON em objeto
        console.log(data)
        console.log(data.length)
        for (let i = 0; i < data.length; i++) {
            const nomeMarca = data[i]["nome"]
            const codigoMarca = data[i]["codigo"]
            //ver se o nome digitado pelo usuario tem no objeto retornado pela API (por meio de um for)
            //se achar o nome pega o valor do codigo
            if (nomeMarca == marca) { //PROBLEMA DE Case Sensitive na hora da busca! Ver depois
                console.log(nomeMarca)
                console.log(codigoMarca)
                const response = await fetch(`https://parallelum.com.br/fipe/api/v1/${selected}/marcas/${codigoMarca}/modelos`)
                const data = await response.json()

                console.log(data)
                console.log(data.modelos.length)

                for (let a = 0; a < data.modelos.length; a++) {
                    const nomeModelo = data["modelos"][a]["nome"]
                    console.log(nomeModelo)

                    const newCard =
                        `<div class="card">
                        <img class="close" onclick="removeCard(event)" src="/img/fechar-simbolo-de-botao-circular.png">
                        <h2>${nomeModelo}</h2>
                        </div>
                        `

                    cardsList.innerHTML = cardsList.innerHTML + newCard
                    addEventsListeners()
                    fecharModal('#addCard')
                }

            }
        }

    

    } catch (error) {
        alert(error)
    }

}

const editarCard = async (event) => {
    event.preventDefault()
    const cardsList = document.querySelector("#cards-list")
    cardsList.innerHTML = ''
    selected = document.querySelector('input[name="veiculos"]:checked').value
    //console.log(selected)

    try {
        const response = await fetch(`https://parallelum.com.br/fipe/api/v1/${selected}/marcas`)
        const data = await response.json() //transforma a resposta JSON em objeto

        for (let i = 0; i < data.length; i++) {
            const nomeMarca = data[i]["nome"]

            const newCard =
                `<div class="card">
                    <img class="close" onclick="removeCard(event)" src="/img/fechar-simbolo-de-botao-circular.png">
                    <h2>${nomeMarca}</h2>
                </div>
                `

            cardsList.innerHTML = cardsList.innerHTML + newCard
            addEventsListeners()
            fecharModal('#editarMarcas')
        }
    } catch (error) {
        alert(error)
    }

}

const removeCard = (event) => {
    const btnClose = event.target
    console.log(btnClose)
    const card = btnClose.closest('.card')
    card.remove()
}

const addEventsListeners = () => {
    const cards = document.querySelectorAll(".card")
    cards.forEach((card) => {
        card.addEventListener("mouseenter", handleMouseEnter)
        card.addEventListener("mouseleave", handleMouseLeave)
    })
}

const handleMouseEnter = (event) => {
    const card1 = event.target
    card1.style.transform = "scale(1.13, 1.13)"
    card1.style.backgroundColor = "#00996D"
    card1.style.boxShadow = "0 5px 15px 0 rgba(0,0,0,0.3)"

}

const handleMouseLeave = (event) => {
    const card1 = event.target
    card1.style.transform = "none"
    card1.style.backgroundColor = "#004C34"
    card1.style.boxShadow = "0 1px 2px 0 rgba(0,0,0,0.1)"

}

CarregarPagina(onload)
addEventsListeners()

