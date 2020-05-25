$(document).ready(function () {

    function opcoes(propriedade, local, nome, ...options) {
        const conteiner_select = $('<span>').text(nome).addClass('d-flex flex-column')
        const select = $('<select>').addClass('custom-select').attr('id', nome)
        conteiner_select.append(select)
        $(local).append(conteiner_select)
        $('#' + nome).attr('propriedade', propriedade)
        options.forEach(function (item) {
            $('#' + nome).append('<option>' + item + '</option>');
        })
    }

    //flex-conteiner
    $('<div>').appendTo('#esquerda').attr('id', 'flex-conteiner').addClass('font-weight-bold d-flex flex-column')
    $('#flex-conteiner').append($('<span>').html('<h5>Flex-Conteiner</h5>'))
    $('<div>').appendTo('#flex-conteiner').attr('id', 'corpo-flex-conteiner').attr('data-id', 'flex-conteiner')
    opcoes('flexDirection', '#corpo-flex-conteiner', 'flex-direction', 'row', 'column', 'row-reverse', 'column-reverse')
    opcoes('flexWrap', '#corpo-flex-conteiner', 'flex-wrap', 'NoWrap', 'Wrap', 'Wrap-Reverse')
    opcoes('justifyContent', '#corpo-flex-conteiner', 'justify-content', 'flex-start', 'flex-end', 'space-around', 'space-between', 'center')
    opcoes('alignItems', '#corpo-flex-conteiner', 'align-items', 'stretch', 'flex-start', 'baseline', 'flex-end', 'center')
    opcoes('alignContent', '#corpo-flex-conteiner', 'align-content', 'flex-start', 'flex-end', 'center', 'space-around', 'space-between')

    //flex-item
    function items(numero) {
        $('<div>').appendTo('#comandos').addClass('flex-item font-weight-bold item-conteiner d-flex flex-column flex-wrap').attr('id', 'itemconteiner-' + numero)
        $('#itemconteiner-' + numero).append($('<span>').html(`<h5>item-${numero}</span>`))
        $('<div>').appendTo('#itemconteiner-' + numero).attr('id', 'corpo-item-conteiner' + numero).attr('data-id', 'item-' + numero)
        opcoes('alignSelf', '#corpo-item-conteiner' + numero, 'align-self', 'auto', 'flex-start', 'flex-end', 'center', 'stretch')
        const input = $('<span>').text('Flex-Grow:').addClass('flex-grow')
        input.append($('<input>').addClass('form-control').attr('type', 'number').attr('propriedade', 'flex-grow').val('0'))
        $('#corpo-item-conteiner' + numero).append(input)
        $('#align-self').attr('id', 'alignself-' + numero) // substitui o id por um novo com numero diferente no fim.
    }
    let num = 1
    if (num < 0) {
        num = 1
    }
    let del = 2
    if (del <= 1) {
        del = 2
    }
    //blocos
    function bloco(deletavel = false, altura = 70, largura = 70) {
        if (deletavel) {
            $('<div>').appendTo("#quadro").addClass("deletavel text-white d-flex position-relative").attr('id', 'deletavel-' + del)
            $('#deletavel-' + del).html(`<button type="button" class="close" data-dismiss="alert" aria-label="Close"><h1>${num}</h1></button>`)
        } else {
            $('<div>').appendTo('#quadro').addClass('bloco').attr('id', 'bloco' + num).height(altura).width(largura)
            $('#bloco' + num).addClass('d-flex justify-content-center align-items-center').html(`<h2 class="alert-heading">${num}</h2>`)
        }
        num++
    }
    bloco(true)

    items(1)


    // retorna na saida o valor e id  do select
    //selecionar o "pai" para monstrar a fonte das configuraçoes
    $('select').on('change', function () {
            $('#saida').html('<h2>#flex-conteiner { ' + $(this).attr('propriedade') + ': ' + $(this).val() + ';<br>' + '}</h2>');
        console.log($(this).val())
    });
})