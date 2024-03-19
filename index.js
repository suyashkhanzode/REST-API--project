function handleFormSubmit(event){
    event.preventDefault();
     const title = document.getElementById("title").value
     const url = document.getElementById("url").value
     document.getElementById("title").value = ""
     document.getElementById("url").value = ""
      axios.post("https://crudcrud.com/api/cf9ba5d4a37b4c289194e8220f3f93c0/bookmark",{
        title : title,
        url : url
     })
     .then((res) =>{
       handleOnLoad();
     })
     .catch((err)=>{
        console.log(err);
     })
}
function handleOnLoad(){
    axios.get("https://crudcrud.com/api/cf9ba5d4a37b4c289194e8220f3f93c0/bookmark")
    .then((res) =>{
        const siteList = document.querySelector("ul");
            siteList.innerHTML = ""; 
            res.data.forEach((item) => {
                displayList(item, siteList);
            });
    })
    .catch((err) =>{
        console.log(err)
    })

    function displayList(list,siteList){
        const listItem = document.createElement("li");
        listItem.appendChild( document.createTextNode(`${list.title} >`))
        const link = document.createElement("a")
        link.href = list.url;
        link.textContent = list.url;
        listItem.appendChild(link)

        const deleteBtn = document.createElement("button");
        deleteBtn.appendChild(document.createTextNode("Delete"));
        listItem.appendChild(deleteBtn);
        deleteBtn.addEventListener("click",()=>{
               deleteSite(list._id)
        })
        const editBtn = document.createElement("button");
        editBtn.appendChild(document.createTextNode("Edit"));
        listItem.appendChild(editBtn);
        editBtn.addEventListener("click",()=>{
             editSite(list);
        })

        
        siteList.appendChild(listItem);
    }
}

function deleteSite(id){
    axios.delete(`https://crudcrud.com/api/cf9ba5d4a37b4c289194e8220f3f93c0/bookmark/${id}`)
    .then(() =>{
       handleOnLoad();
    })
    .catch((err)=>{
        console.log(err)
    })
}

function editSite(list){
     document.getElementById("title").value = list.title
     document.getElementById("url").value = list.url;
    const updatetitle = document.getElementById("title").value
    const updateurl = document.getElementById("url").value 
    const id = list._id;
    document.getElementById("title").value = ""
     document.getElementById("url").value = ""
    axios.put(`https://crudcrud.com/api/cf9ba5d4a37b4c289194e8220f3f93c0/bookmark/${id}`,{
        title : updatetitle,
        url : updateurl
    })
    .then((res)=>{
        handleOnLoad();
    })
    .catch((err)=>{
        console.log(err)
    })
}