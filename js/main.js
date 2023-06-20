const abrirModal = (idModal) => {
    const divModal = document.querySelector(idModal)
    divModal.style.display = 'flex'
}

const fecharModal = (idModal) => {
    const divModal = document.querySelector(idModal)
    divModal.style.display = 'none'
}

const AdicionarCard = async (event) => {
    event.preventDefault()//impede que o form seja enviado
    const marca = event.target.marca.value
    console.log(marca)

    try {
        const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas`)
        const data = await response.json() //transforma a resposta JSON em objeto
        console.log(data)
        console.log(data.length)
        for (let i = 0; i < data.length; i++) {
            const nomeMarca = data[i]["nome"]
            //ver se o nome digitado pelo usuario tem no objeto retornado pela API (por meio de um for)
            //se achar o nome pega o valor do codigo

            const newCard =
                `<div class="card">
                <img class="close" onclick="fecharModal('.card')" src="/img/fechar-simbolo-de-botao-circular.png">
                <h2>${nomeMarca}</h2>
                </div>
                `

            const cardsList = document.querySelector("#cards-list")
            cardsList.innerHTML = cardsList.innerHTML + newCard
        }

    } catch (error) {
        alert(error)
    }

}