$(document).ready(function () {

    function opcoes(local, nome, ...options) {
        const conteiner_select = $('<span>').text(nome).addClass('d-flex flex-column')
        const select = $('<select>').addClass('custom-select').attr('id', nome)
        conteiner_select.append(select)
        $(local).append(conteiner_select)
        $('#' + nome).append('<option>Selecione</option>').attr('selected', 'true')
        $('#' + nome).attr('propriedade', nome)
        options.forEach(function (item) {
            $('#' + nome).append('<option>' + item + '</option>');
        })
    }

    //flex-conteiner
    $('<div>').appendTo('#comandos').attr('id', 'flex-conteiner').addClass('font-weight-bold')
    $('#flex-conteiner').append($('<span>').html('<h4>Flex-Conteiner</h4>'))
    $('<div>').appendTo('#flex-conteiner').attr('id', 'corpo-flex-conteiner')

    opcoes('#corpo-flex-conteiner', 'flex-direction', 'row', 'column', 'row-reverse', 'column-reverse')
    opcoes('#corpo-flex-conteiner', 'flex-wrap', 'NoWrap', 'Wrap', 'Wrap-Reverse')
    opcoes('#corpo-flex-conteiner', 'justify-content', 'flex-start', 'flex-end', 'space-around', 'space-between', 'center')
    opcoes('#corpo-flex-conteiner', 'align-items', 'baseline', 'flex-start', 'flex-end', 'center', 'stretch')
    opcoes('#corpo-flex-conteiner', 'align-content', 'flex-start', 'flex-end', 'center', 'space-around', 'space-between')

    //flex-item
    function items(numero) {
        $('<div>').appendTo('#comandos').addClass('font-weight-bold item-conteiner' + numero)
        $('.item-conteiner' + numero).append($('<span>').html('<h4>item-conteiner</span>'))
        $('<div>').appendTo('.item-conteiner' + numero).addClass('corpo-item-conteiner' + numero)

        opcoes('.corpo-item-conteiner' + numero, 'align-self', 'auto', 'flex-start', 'flex-end', 'center', 'stretch')

        const input = $('<span>').text('Flex-Grow').addClass('flex-grow')
        input.append($('<input>').addClass('form-control').attr('type', 'number').attr('propriedade', 'flex-grow').val('0'))
        $('.corpo-item-conteiner' + numero).append(input)
        $('#align-self').attr('id', 'align-self' + numero) // substitui o id por um novo com numero diferente no fim.
    }

    items(1)
    items(2)
    items(3)

    // retornar na saida o valor e id  do select
    //selecionar o "pai" para monstrar a fonte das configuraçoes, ### ... [][][]
    $('select').on('change', function (e) {
        if (this.value !== 'Selecione')
            $('#saida').html('<h3>#flex-conteiner { ' + $(this).attr('propriedade') + ': ' + $(this).val() + ';<br>' + '}</h3>');
        console.log(e)

    });
})

