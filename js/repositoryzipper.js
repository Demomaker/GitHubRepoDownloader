var repos = [];

function addRepo() 
{
    var form = getForm();
    if(form != false) 
    {
        var repository = form.elements[0].value;
        repos.push(getZipDownloadLink(repository));
    }
    else 
    {
        console.log("Invalid Form");
    }
    form.elements[0].value = "";
}

function zipRepos() 
{
    download(repos);
}

function getForm() 
{
    var form = false;
    form = document.getElementById("zipForm");
    return form;
}

function getZipDownloadLink(repository) 
{
    return repository + "/archive/master.zip";
}

function downloadAll() 
{
    var link = document.createElement('a');

    link.style.display = 'none';

    document.body.appendChild(link);
    
    link.setAttribute('download', repos[i]);

    for(var i = 0; i < repos.length; i++) 
    {
        link.setAttribute('href', repos[i]);
        link.click();
    }

    document.body.removeChild(link);
}

function download(urls) {
    urls.forEach(url => {
      let iframe = document.createElement('iframe');
      iframe.style.visibility = 'collapse';
      document.body.append(iframe);

      console.log(url);
      iframe.contentDocument.write(
        `<form action="${url.replace(/\"/g, '"')}" method="GET"></form>`
      );
      iframe.contentDocument.forms[0].submit();

      setTimeout(() => iframe.remove(), 2000);
    });
  }