let cif_no = null,
  cm_code = null,
  cm_name = null,
  nama = null,
  vnama = $("#vnama"),
  vcif_no = $("#vcif_no"),
  vcm_name = $("#vcm_name");
$(document).ready(function () {
  checkSession();
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
