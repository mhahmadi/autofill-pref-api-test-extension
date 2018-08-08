var updateToggle = function(id, status) {
  document.getElementById(id).innerText = status ?
    'Off' : 'On';
}

window.onload = function() {
  chrome.privacy.services.autofillEnabled.get({}, function(details) {
    updateToggle('autofill-toggle', details.value)
  });
  chrome.privacy.services.autofillCreditCardEnabled.get({}, function(details) {
    updateToggle('cc-autofill-toggle', details.value)
  });
  chrome.privacy.services.autofillAddressEnabled.get({}, function(details) {
    updateToggle('address-autofill-toggle', details.value)
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

document.getElementById('cc-autofill-toggle').addEventListener('click', function() {
  chrome.privacy.services.autofillCreditCardEnabled.get({}, function(details) {
    chrome.privacy.services.autofillCreditCardEnabled.set({
      value: !details.value
    }, function() {
      if (chrome.runtime.lastError)
        console.log(chrome.runtime.lastError);
    });
  });
});

document.getElementById('address-autofill-toggle').addEventListener('click', function() {
  chrome.privacy.services.autofillAddressEnabled.get({}, function(details) {
    chrome.privacy.services.autofillAddressEnabled.set({
      value: !details.value
    }, function() {
      if (chrome.runtime.lastError)
        console.log(chrome.runtime.lastError);
    });
  });
});

chrome.privacy.services.autofillEnabled.onChange.addListener(
  function(details) {
    updateToggle('autofill-toggle', details.value);
    console.log('Autofill is now ', details.value ? 'On' : 'Off');
  });

chrome.privacy.services.autofillCreditCardEnabled.onChange.addListener(
  function(details) {
    updateToggle('cc-autofill-toggle', details.value);
    console.log('Autofill Credit Card is now ', details.value ? 'On' : 'Off');
  });

chrome.privacy.services.autofillAddressEnabled.onChange.addListener(
  function(details) {
    updateToggle('address-autofill-toggle', details.value);
    console.log('Autofill Address is now ', details.value ? 'On' : 'Off');
  });