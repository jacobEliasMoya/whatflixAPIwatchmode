let changeMaintitle = {
    backgroundColors : ['rgba(11, 185, 156, 1)','rgba(165, 40, 165, 1)'],
    mainText : document.querySelector('.mainrow .user_input_section'),
    
    changeTextColor(text){
        text.style.backgroundColor = `${this.backgroundColors[Math.floor(Math.random()*this.backgroundColors.length)]}`;
    }  
}

window.addEventListener('load',()=>{
    setInterval(()=>{
        changeMaintitle.changeTextColor(changeMaintitle.mainText);
    },1000)
})