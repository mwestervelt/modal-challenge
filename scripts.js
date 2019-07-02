// get cart info and store it for later
function getCartInfo() {
    var info = {
        quantity: 0,
        images: [],
        subtotal: 0,
        names: []
    };
    info.quantity = $(".mini-cart-container").data("quantity");
    info.subtotal = $(".order-subtotal td").html();
    info.images = $(".mini-cart-image img");
    info.names = $(".mini-cart-name").html();
    return info;
}

// determine if user has scrolled to the bottom 10%
function checkScrollPosition() {
    $(window).on("scroll", function () {
        var toggleOverlay = $('#overlay').data('toggleOverlay');
        var scroll = $(window).scrollTop(),
            docHeight = $(document).height(),
            windowHeight = $(window).height()
        var scrollPercent = (scroll / (docHeight - windowHeight)) * 100;
        if (scrollPercent > 89 && toggleOverlay == false) {
            $('#overlay').css('visibility', 'visible').hide().fadeIn('slow');
            $('#overlay').data('toggleOverlay', true)
        }
    })
}

// build modal elements
function createOverlay() {
    var overlay = $('<div id="overlay"></div>')
        .css({
            'background-color': 'rgba(0,0,0,0.4)',
            'position': 'fixed',
            'z-index': '1001',
            'width': '100%',
            'height': '100%',
            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            'visibility': 'hidden'
        })
        .data('toggleOverlay', false);
    return overlay;
};

function createModal() {
    var modal = $('<div id="modal"></div>')
        .css({
            'display': 'flex',
            'flex-direction': 'column',
            'width': '735px',
            'height': '455px',
            'padding': '15px',
            'background-color': '#ffffff',
            'border': '1px solid #cbcbcb',
        });
    return modal;
};

function createCloseButton() {
    var container = $('<div>')
        .css({
            'display': 'flex',
            'justify-content': 'flex-end',
        });
    var closeButton = $('<svg color="#595959" aria-hidden="true" viewBox="0 0 20 22" width="20" height="20"><path d="M1.143 22L10 12.257 18.857 22 20 20.743 11.143 11 20 1.257 18.857 0 10 9.743 1.143 0 0 1.257 8.857 11 0 20.743z" /></svg>'
    ).click(() => {
        $('#overlay').fadeOut('slow').css('visibility', 'hidden');
        $('#overlay').data('toggleOverlay', false);
    });
    return $(container).append(closeButton);
}
// click outside of modal also toggles
$(document).mouseup(function (e) {
    var container = $("#modal-wrapper");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        $('#overlay').fadeOut('slow').css('visibility', 'hidden');
        $('#overlay').data('toggleOverlay', false);
    }
});

function createHeader() {
    var header = $('<div id="modal-header-div"></div>')
        .css({
            'padding': '15px 35px 0px',
        });
    var title = $('<h3>Ready to checkout?</h2>')
        .css({
            'margin-top': '0px',
            'margin-bottom': '30px',
            'padding': '0px 0px 30px 0px',
            'border-bottom': '1px solid #cbcbcb',
            'text-align': 'left',
            'font-family': 'ars_maquette_prolight, sans-serif',
            'font-size': '36px',
        });
    $(header).append(title);
    return header;
}

function createModalContent(info) {
    modal = $('#modal')
    var contentContainer = $('<div style="display: flex" id="content-container"></div>').appendTo(modal);
    var thumbDiv = $('<div id="thumbnails"></div>').appendTo(contentContainer);
    thumbDiv.css({
        'padding': '15px 35px',
        'width': '50%',
        'float': 'left',
    })
    for (var i = 0; i < info.images.length; i++) {
        var imgEl = info.images[i]
        $(imgEl).appendTo(thumbDiv).css({
            'margin': '0',
        })
        var productInfo = $('<p id="prod-info">' + info.names + '</p>').appendTo(thumbDiv)
        productInfo.css({
            'float': 'right',
            'width': '63%',
            'vertical-align': 'middle',
            'font-family': 'ars_maquette_probold,sans-serif',
        })
    }

    var totalsDiv = $('<div id="totals"></div>').appendTo(contentContainer);
    totalsDiv.css({
        'padding': '15px 35px',
        'width': '50%',
        'float': 'right',
        'position': 'relative',

        'border-left': '1px solid #cbcbcb',
    })
    $('<span class="msg-spans"></span><br><br>').text(info.quantity + " items").appendTo(totalsDiv);
    $('<span class="msg-spans"></span>').text("Subtotal: " + info.subtotal).appendTo(totalsDiv);
    $('.msg-spans').css({
        'font-size': '14px'
    })
    var checkoutBtn = $('<a href="http://marmot.com/checkout" id="checkout-btn">checkout</a>').appendTo(totalsDiv)
    checkoutBtn.css({
        'display': 'block',
        'border': '1px solid #cc0001',
        'background': '#cc0001',
        'color': 'white',
        'margin': '10px 0',
        'text-align': 'center',
        'padding': '14px 30px',
        'text-transform': 'uppercase',
        'text-decoration': 'none',
        'font-family': 'ars_maquette_probold,sans-serif',
        'position': 'absolute',
        'bottom': '0',
        'width': '80%',
    })
}

//put all modal pieces together
function buildModal(info) {
    $('body').prepend(this.createOverlay());
    $('#overlay').prepend(this.createModal());
    $('#modal')
        .append(this.createCloseButton())
        .append(this.createHeader())
        .append(this.createModalContent(info));
}

// run functions
var info = getCartInfo();
buildModal(info);
checkScrollPosition();
