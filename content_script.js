// target is the div node in the new message dialog with the class .gmail_signature
function insertSignature(target) {
    let signatureZone = target;
    let container = document.createElement('div');
    let horizLine = document.createElement('hr');
    let fact = document.createElement('span');
    let br = document.createElement('br');
    let ticker = document.createElement('a');
    let tickerText = document.createTextNode('Put a random useless fact in every email you send.');
    
    
    fetch('https://uselessfacts.jsph.pl/random.json?language=en')
        .then(response => response.json())
        .then(data => {
            let factText = document.createTextNode(data.text);
            fact.appendChild(factText);
        });
        
    fact.setAttribute('style', 'color: #494949; font-size: 12px; font-style: italic; padding: 5px 10px 5px 5px');
    
    ticker.setAttribute('href', 'https://addons.mozilla.org/en-US/firefox/addon/random-fact-email/');
    ticker.setAttribute('style', 'color: #666464; font-size: 10px;');
    
    ticker.appendChild(tickerText);
    container.appendChild(horizLine);
    container.appendChild(fact);
    container.appendChild(br);
    container.appendChild(ticker);
    signatureZone.appendChild(container);
}

const target = document.getElementsByClassName('dw')[0];

const config = { attributes: true, childList: true, subtree: true }

const callback = function(mutationsList, observer) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            if (mutation.addedNodes[0].className == 'nH nn')
            {
                insertSignature(mutation.addedNodes[0].querySelector('.gmail_signature'));
            }
        }
    }
}

const observer = new MutationObserver(callback);

observer.observe(document, config);
