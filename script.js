btn.addEventListener('click', completa);
btn2.addEventListener('click', completaFiXi);
calcula.addEventListener('click', calcular);

function completa() {
    if (li1.value === "" || ls1.value === ""){
        alert("É preciso preencher ao menos os limites inferior e superior da primeira classe!");
    } else {
        var limi1 = parseFloat(li1.value);
        var lims1 = parseFloat(ls1.value);
        var h = lims1 - limi1;

        li2.value = lims1;
        ls2.value = (lims1 + h);
        li3.value = parseFloat(ls2.value);
        ls3.value = parseFloat(li3.value) + h;
        li4.value = parseFloat(ls3.value);
        ls4.value = parseFloat(li4.value) + h;
        li5.value = parseFloat(ls4.value);
        ls5.value = parseFloat(li5.value) + h;
    }
}

function completaFiXi() {
    console.log("completaFiXi");
    if (fi1.value === "" && fi5.value === "" && Fac1.value === "" && Fac5.value === ""){
        alert("É preciso completar pelo menos uma das colunas!");
    } else if (fi1.value !== "" && fi2.value !== "" && fi3.value !== "" && fi4.value !== "" && fi5.value !== "") {
        Fac1.value = parseFloat(fi1.value);
        Fac2.value = parseFloat(fi2.value) + parseFloat(Fac1.value);
        Fac3.value = parseFloat(fi3.value) + parseFloat(Fac2.value);
        Fac4.value = parseFloat(fi4.value) + parseFloat(Fac3.value);
        Fac5.value = parseFloat(fi5.value) + parseFloat(Fac4.value);
    } else if (Fac1.value !== "" && Fac2.value !== "" && Fac3.value !== "" && Fac4.value !== "" && Fac5.value !== "") {
        fi1.value = parseFloat(Fac1.value);
        fi2.value = parseFloat(Fac2.value) - parseFloat(Fac1.value);
        fi3.value = parseFloat(Fac3.value) - parseFloat(Fac2.value);
        fi4.value = parseFloat(Fac4.value) - parseFloat(Fac3.value);
        fi5.value = parseFloat(Fac5.value) - parseFloat(Fac4.value);
    } else {
        alert("É preciso completar pelo menos uma das colunas!");
    }
}

function media(arrayPmi = []) {
    var pmi1 = arrayPmi[0];
    var pmi2 = arrayPmi[1];
    var pmi3 = arrayPmi[2];
    var pmi4 = arrayPmi[3];
    var pmi5 = arrayPmi[4];

    pmi1 *= parseFloat(fi1.value);
    pmi2 *= parseFloat(fi2.value);
    pmi3 *= parseFloat(fi3.value);
    pmi4 *= parseFloat(fi4.value);
    pmi5 *= parseFloat(fi5.value);

    var media = (pmi1 + pmi2 + pmi3 + pmi4 + pmi5) / parseFloat(Fac5.value);
    return media;
}

function mediana(arrayFis = [], arrayPmis = []){
    var soma = 0;
    arrayFis.forEach(function(valor){
        soma += valor;
    })
    var em = (soma + 1) / 2;
    var arrayCompleto = []

    var index = 0;
    arrayPmis.forEach(function(valor){
        for (i = 0; i < arrayFis[index]; i++){
            arrayCompleto.push(valor);
        }
        index++;
    });

    console.log(arrayCompleto);

    if (em % 2 !== 0) {
        var em1 = Math.floor(em);
        var em2 = Math.floor(em) + 1;

        var mediana = (arrayCompleto[em1] + arrayCompleto[em2]) / 2;
    } else {
        var mediana = arrayCompleto[em];
    }
    console.log(mediana);
    return mediana;
}

function modaBruta(arrayFis = [], arrayPmis = []){
    maiorFi = 0;
    arrayFis.forEach(function(valor){
        if (valor > maiorFi){
            maiorFi = valor;
        }
    })

    console.log(maiorFi);
    index = arrayFis.indexOf(maiorFi);
    modaBruta = arrayPmis[index];
    return modaBruta;
}

