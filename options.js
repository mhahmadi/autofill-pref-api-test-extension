var updateToggle = function(id_prefix, message, details) {
  console.log(message, details);
  document.getElementById(id_prefix + '-status').innerText = message + ' ' +
    (details.value ? 'on' : 'off');
  document.getElementById(id_prefix + '-toggle').innerText = 'Toggle ' +
    (details.value ? 'off' : 'on');
}

window.onload = function() {
  chrome.privacy.services.autofillEnabled.get({}, function(details) {
    updateToggle('autofill', 'Autofill is ', details)
  });
  chrome.privacy.services.autofillCreditCardEnabled.get({}, function(details) {
    updateToggle('cc-autofill', 'Credit Card Autofill is ', details)
  });
  chrome.privacy.services.autofillAddressEnabled.get({}, function(details) {
    updateToggle('address-autofill', 'Address Autofill is ', details)
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
    updateToggle('autofill', 'Autofill is ', details)
  });

chrome.privacy.services.autofillCreditCardEnabled.onChange.addListener(
  function(details) {
    updateToggle('cc-autofill', 'Credit Card Autofill is ', details)
  });

chrome.privacy.services.autofillAddressEnabled.onChange.addListener(
  function(details) {
    updateToggle('address-autofill', 'Address Autofill is ', details)
  });