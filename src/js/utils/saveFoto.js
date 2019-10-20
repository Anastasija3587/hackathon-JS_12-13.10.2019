import services from "../../services/services";
export const fotoBase64 = evt => {
  const refsImg = {
    outputMult: document.getElementById("input-file")
  };
  let file = evt.target.files;
  refsImg.outputMult.innerHTML = "";
  let f;
  for (let i = 0; (f = file[i]); i++) {
    if (!f.type.match("image.*")) {
      alert("Image only please....");
    }
    let reader = new FileReader();

    reader.onload = (function(theFile) {
      return function(e) {
        refsImg.outputMult.insertAdjacentHTML(
          "beforeend",
          [
            '<img class="thumb" title="',
            ,
            '" src="',
            e.target.result,
            '" />'
          ].join("")
        );
        services.image = e.target.result;
      };
    })(f);
    reader.readAsDataURL(f);
  }
};
