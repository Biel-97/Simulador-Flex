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
    $('#flex-conteiner').appendTo($('<div>').addClass('d-flex flex-column align-items-center justify-content-around').attr('id', 'teste').appendTo('#esquerda'))
    $('#flex-conteiner').append($('<span>').html('<h5>Flex-Conteiner</h5>'))
    $('<div>').appendTo('#flex-conteiner').attr('id', 'corpo-flex-conteiner').attr('data-id', 'flex-conteiner')
    opcoes('flexDirection', '#corpo-flex-conteiner', 'flex-direction', 'row', 'column', 'row-reverse', 'column-reverse')
    opcoes('flexWrap', '#corpo-flex-conteiner', 'flex-wrap', 'NoWrap', 'Wrap', 'Wrap-Reverse')
    opcoes('justifyContent', '#corpo-flex-conteiner', 'justify-content', 'flex-start', 'flex-end', 'space-around', 'space-between', 'center')
    opcoes('alignItems', '#corpo-flex-conteiner', 'align-items', 'stretch', 'flex-start', 'baseline', 'flex-end', 'center')
    opcoes('alignContent', '#corpo-flex-conteiner', 'align-content','initial', 'flex-start', 'flex-end', 'center', 'space-around', 'space-between')
    
    //flex-item
    function criar_itemsConteiner(numero) {
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
    let del = 1
    if (del <= 0) {
        del = 1
    }
    function criar_bloco(deletavel = false, altura = 70, largura = 70) {
        if (deletavel) {
            $('<div>').appendTo("#quadro").addClass("deletavel text-white d-flex position-relative").attr('id', 'deletavel-' + del)
            $('#deletavel-' + del).html(`<button type="button" class="close" data-dismiss="alert" aria-label="Close"><h1>${num}</h1></button>`)
        } else {
            $('<div>').appendTo('#quadro').addClass('bloco').attr('id', 'bloco' + num).height(altura).width(largura)
            $('#bloco' + num).addClass('d-flex justify-content-center align-items-center').html(`<h2 class="alert-heading">${num}</h2>`)
        }
    }

    function copiar () {
        $('#copiar').on('click', '', function() { 
        let range = document.createRange();
        range.selectNode(document.getElementById("output"));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand("copy");
        window.getSelection().removeAllRanges();
        });
    }

    espaco = () => '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
    //adiciona a output as propriedades dos blocos
    
    function output_items() {
        $('.flex-item').each(function (e) {
            let retorno = {}
            $(this).on('change', 'select', function () {
                nome = $(this).closest('[data-id]').data('id')
                retorno.align_self = $(this).val()
                let deletavel = '#deletavel-' + $(this).attr('id').split('-')[1]
                output_add(nome)
                document.querySelector(deletavel).style.alignSelf = $(this).val()
            })
            $(this).on('change', 'input', function () {
                if ($(this).val() >= 0) {
                    let nome = $(this).closest('[data-id]').data('id');
                    let deletavel = '#deletavel-' + nome.split('-')[1]
                    retorno.flex_Grow = $(this).val()
                    output_add(nome)
                    document.querySelector(deletavel).style.flexGrow = $(this).val()
                }
            })
            function output_add(nome) {
                if ($(`#out-${nome}`).length == '0') {
                    $(`<div id="out-${nome}">`).text(`#${nome} {`).append('<br>').appendTo('#output')
                    document.querySelector(`#out-${nome}`).style.order = nome.split('-')[1] //ordenar os itens na output
                    Object.entries(retorno).forEach(([chave, valor]) => {
                        $(`#out-${nome}`).append(`${espaco()}<span class ="${chave}">${chave.replace('_', '-')}: ${valor};</span>`)
                        $(`#out-${nome}`).last('<br>').append('<br><span class="fim">}</span>')
                    })
                } else {
                    Object.entries(retorno).forEach(([chave, valor]) => {
                        if ($(`#out-${nome} .${chave}`).length == '0') {
                            $(`#out-${nome}`).append(`${espaco()}<span class ="${chave}">${chave.replace('_', '-')}: ${valor};</span><br>`)
                        }
                        if ($(`#out-${nome}`).length == '1') {
                            $(`#out-${nome} .fim`).remove()
                            $(`#out-${nome}`).last('<br>').append('<span class="fim">}</span>')
                        }
                        $(`#out-${nome} .${chave}`).html(`<span>${chave.replace('_', '-')}: ${valor};</span>`)
                    })
                }
            }
            copiar()
        })
    }
    copiar()
    //Controlador que adiciona ou remove um bloco
    $('<div>').insertAfter('#flex-conteiner').attr('id', 'controle')
    $('#controle').html('<button id="adicionar" type="button" class="btn btn-success">Adicionar</button><button id = "remover" type="button" class="btn btn-danger">Remover</button>')
    $('#controle').addClass("d-flex flex-column justify-content-around flex-wrap align-items-center")

    $('#controle').on('click', 'button', function () {
        if ($(this).attr('id') === 'adicionar') {
            if (num <= 14) {//limite de 14 blocos criados
                criar_bloco(true)
                del++
                criar_itemsConteiner(num)
                num++
            }
        } else if ($(this).attr('id') === 'remover') {
            if (num > 1) {
                del = del - 1
                num = num - 1
                $(`#deletavel-${del}`).remove()
                $(`#out-item-${del}`).remove()
                $('.item-conteiner:last-child').remove()
            }
        }
        output_items()

    })
    $('#flex-conteiner').on('change', 'select', function (e) {
        if (this.value !== 'Selecione') {
            if ($(this).attr('propriedade') == 'flexDirection') {
                document.querySelector('#quadro').style.flexDirection = $(this).val()
            } else if ($(this).attr('propriedade') == 'flexWrap') {
                document.querySelector('#quadro').style.flexWrap = $(this).val()
            } else if ($(this).attr('propriedade') == 'justifyContent') {
                document.querySelector('#quadro').style.justifyContent = $(this).val()
            } else if ($(this).attr('propriedade') == 'alignItems') {
                document.querySelector('#quadro').style.alignItems = $(this).val()
            } else if ($(this).attr('propriedade') == 'alignContent') {
                document.querySelector('#quadro').style.alignContent = $(this).val()
            }
        }
    })
    $('#flex-direction').on('change','',function() {
        let direcao = document.querySelector('img')
        if($(this).val() == 'column') {
            direcao.style.transform = 'rotate(90deg)'
        }else if ($(this).val() == 'column-reverse'){
            direcao.style.transform = 'rotate(280deg)'
        }else if ($(this).val() == 'row-reverse') {
            direcao.style.transform = 'rotate(180deg)'
        }else if($(this).val() == 'row') {
            direcao.style.transform = 'rotate(0deg)'
        }
    })
    //Ativação do select do flex-conteiner \/
    function output_conteiner() {
        let retorno = {
            flex_Direction: 'row',
            flex_Wrap: 'noWrap',
            justify_Content: 'flex-start',
            align_Items: 'stretch',
            align_Content: 'initial'
        }
        Object.entries(retorno).forEach(([chave, valor]) => {
            $('#out-flex-conteiner').append(`${espaco()}<span class ="${chave}">${chave.replace('_', '-')}: ${valor};</span>`).append('<br>')
        })
        $('#out-flex-conteiner').append('<span style="left: 2px">}</span>')
        $('select').on('change', '', function (e) {
            if (this.value !== 'Selecione') {
                let nome = $(this).closest('[data-id]').data('id');
                let propriedade = $(this).attr('id')
                let propriedade_valor = $(this).val()
                if (propriedade == 'flex-direction') {
                    retorno.flex_Direction = propriedade_valor
                } else if (propriedade == 'flex-wrap') {
                    retorno.flex_Wrap = propriedade_valor
                } else if (propriedade == 'justify-content') {
                    retorno.justify_Content = propriedade_valor
                } else if (propriedade == 'align-items') {
                    retorno.align_Items = propriedade_valor
                } else if (propriedade == 'align-content') {
                    retorno.align_Content = propriedade_valor
                }
                Object.entries(retorno).forEach(([chave, valor]) => {
                    $(`.${chave}`).html(`<span>${chave.replace('_', '-')}: ${valor};</span>`)
                })
            }
        })
    }
    output_conteiner()
})