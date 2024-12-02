document.addEventListener("DOMContentLoaded", function() {
    function sortAlbums() {

      const container = document.querySelector('.past-album-items');

      const items = Array.from(container.querySelectorAll('.past-album-item'));
      
      items.sort((a, b) => {
        const scoreA = parseInt(a.querySelector('.previous-score').textContent, 10);
        const scoreB = parseInt(b.querySelector('.previous-score').textContent, 10);
        return scoreB - scoreA; 
      });
      
      container.innerHTML = '';
      
      items.forEach(item => container.appendChild(item));
      
      return items; 
    }
  
    function updateKingOfTheHill(items) {
      const kothImage = document.querySelector('.king-of-the-hill-container .king-of-the-hill-cover');
      const kothTitle = document.querySelector('.king-of-the-hill-container .king-of-the-hill-subtitle');
      const kothScore = document.querySelector('.king-of-the-hill-container .king-of-the-hill-score');
  
      if (items.length > 0) {
        const highestScoreItem = items[0];
        const image = highestScoreItem.querySelector('.previous-image').src;
        const title = highestScoreItem.querySelector('.previous-title').textContent;
        const score = highestScoreItem.querySelector('.previous-score').textContent;

        const [artist, album] = title.split(' - ');
  
        kothImage.src = image;
        kothTitle.innerHTML = `Artist & Album:<br> ${artist} - ${album}`;
        kothScore.innerHTML = `Score (Out of 50):<br> ${score}`;

        highestScoreItem.remove();
      } else {

        kothImage.src = "default-image.jpg";
        kothTitle.textContent = "Artist - Album";
        kothScore.textContent = "Score (Out of 50): 0";
      }
    }
  
    const items = sortAlbums();
    updateKingOfTheHill(items);
  
    const observer = new MutationObserver(() => {
      const updatedItems = Array.from(document.querySelectorAll('.past-album-item'));
      updateKingOfTheHill(updatedItems);
    });
    observer.observe(document.querySelector('.past-album-items'), { childList: true });
  });
  
  document.getElementById('menubtn').addEventListener('click', function() {
    const dropdownContent = document.querySelector('.dropdown-content');
    
    if (dropdownContent.style.display === 'block') {
      dropdownContent.style.display = 'none';
    } else {
      dropdownContent.style.display = 'block';
    }
  });
  

  window.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');
  
    if (!dropdown.contains(event.target)) {
      dropdownContent.style.display = 'none';
    }
  });
  

const currentYear = new Date().getFullYear();

document.getElementById('copyright-year').textContent = currentYear;
