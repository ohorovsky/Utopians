

document.addEventListener("DOMContentLoaded", function() {
    
    document.body.classList.add('show-body');
     const navbarLinks = document.querySelectorAll('.fade-out-link');
     navbarLinks.forEach(link => link.addEventListener('click', function(e) {
         e.preventDefault();
         document.body.classList.remove('show-body');
         let newRef = this.href;
         setTimeout(() => {
             window.location = newRef;
         }, 250);
    }));
    
    //**********************************************************
    //****************Navbar************************************
    //**********************************************************
    
    const navbar = document.querySelector('nav');
    const mobileNavBtn = document.querySelector('.nav-mobile-btn');
    if(!mobileNavBtn){
        return null;
    }else{
      mobileNavBtn.addEventListener('click', () => {
        navbar.classList.toggle('nav-expand')
        })
        window.addEventListener('scroll', (e) => {
          window.scrollY > 0 ? navbar.classList.add('nav-invert') : navbar.classList.remove('nav-invert')
        }) 
    }
    
    
    //**********************************************************
    //****************Follow along Search***********************
    //**********************************************************
    
    const searchLinkBtn = document.querySelectorAll('.search-link-btn');
    const signInBtn = document.querySelectorAll('.sign-btn');
    const searchSection = document.querySelector('.search');
    searchLinkBtn.forEach(btn => btn.addEventListener('click', () => {
        document.body.classList.toggle('overflow-body');
        searchSection.classList.toggle('show');
        mobileNavBtn.classList.toggle('hide-menu-btn');
        signInBtn.forEach(btn => btn.classList.toggle('hide-menu-btn'));
        navbar.classList.contains('nav-expand') ? navbar.classList.remove('nav-expand') : null;
    }))
    
    const data = require('../test_data.json');
    const spanInput = document.querySelector('.inject-input');
    
    function findMatch(wordToMatch, data) {
        // if(!wordToMatch) return;
        if(wordToMatch == '') return;
        return data.filter(data => {
            const regex = new RegExp(wordToMatch, 'gi');
            return data.companyName.match(regex) || data.description.match(regex);
        })
    }
    
    function displayMatches() {
        
        const matchArray = findMatch(this.value, data);
        let html = '';
        if(!this.value){
            html = '';
            spanInput.innerHTML = '';
        }else if(matchArray.length == 0){
            html = '';
            suggestions.innerHTML = '';
            spanInput.innerHTML = 'Sorry, ne results found!';
        }
        else{
           html = matchArray.map(data => {
                const regex = new RegExp(this.value, 'gi');
                const company = data.companyName.replace(regex, `<span class="hl">${this.value}</span>`);
                let desc = data.description.replace(regex, `<span class="hl">${this.value}</span>`);
                const image = data.avatar;
                return `
                    <div class="result">
                        <div class="result-img" style="background-image: url(${image});"></div>
                        <div class="result-text">
                          <p class="text-body">${desc}</p>
                          <p class="text-author">${company}</p>
                        </div>
                    </div>
                `;
            }); 
            spanInput.innerHTML = `Displaying results tagged with "${inputSearch.value}"`;
        }
        
        
        inputSearch.value == '' ? suggestions.innerHTML = '' : null;
        if(html.length > 3){
            suggestions.innerHTML = html[0] + html[1] + html[2];
            const restArr = [...html];
            restArr.splice(0,3);
            let moreResults = document.createElement('button');
            moreResults.className = 'more-results-btn';
            moreResults.innerText = `More Results (${restArr.length})`;
            suggestions.appendChild(moreResults);
            moreResults.addEventListener("click", function(){
                suggestions.removeChild(moreResults);
                suggestions.innerHTML += restArr.join('');
                
                setTimeout(()=>{
                    results = document.querySelectorAll('.result');
                    results.forEach(result => result.classList.add('show'));
                },250)
                
            })
            let results = document.querySelectorAll('.result');
            
            setTimeout(()=>{
                results.forEach(result => result.classList.add('show'));
            },250)
            
            
        }
        
        
    }
    
    const inputSearch = document.querySelector('.search-input');
    const suggestions = document.querySelector('.results-container');
    
    //inputSearch.addEventListener("change", displayMatches);
    inputSearch.addEventListener("keyup", displayMatches);
    
    
});