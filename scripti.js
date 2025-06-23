function calcularBiotipo() {
    const estruturaOssea = document.getElementById("estruturaOssea").value;
    const tendenciaCorporal = document.getElementById("tendenciaCorporal").value;
    const aparenciaHomens = document.getElementById("aparenciaHomens").value;
    const aparenciaMulheres = document.getElementById("aparenciaMulheres").value;
    const infancia = document.getElementById("infancia").value;

    let biotipo = "Indefinido";

    // Analisando as respostas para determinar o biotipo
    if (estruturaOssea === "bem-larga") {
        biotipo = "Endomorfo";
    } else if (estruturaOssea === "larga-e-media") {
        biotipo = "Mesomorfo";
    } else if (estruturaOssea === "pequena") {
        biotipo = "Ectomorfo";
    }

    // Determinar o biotipo com base na tendência corporal
    if (tendenciaCorporal === "armazenar-gordura") {
        biotipo += " (Tende a ganhar gordura)";
    } else if (tendenciaCorporal === "magro-e-musculoso") {
        biotipo += " (Tende a ser muscular)";
    } else if (tendenciaCorporal === "sempre-bem-magro") {
        biotipo += " (Tende a ser magro)";
    }

    // Montando a mensagem final com base na aparência
    let mensagemAdicional = `Aparência: ${aparenciaHomens || aparenciaMulheres ? (aparenciaHomens || aparenciaMulheres) : "Não especificado"}\n`;
    mensagemAdicional += `Quando criança eu era: ${infancia}\n`;

    // Exibir o resultado
    document.getElementById("resultadoBiotipo").textContent = `Seu biotipo é: ${biotipo}\n` + mensagemAdicional;
}