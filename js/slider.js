const slider = document.getElementById('slider'),
    sliderItems = document.getElementById('slides'),
    indicatorsField = document.getElementById('indicators');
    prev = document.getElementById('prev'),
    next = document.getElementById('next');



function slide(items, prev, next) {
  let posInitial,
      slides = items.getElementsByClassName('slide'),
      slidesLength = slides.length,
      slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
      firstSlide = slides[0],
      lastSlide = slides[slidesLength - 1],
      cloneFirst = firstSlide.cloneNode(true),
      cloneLast = lastSlide.cloneNode(true),
      index = 0,
      allowShift = true;
  

  items.appendChild(cloneFirst);
  items.insertBefore(cloneLast, firstSlide);


  
  prev.addEventListener('click', function () { shiftSlide(-8) });
  next.addEventListener('click', function () { shiftSlide(8) });
  
  items.addEventListener('transitionend', checkIndex);


  function clearIndicators() {
    let activeIndicators = Array.from(document.getElementsByClassName('active'));
          activeIndicators.forEach(element => {
            element.classList.remove('active');
            
          });
  }

  
    for (i = 1; i < slidesLength+1; i++) {
        let btnElem = document.createElement('button');
        btnElem.classList.add('indicator');
        btnElem.setAttribute('index', i);
        btnElem.addEventListener('click', function() {
          allowShift = true;
            console.log('Первое нажатие')
            let btnIndex = btnElem.getAttribute('index');
            console.log(btnIndex);
            shiftSlide(0, btnIndex)
           
           
        })
        indicatorsField.appendChild(btnElem);
        

    }

  

  
  function shiftSlide(dir, btnIndex) {
    console.log("Функция запущена" + dir + btnIndex);
    items.classList.add('shifting');
   
    clearIndicators();
    if (allowShift) {
       posInitial = items.offsetLeft;

      if (dir == 8) {
        items.style.left =  (posInitial - slideSize) + "px";
       
        index++;      
        
      } else if (dir == -8) {
        items.style.left = (posInitial + slideSize) + "px";
        index--;     
        
        
      }
      else if (dir == 0) {
        items.style.left = -400 * btnIndex + "px";
        index = btnIndex - 1;
        let indicators = Array.from(document.getElementsByClassName('indicator'));
    indicators.forEach((el) => {
      if (el.getAttribute('index') == btnIndex) {
        el.classList.add('active');
      }
    })
        allowShift = true;
      }
    };

    
    allowShift = false;
  }
    
  function checkIndex (){
    items.classList.remove('shifting');

    if (index == -1) {
      items.style.left = -(slidesLength * slideSize) + "px";
      index = slidesLength - 1;
    }

    if (index == slidesLength) {
      items.style.left = -(1 * slideSize) + "px";
      index = 0;
    }
    
    allowShift = true;
  }
}

slide( sliderItems, prev, next);

