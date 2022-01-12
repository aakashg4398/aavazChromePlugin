var token = "";
var userid = "";
var authpwd = "";
chrome.tabs.query({
  active: true
}, function(tabs) {
  var tab = tabs[0];
  tab_title = tab.title;
  chrome.tabs.executeScript(tab.id, {
    code: 'document.querySelector("#tupCont").innerHTML'
  }, display_content);
});

function get_options() {
  chrome.storage.sync.get({
    uname: '',
    userpsw: ''
  }, function(items) {
    userid = items.uname;
    authpwd = items.userpsw;
  });
}
document.addEventListener('DOMContentLoaded', get_options);

function display_content(results) {
  res = results;
  // alert("111")
  document.querySelector("#id1").innerHTML = results;
  $(document).ready(function() {
    var htmlStr = '';
    $('.morecol').hide();
    $('div.tuple').each(function() {
      // alert("intable");
      var fullname = $(this).find('a.userName').html();
      // alert(fullname)
      var fname = '';
      var lname = '';
      var phone = $(this).find('a.tel span').text();
      // alert(phone)
      phone = phone.replace(" ", "");
      phone = phone.replace("(M)", "");
      phone = phone.replace("(F)", "");
      // alert(phone)
      htmlStr += '<tr><td><input type="text" name="firstName" placeholder="FirstName" class="firstName" value="' + fullname + '" readonly></td>  <td><input type="text" name="lastName" placeholder="LastName" class="lastName" value="' + lname + '" readonly ></td>  <td><input type="text" name="phone1" placeholder="Phone" class="phone1" value="' + phone + '" readonly ></td>  </tr>';
    });
    htmlStr += '<tr><td><input type="button" name="submit" value="Find Phone Number" id="findContact" class="btn btn-primary"> </td> </td><td></td><td></td></tr>'
    // alert(htmlStr)
    $('#contactTable2').append(htmlStr);
 
    $.ajax({
      url: "https://vuepod.devaavaz.biz/361-api/v3/users/auth/",
      method: "POST",
      headers: {
        "Authorization": 'Basic ' + btoa(userid + ":" + authpwd),
        "Content-Type": "application/json"
      },
      success: function(data) {
        token = data.auth_token;
        // alert(token);
        console.log(token);
      },
      error: function(e) {
        var err = jQuery.parseJSON(e.responseText);
        alert(err.message);
        console.log(err.message);
      }
    });

  });
  console.log(results);
}
$(document).on('click', '#findContact', function() {
  var dataTable = document.getElementById("contactTable2");
  var rowCount = dataTable.rows.length;
  // alert(rowCount);
  for (var i = 0; i < rowCount - 1; i++) {
    var phone1 = $("#contactTable2").find("tr").eq(i).find("td:eq(2) input[type='text']").val();
    // alert($("#formTable").find("tr").eq(i));
    var verifyphone = verifyphonenumber(phone1);
    if (verifyphone) {
      var imp = $("#contactTable2").find("tr").eq(i).find("td:eq(" + 3 + ")").html();
      // alert(imp);
      if (!imp) {
        $("#contactTable2").find("tr").eq(i).append('<td class="importTd"><img src="images/import.png" alt="img" class="importImg"></td>');
      }
    }
  }

  function verifyphonenumber(phone) {
    // alert(phone);
    var pattern = /\+[0-9]+/gm;
    if (pattern.test(phone)) {
      return true;
    } else {
      return false;
    }
  }
});
$(document).on('click', '.importImg', function() {
  // alert("import");
  var currentTr = $(this).closest("tr");
  var fn = currentTr.find(".firstName");
  var firstName = fn.val().trim();
  if (firstName == '') {
    alert("First name missing");
    return false;
  } 
  var ln = currentTr.find(".lastName");
  var lastName = ln.val().trim();
  // if(lastName == ''){
  //   alert("Last name missing");
  //   return false;
  // }
  // alert(lastName);
  var phone1 = currentTr.find(".phone1");
  var phone = phone1.val().trim();
  if (phone == '') {
    alert("Phone missing");
    return false;
  }
  var pwd = '';
  $.ajax({
    url: "https://vuepod.devaavaz.biz/361-api/v3/contacts/",
    method: "POST",
    data: JSON.stringify({
      "first_name": firstName,
      "last_name": lastName,
      "phone_1": phone
    }),
    headers: {
      "Authorization": 'Basic ' + btoa(token + ":" + pwd),
      "Content-Type": "application/json"
    },
    success: function(data) {
      alert("Contact Added Successfully");
      fn.val("");
      ln.val("");
      phone1.val("");
      currentTr.find(".importTd").remove();
    },
    error: function(e) {
      // var err = JSON.parse(e);
      var err = jQuery.parseJSON(e.responseText);
      alert(err.error);
      console.log(err.error);
    }
  });
});