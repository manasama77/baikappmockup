let cif_no = null,
  cm_code = null,
  cm_name = null,
  nama = null,
  vnama = $("#vnama"),
  vcif_no = $("#vcif_no"),
  vcm_name = $("#vcm_name");
$(document).ready(function () {
  checkSession();

  $.ajax({
    url: `http://app.baytulikhtiar.com/index.php/webservices/get_saldo_anggota_apm`,
    data: {
      cif_no: vcif_no.text(),
    },
    dataType: "JSON",
    type: "POST",
    crossDomain: true,
    contentType: "application/json; charset=utf-8",
    beforeSend: function () {
      $.blockUI({
        message: '<i class="fa fa-spinner fa-spin"></i> Proses Cek No Anggota',
      });
    },
    statusCode: {
      400: function () {
        console.log(400);
        alert("Oops... Error 400");
        $.unblockUI();
      },
      404: function () {
        console.log(404);
        alert("Oops... Error 404");
        $.unblockUI();
      },
      500: function () {
        console.log(500);
        alert("Oops... Error 500");
        $.unblockUI();
      },
      503: function () {
        console.log(500);
        alert("Oops... Error 503");
        $.unblockUI();
      },
    },
  }).done(function (res) {
    $.unblockUI();
    console.log(res);

    // if (res.results.length == 1) {
    //     $.each(res.results, function (i, k) {
    //         let cif_no = k.cif_no;
    //         let nama = k.nama;
    //         let cm_code = k.cm_code;
    //         let cm_name = k.cm_name;

    //         sessionStorage.setItem("cif_no", cif_no);
    //         sessionStorage.setItem("nama", nama);
    //         sessionStorage.setItem("cm_code", cm_code);
    //         sessionStorage.setItem("cm_name", cm_name);
    //     });

    //     location.replace(`dashboard.html`);
    // }
  });
});

function checkSession() {
  cif_no = sessionStorage.getItem("cif_no");
  cm_code = sessionStorage.getItem("cm_code");
  cm_name = sessionStorage.getItem("cm_name");
  nama = sessionStorage.getItem("nama");

  if (cif_no == null) {
    logout();
  }

  vnama.text(nama);
  vcif_no.text(cif_no);
  vcm_name.text(cm_name);
}

function logout() {
  sessionStorage.clear();
  location.replace("index.html");
}