function modaCzuber(arrayLimInf = [], arrayFis = []){//MoC = li + ([fi - fiAnt] / [2fi - fiAnt - fiPos]) * h
    maiorFi = 0;
    arrayFis.forEach(function(valor){
        if (valor > maiorFi){
            maiorFi = valor;
        }
    })

    var indice = arrayFis.indexOf(maiorFi);

    var limInferior = arrayLimInf[indice];
    var fiClasse = arrayFis[indice];
    var fiAnterior = arrayFis[indice - 1];

    if (isNaN(fiAnterior)){
        fiAnterior = 0;
    }

    var fiPosterior = arrayFis[indice + 1];

    if (isNaN(fiPosterior)){
        fiPosterior = 0;
    }

    var h = arrayLimInf[2] - arrayLimInf[1];

    console.log("limInferior: " + limInferior);
    console.log("fiClasse: " + fiClasse);
    console.log("fiAnterior: " + fiAnterior);
    console.log("fiPosterior: " + fiPosterior);
    console.log("h: " + h);

    var modaC = limInferior + ((fiClasse - fiAnterior) / (2 * fiClasse - fiAnterior - fiPosterior)) * h;
    return modaC;
}

function variancia(arrayPmis = [], arrayFis = [], arrayFacs = [], media){
    var soma = 0;

    for (i = 0; i < 5; i++){
        soma += ((arrayPmis[i] - media) * (arrayPmis[i] - media)) * arrayFis[i];
    }

    var variancia = soma / arrayFacs[4];
    return variancia;
}

function desvioPadrao(variancia) {
    var desvioPadrao = Math.sqrt(variancia)
    return desvioPadrao;
}

function coeficienteVariacao(dp, media) {
    var dp = dp;
    var media = media;
    var cv = 100 * dp / media;
    return cv;
}

function calcular(){
    var pmi1 = (parseFloat(li1.value) + parseFloat(ls1.value)) / 2;
    var pmi2 = (parseFloat(li2.value) + parseFloat(ls2.value)) / 2;
    var pmi3 = (parseFloat(li3.value) + parseFloat(ls3.value)) / 2;
    var pmi4 = (parseFloat(li4.value) + parseFloat(ls4.value)) / 2;
    var pmi5 = (parseFloat(li5.value) + parseFloat(ls5.value)) / 2;

    var limitesInf = [parseFloat(li1.value), parseFloat(li2.value), parseFloat(li3.value), parseFloat(li4.value), parseFloat(li5.value)];
    var limitesSup = [parseFloat(ls1.value), parseFloat(ls2.value), parseFloat(ls3.value), parseFloat(ls4.value), parseFloat(ls5.value)];
    var fis = [parseInt(fi1.value), parseInt(fi2.value), parseInt(fi3.value), parseInt(fi4.value), parseInt(fi5.value)];
    var facs = [parseInt(Fac1.value), parseInt(Fac2.value), parseInt(Fac3.value), parseInt(Fac4.value), parseInt(Fac5.value)];
    var pmis = [pmi1, pmi2, pmi3, pmi4, pmi5];

    console.log('Array Fis: ' + fis);
    console.log('Array pmis: ' + pmis);

    mediaRes.value = media(pmis);
    medianaRes.value = mediana(fis, pmis);
    modaBrutaRes.value = modaBruta(fis, pmis);
    modaCzuberRes.value = modaCzuber(limitesInf, fis);
    varianciaRes.value = variancia(pmis, fis, facs, media(pmis));
    dpRes.value = desvioPadrao(variancia(pmis, fis, facs, media(pmis)));
    cvRes.value = coeficienteVariacao(desvioPadrao(variancia(pmis, fis, facs, media(pmis))), media(pmis));
}