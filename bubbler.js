let bubbleanimation = {
    // saving container to append childs to
    bubblecontainer : document.querySelector('body'),
    // array of colors for the bubbles background color
    backgroundColors : ['rgba(0, 0, 255, 0.274)','rgba(11, 185, 156, 0.274)','rgba(165, 40, 165, 0.274)','rgba(165, 152, 40, 0.274)'],

    // method to create a bubble, takes 1 parameter to append bubble to 
    createBubble(parent){
        // local var bubble being saved as a new DIV element
        let bub1 = document.createElement("DIV");
        // adding class so new div can take proper styling
        bub1.classList.add("circle");
        //appending bubble to parent element
        parent.appendChild(bub1);

        // timout to make the bubble grow & pop to random location
        setTimeout(() => {
            // giving random left location using string concatenation
            bub1.style.left = `${Math.floor(Math.random()*100)}%`;
            // giving random right location using string concatenation
            bub1.style.top = `${Math.floor(Math.random()*100)}%`;
            // setting dimenstions of circle
            bub1.style.width='15rem';
            bub1.style.height='15rem';
            bub1.style.borderRadius='1rem';

            // assigning a background color to the div
            bub1.style.background = `${this.backgroundColors[Math.floor(Math.random()*this.backgroundColors.length)]}`;
        }, 1);

        // another timeout to clear the styles
        setTimeout(() => {
            bub1.style.width='0rem';
            bub1.style.height='0rem';
            bub1.style.borderRadius='50%';
        }, 3000);

        // another timeout to fully delete the node from the document 
        setTimeout(() => {
            this.bubblecontainer.removeChild(bub1);
        }, 7000);

    }
}


window.addEventListener('load',()=>{
    setInterval(() => {
        bubbleanimation.createBubble(bubbleanimation.bubblecontainer);
    }, 750);
})