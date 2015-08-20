function validate(){
    var email = document.forms["ContactForm"]['email'].value;
    var message = document.forms["ContactForm"]['message'].value;
    var valid = true;
    var emailRegex = /[0-9a-zA-Z_.]+[@][0-9a-zA-Z]+[.com]/i;
    if(email.length === 0 ){
        doHighlightError('email', 2000);
        valid = false;
    }
    if( !emailRegex.test(email)){
        doHighlightError('email', 2000);
        valid = false;
        alert('Email Invalid! Please enter a valid Email.');
    }
    if(message.length === 0 || message === null){
        doHighlightError('message', 2000);
        valid = false;
    }
    if(!valid) {return;}
    doSubmit();
}

function highlightEroneousBox(box){
    document.forms["ContactForm"][box].classList.add("error");
}

function removeHighlight(box){
    document.forms["ContactForm"][box].classList.remove("error");
}

function doHighlightError(box, timer)
{
    highlightEroneousBox(box);
    window.setInterval(removeHighlight, timer, box);
}

function doSubmit(){
    //var proceed = validateContactForm();
    //if(!proceed) return;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            document.forms["ContactForm"]["email"].value = "";

            document.forms["ContactForm"]["message"].value = "";
        }
        else if(xmlhttp.status == 422) {
            var errors = JSON.parse(xmlhttp.response).errors;
            for (var error = 0;error < errors.length;error++)
            {
                doHighlightError(errors[error], 2000);
            }
        }
        else if (xmlhttp.readyState == 4) {
            alert("Unforseen error. Sozzlez.");
        }
    };

    var emailBox = document.forms["ContactForm"]["email"].value;

    var messageBox = document.forms["ContactForm"]["message"].value;
    xmlhttp.open("POST","http://localhost:3000/api/submit?email="+emailBox+"&message="+messageBox,true);
    xmlhttp.send();
}