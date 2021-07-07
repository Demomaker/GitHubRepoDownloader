var repos = [];
var repoParameterName = "repo";

function addRepo() 
{
    var repository = document.getElementById("repository").value;
    addSpecificRepo(repository);
    document.getElementById("repository").value = "";
    updateURLWithCurrentRepos();
}

function addSpecificRepo(repository) 
{
    repos.push(repository);
    addRepoToList(repository);
}

function updateURLWithCurrentRepos() 
{
    var repoString = "";
    repos.forEach((item, index) => {
        if(index != 0)
            repoString += "+";
        repoString += item;
    });
    setParameter(repoParameterName, repoString);
}

function setParameter(name, value) {
    var searchParams = new URLSearchParams(window.location.search)
    searchParams.set(name, value);
    var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
    history.pushState(null, '', newRelativePathQuery);
}

function retrieveRepositoriesInURL() {
    var repoString = getParameter(repoParameterName);
    if(repoString == null || repoString == "") return;
    var temp = repoString.split("+");
    console.log(temp);
    temp.forEach((item, index) => {
        addSpecificRepo(item);
    });
}

function getParameter(name) {
    let params = new URLSearchParams(document.location.search.substring(1));
    return params.get(name);
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
    
    link.setAttribute('download', getZipDownloadLink(repos[i]));

    for(var i = 0; i < repos.length; i++) 
    {
        link.setAttribute('href', getZipDownloadLink(repos[i]));
        link.click();
    }

    document.body.removeChild(link);
}

function download(urls) {
    urls.forEach(url => {
      let iframe = document.createElement('iframe');
      iframe.style.visibility = 'collapse';
      document.body.append(iframe);
      url = getZipDownloadLink(url);
      iframe.contentDocument.write(
        `<form action="${url.replace(/\"/g, '"')}" method="GET"></form>`
      );
      iframe.contentDocument.forms[0].submit();

      setTimeout(() => iframe.remove(), 2000);
    });
  }

function addRepoToList(repo) 
{
    var repositoryList = document.getElementById("repositoryList");
    var repositoryDiv = document.createElement("div");
    var repositoryLinker = document.createElement("a");
    var textnode = document.createTextNode(repo);
    var spacenode = document.createTextNode(" ");
    var labelBreak = document.createElement("br");
    var button = document.createElement("button");
    var buttonText = document.createTextNode("Remove");
    
    repositoryDiv.id = "Repo" + repos.indexOf(repo);
    button.id = "Button" + repos.indexOf(repo);
    button.onclick = function() {removeRepoWithButton(button);};
    repositoryLinker.appendChild(textnode);
    repositoryLinker.href = textnode.textContent;
    button.appendChild(buttonText);
    repositoryDiv.appendChild(repositoryLinker);
    repositoryDiv.appendChild(spacenode);
    repositoryDiv.appendChild(button);
    if(repos.indexOf(repo) < repos.length - 1)
    {
        repositoryDiv.appendChild(labelBreak);
    }

    repositoryList.appendChild(repositoryDiv);
}

function removeRepoWithButton(button) 
{
    var repoID = parseInt(button.id.replace("Button",""));
    var repo = repos[repoID];
    var repoDivID = "Repo" + repos.indexOf(repo);
    document.getElementById(repoDivID).remove();
    removeItemOnce(repos, repo);
    updateURLWithCurrentRepos();
}

function removeItemOnce(arr, value) { 
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}
