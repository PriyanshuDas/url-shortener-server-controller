function processURL()
{
    console.log('Entered loadXMLDoc Function!');;
    var inputText = document.getElementsByClassName('inputText')[0];
    var re = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    console.log(re.test(inputText.value));
    var inputSpanError = document.getElementsByClassName('inputSpanError')[0];
    if(!(re.test(inputText.value)) || inputText.value.length > 200)
    {
        inputSpanError.innerHTML = "Invalid Url!";
        inputSpanError.style.display = 'inline';
        inputSpanError.style.color = 'red';
        return false;
    }
    inputSpanError.innerHTML = "";
    inputSpanError.style.display = 'none';
    inputSpanError.style.display = 'inline';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if(this.readyState == 4 && this.status == 200)
        {
            var outputText = document.getElementsByClassName('outputText')[0];
            outputText.value = this.responseText.toString();
            console.log('Resulting Value : ',this.responseText);
        }
    };
    xhttp.open('POST', 'http://localhost:3080/send', true);
    xhttp.responseType = 'text';
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");   //Very Important!
    var sentObject = JSON.stringify({longUrl: inputText.value});
    console.log('Sending Request : ', xhttp);
    xhttp.send(sentObject);
    return true;
}