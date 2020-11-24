$(document).ready(function () {
  $("#form_login").validate({
    errorElement: "span",
    errorClass: "help-block help-block-error text-danger",
    focusInvalid: true,
    ignore: "",
    rules: {
      cif_no: {
        required: true,
      },
      pin: {
        required: true,
        maxlength: "6",
      },
    },

    errorPlacement: function (error, element) {
      var icon = $(element).parent(".input-icon").children("i");
      icon.removeClass("fa-check").addClass("fa-warning");
      icon
        .attr("data-original-title", error.text())
        .tooltip({ container: "body" });
    },

    highlight: function (element) {
      $(element)
        .closest(".form-group")
        .removeClass("has-success")
        .addClass("has-error");
    },

    unhighlight: function (element) {
      // revert the change done by hightlight
    },

    success: function (label, element) {
      var icon = $(element).parent(".input-icon").children("i");
      $(element)
        .closest(".form-group")
        .removeClass("has-error")
        .addClass("has-success");
      icon.removeClass("fa-warning").addClass("fa-check");
    },

    submitHandler: function (form) {
      $.ajax({
        url: "http://sirkahbaik.test/apicif",
        dataType: "json",
        type: "get",
        data: {
          cif_no: $("#cif_no").val(),
        },
        beforeSend: function () {
          $.blockUI({
            message:
              '<i class="fa fa-spinner fa-spin"></i> Proses Cek No Anggota',
          });
        },
        statusCode: {
          //   200: function (res) {
          //     console.log(res);
          //     console.log(200);
          //     $.unblockUI();
          //   },
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
        success: function (res) {
          console.log(res);
          $.unblockUI();
        },
        complete: function (res) {
          console.log(res);
        },
      }).done(function (res) {
        console.log(res);
        window.localStorage.setItem("cif_no", res.cif_no);
        window.localStorage.setItem(
          "nama_anggota",
          res.get_data_anggota[0].nama
        );
      });
    },
  });
});
