let myLeads = [];
const inputEl = document.querySelector('#input-el');
const ulEl = document.querySelector('#ul-el');
const inputBtn = document.querySelector('#input-btn');
const deleteBtn = document.querySelector('#delete-btn');
// console.log(inputEl);

// localStorage.setItem('myLeads', 'www.examplelead.com');
// console.log(localStorage.getItem('myLeads'));
// localStorage.clear();

//  let myLeads = '['www.awesomelead.com', 'www.epiclead.com', 'www.greatlead.com']'; 
//  const array = JSON.parse(myLeads);
//    array.push('www.newlead.com');
//    localStorage.setItem("array", JSON.stringify(array));
//    console.log(typeof array);


const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn = document.querySelector('#tab-btn');

tabBtn.addEventListener('click', function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    });
     
});
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}

deleteBtn.addEventListener('dblclick', function(){
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});


inputBtn.addEventListener('click', function(){
    // console.log("Button Clicked");
    let text=inputEl.value;
    myLeads.push(text);
    inputEl.value=" ";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
    
    
});

function render(leads){
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems+= 
        `<li>
        <a href="${leads[i]}" target='_blank'>${leads[i]}</a>
        </li>`;
      
        // console.log(listItems);
        
    }
    ulEl.innerHTML=listItems;
}



