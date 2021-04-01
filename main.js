let mainSearch = {
    // my api for key watchmode.com
    myapikey : 'JKoDMVVNwa62kFsPYYqvJe2WvvwG03XnZQGoQfrw',
    // numCount used to append styles
    checkedboxes : 0,
    // submit button for main search
    submitButton : document.querySelector('.button'),
    // saving select buttons
    selectButtons : document.querySelectorAll('.selecttype h2'),
    // saving select buttons for people
    selectButton1 : document.querySelector('.people'),
    // saving select buttons for titles 
    selectButton2 : document.querySelector('.films'),
    //varioable to hold bolean value
    buttonselected : false,
    // value to seach, undefined until click event
    submitButtonva : undefined,
    // container to store the search results
    divContainer : document.querySelector('.results'), 
    // arrays to store search Data for title
    titleData:undefined,
    // arrays to store search Data for people
    peopleData:undefined,
    //url storage headshot headshot
    headshotsource : undefined,
    //url storage headshot imdb ID
    imdblink : undefined,
    //storing main works (id's)
    featuredArray : undefined, 
    // storings featured titles
    featuredtitles : undefined, 
    //method to display error when no search criteria is selected
    selectCriteriaErr(){
        mainSearch.divContainer.innerHTML='<h1 style="font-size:2rem;font-weight:bold;text-shadow:none"> Please select a search criteria</h1>'
        mainSearch.selectButtons.forEach(but=>{
            but.style.color='red';
            setTimeout(()=>{
                but.style.color='white';
            },2000)
        })
    },
    //method to choose type of search criteria
    showSelected(button){
        // checking to see if below element child has specific class
        if(button.children[0].classList.contains('checked')){
            // if element has the class then, remove the class to revert stylings 
            button.children[0].classList.remove('checked');
            // reset the checkedboxes num back toi default/0 value
            this.checkedboxes=0;
        } else{
            // else to do the follwing, add in class if no no other boxes have been checked/ clicked
            if(this.checkedboxes===0){
                // incremement num of checked boxes
                this.checkedboxes++;
                // adding classlist to check mark child element
                button.children[0].classList.add('checked');
            }
        }
    },
    //noreults method
    noSearchResults(ar1,ar2){

        if(ar1.length < 1 && ar2.length < 1){
            this.divContainer.innerHTML='<h1 style="font-size:2rem;font-weight:bold;text-shadow:none"> No Results! Try Again</h1>'
        } else if (ar1.length < 1 || ar2.length < 1){
        }

    },
    // blank search results
    blankSearchError(){
        if(mainSearch.submitButtonva.value===''){
            this.divContainer.innerHTML='<h1 style="font-size:2rem;font-weight:bold;text-shadow:none"> Please enter some text in the input field</h1>'
        }
    },
    // method to clear search results
    clearDisplayedReuslts(elm){
        // removing any innerhtml from the element
        elm.innerHTML='';
    },
    // method to clears inner search value
    clearSearchValue(){
        //sets the value to null, which clears out the typed input text 
        mainSearch.submitButtonva.value=null;
    },
    // method to being first api call to search for information
    initiateSearch(searchval){
        // setting url variable to local object scope, will use concatenation to add in necessary values
        let url = `https://api.watchmode.com/v1/search/?apiKey=${this.myapikey}&search_field=name&search_value=${searchval}`;

        //fethes the url with the get method
        fetch(url, { method: 'Get' })
            .then((res) => res.json())
            .then((json) => {
                // saving people rusults/title results to individual variables to store objects
                this.peopleData=json.people_results;
                this.titleData=json.title_results;
                // for each person, obtain the headshot url 
                this.peopleData.forEach(p=>{
                    if(p.imdb_id!==''){
                        this.obtainSearchInfo(p);
                    }
                })
                //running function to display no results message when no reults are returned.
                this.noSearchResults(this.titleData,this.peopleData);
            });
    },
    //method to objtain and append the headshots
    obtainSearchInfo(pers){
        let url = `https://api.watchmode.com/v1/person/${pers.id}?apiKey=${this.myapikey}`;

        fetch(url, { method: 'Get' })
            .then((res) => res.json())
            .then((json) => {
                if(json.imdb_id!==null){
                    // saving headshot url
                    this.headshotsource = json.headshot_url; 
                    //saving info for IMDB link 
                    this.imdblink = json.imdb_id;
                    // saving featured works 
                    this.featuredArray = json.known_for;
                    // running function to create divs based off information saved above
                    this.creatediv(this.divContainer);
                    // if statement to only log in non null data
                    if(this.featuredArray!== null){
                        this.featuredArray.forEach(item=>{
                            // using sustring method to remove first charater and return new string
                            this.displayFeatured(item.substring(1));
                        })
                    }
                }
            });
    },
    // method to dynamically add in divs
    creatediv(container){
        // craeting elements to be appeneded to container
        let newD = document.createElement("DIV");
        let newDName = document.createElement("IMG");
        let newDinfo = document.createElement("DIV");
        let featuredWorks = document.createElement("DIV");
        let checkfeaturedWorkstxt = document.createElement("H2");
 
    
        // adding classes for proper styling
        newD.classList.add("res");
        newDName.classList.add("name");
        newDinfo.classList.add("information");
        featuredWorks.classList.add("feature");
        featuredWorks.classList.add(`feature${this.numnum}`);
  


    
        //appending children to respective parent
        container.appendChild(newD);
        newD.appendChild(newDName);
        newD.appendChild(newDinfo);
        // chaging the src of the image dynamically
        newDName.src=this.headshotsource;
        newDName.style='width:20%';
        // adding in the imdb link dynamically
        newDinfo.innerHTML=`<a href='https://www.imdb.com/name/${this.imdblink}/' target='_blank'>View IMDB</a>`;
        // altering inner text of element added in
        checkfeaturedWorkstxt.innerText=`Notable works`;
        // appending in any additional works to check out if necessary
        newDinfo.appendChild(checkfeaturedWorkstxt);
        newDinfo.appendChild(featuredWorks);
        

    },
    // method that adds in the featured content to featured works area in the program
    displayFeatured(featuredID){
        let url =`https://api.watchmode.com/v1/title/${featuredID}/details/?apiKey=${this.myapikey}`;

        fetch(url, { method: 'Get' })
            .then((res) => res.json())
            .then((json) => {
                this.featuredtitles = json.title;
                let x = document.querySelectorAll('.feature');
                let newlin = document.createElement("A");
                newlin.innerText=this.featuredtitles;
                if(json.imdb_id!==''){
                    newlin.target=`_blank`;
                    newlin.href=`https://www.imdb.com/title/${json.imdb_id}/`;

                }

                x.forEach(unit=>{
                    // need to append information to correct feautured section
                    // add class to get this done
                    if(unit.classList.contains(`feature${this.numnum}`)){
                        unit.appendChild(newlin);
                    }

                })
            });
    } 
}

mainSearch.selectButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        mainSearch.showSelected(button);
    })
})

mainSearch.submitButton.addEventListener('click',()=>{
    mainSearch.submitButtonva = document.querySelector('.user_input_section');


    if(mainSearch.submitButtonva.value !== '' && mainSearch.checkedboxes>0){
        mainSearch.clearDisplayedReuslts(mainSearch.divContainer);
        // mainSearch.clearDisplayedReuslts(mainSearch.divContainer);
        mainSearch.initiateSearch(mainSearch.submitButtonva.value);
        // loggin for dev purposes
        mainSearch.clearSearchValue();
    } else if(mainSearch.submitButtonva.value !== '' && mainSearch.checkedboxes==0){
        mainSearch.selectCriteriaErr();
    } else {
        mainSearch.blankSearchError();
    }
})

console.log("Streaming data powered by Watchmode.com");