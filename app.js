// ------------------------------------------------------------------------------------------
// LacunaWebPKI: first example

var pki = new LacunaWebPKI('AiEAKi5sYWN1bmFzb2Z0d2FyZS5jb20sanNmaWRkbGUubmV0AAADAFBybwgAAJhSU6eP3AgAAXGQPqewIV4abxw5eh8GZbjYkH5W/JK8lFNbqP0D1hjT5w6Qv3b0Gjb/IrGJ9jjFrB/kVq3StZdY6jXY65iowizIt1Jwhv5RD864TqBMW6IaHAt3YSx7OBJE79PDp1kr8+WmUNkABsqQSPaaLIRsJs5hPx2hvqgmtXTlxWEzaYwLkI+D7mkoKKCIoU3kK+mxA3RXPD27DvckKFeVVQ0aFIF+lnw/Vf++zOtD/5a3SSTZAsEifJfUqauU+FA34MKF/tBnXxhEdv44Kf3aL+cduZlE4dKMmTh9gzaaA1uZiI9O0OTZqYJEocFauDzr8rPAq9UBz1wHfZV8is/iv8oZp5E=');

function start() {
    log('Initializing component ...');
    pki.init(onWebPkiReady);
}

function onWebPkiReady () {
    log('Component ready, listing certificates ...');
    pki.listCertificates().success(function (certs) {
        log(certs.length + ' certificates found.');
        var select = $('#certificateSelect');
        $.each(certs, function() {
            select.append(
                $('<option />')
                .val(this.thumbprint)
                .text(this.subjectName + ' (issued by ' + this.issuerName + ')')
            );
        });
    });
}

function readCert() {
    var selectedCertThumb = $('#certificateSelect').val();
    log('Reading certificate: ' + selectedCertThumb);
    pki.readCertificate(selectedCertThumb).success(function (certEncoding) {
        log('Result: ' + certEncoding);
    });
}

function signData() {
    var selectedCertThumb = $('#certificateSelect').val();
    log('Signing data with certificate: ' + selectedCertThumb);
    pki.signData({
        thumbprint: selectedCertThumb,
        data: 'SGVsbG8sIFdvcmxkIQ==', // ASCII encoding of the string "Hello, World!", encoded in Base64
        digestAlgorithm: 'SHA-256'
    }).success(function (signature) {
        log('Result: ' + signature);
    });
}

function signHash() {
    var selectedCertThumb = $('#certificateSelect').val();
    log('Signing hash with certificate: ' + selectedCertThumb);
    pki.signHash({
        thumbprint: selectedCertThumb,
        hash: '3/1gIbsr1bCvZ2KQgJ7DpTGR3YHH9wpLKGiKNiGCmG8=', // Base64 encoding of the SHA-256 digest of the ASCII encoding of the string "Hello, World!"
        digestAlgorithm: 'SHA-256'
    }).success(function (signature) {
        log('Result: ' + signature);
    });
}

function log(message) {
    $('#logPanel').append('<p>' + message + '</p>');
    if (window.console) {
        window.console.log(message);
    }    
}

$(function() {
    $('#readCertButton').click(readCert);
    $('#signDataButton').click(signData);
    $('#signHashButton').click(signHash);
    start();
});