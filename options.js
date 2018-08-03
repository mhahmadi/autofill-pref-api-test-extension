var updateToggle = function(status) {
  document.getElementById('autofill-toggle').innerText = status ?
    'Off' : 'On';
}

window.onload = function() {
  chrome.privacy.services.autofillEnabled.get({}, function(details) {
    updateToggle(details.value)
  });
};

document.getElementById('autofill-toggle').addEventListener('click', function() {
  chrome.privacy.services.autofillEnabled.get({}, function(details) {
    chrome.privacy.services.autofillEnabled.set({
      value: !details.value
    }, function() {
      if (chrome.runtime.lastError)
        console.log(chrome.runtime.lastError);
    });
  });
});

chrome.privacy.services.autofillEnabled.onChange.addListener(
  function(details) {
    updateToggle(details.value);
    console.log('Autofill is now ', details.value ? 'On' : 'Off');
  });