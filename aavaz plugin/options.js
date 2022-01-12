// Saves options to chrome.storage
function save_options() {
    var uname = document.getElementById('uname').value;
    var userpsw = document.getElementById('userpsw').value;
    chrome.storage.sync.set({
        uname: uname,
        userpsw: userpsw
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}


function restore_options() {
    chrome.storage.sync.get({
        uname: '',
        userpsw: ''
    }, function(items) {
        document.getElementById('uname').value = items.uname;
        document.getElementById('userpsw').value = items.userpsw;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);