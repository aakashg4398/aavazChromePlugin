function init() {
  // console.log("init")
  // document.querySelectorAll('.tel').click();
  var list = document.querySelectorAll('.tel');
  // alert(list.length)
  for (var i = 0; i < list.length; i++) {
    document.querySelectorAll('.tel')[i].click();
  }
}

function myMain(evt) {
  var list = document.querySelectorAll('.tel');

  for (var i = 0; i < list.length; i++) {    
    document.querySelectorAll('.tel')[i].click();
  }
}

function myClick() {
  setTimeout(init, 2000);
}
myClick();