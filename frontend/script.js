function buscarCep() {
    const cep = document.getElementById('cep').value;

    // Ajuste a regex para aceitar o formato XXXXX-XXX ou XXXXXXXX
    if (!/^\d{5}-?\d{3}$/.test(cep)) {
        alert('Por favor, insira um CEP válido no formato XXXXX-XXX ou XXXXXXXX.');
        return;
    }

    // Remove o hífen, caso exista, para enviar o CEP no formato correto ao servidor
    const formattedCep = cep.replace('-', '');

    fetch(`http://localhost:8080/cep/${formattedCep}`) // Verifique se a URL e a porta do backend estão corretas
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar o endereço');
            }
            return response.json();
        })
        .then(data => {
            const resultadoDiv = document.getElementById('resultado');
            resultadoDiv.innerHTML = `
                <p><strong>Logradouro:</strong> ${data.logradouro}</p>
                <p><strong>Bairro:</strong> ${data.bairro}</p>
                <p><strong>Cidade:</strong> ${data.localidade}</p>
                <p><strong>UF:</strong> ${data.uf}</p>
            `;
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao buscar o endereço: ' + error.message);
        });
}
