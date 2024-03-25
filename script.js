const carrossel = document.querySelector(".carrossel"),
firstImg = carrossel.querySelectorAll("img")[0], 
arrowIcons = document.querySelectorAll(".wrapper i");


let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    let scrollWidth = carrossel.scrollWidth - carrossel.clientWidth;
    arrowIcons[0].style.display = carrossel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carrossel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14;
        carrossel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 30); 
    });
});

const autoSlide = () => {
    if (carrossel.scrollLeft == (carrossel.scrollWidth - carrossel.clientWidth)) return;
    positionDiff = Math.abs(positionDiff); 
    let firstImgWidth = firstImg.clientWidth + 14;
    let valDifference = firstImgWidth - positionDiff;

    if(carrossel.scrollLeft > prevScrolLeft){
        return carrossel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff; 
    } 
    carrossel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff; 
}

const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrolLeft = carrossel.scrollLeft;
}

const dragging= (e) => {
    if(!isDragStart) return; 
    e.preventDefault(); 
    isDragging = true;
    carrossel.classList.add("dragging")
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carrossel.scrollLeft = prevScrolLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carrossel.classList.remove("dragging");
    
    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

carrossel.addEventListener("mousedown", dragStart);
carrossel.addEventListener("touchstart", dragStart);

carrossel.addEventListener("mousemove", dragging);
carrossel.addEventListener("touchmove", dragging);

carrossel.addEventListener("mouseup", dragStop); 
carrossel.addEventListener("mouseleave", dragStop); 
carrossel.addEventListener("touchend", dragStop); 


