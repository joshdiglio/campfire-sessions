document.addEventListener("DOMContentLoaded", function() {
    function sortAlbums() {
      // Get the container where album items are located
      const container = document.querySelector('.past-album-items');
      // Get all the album items
      const items = Array.from(container.querySelectorAll('.past-album-item'));
      
      // Sort the items based on the previous score
      items.sort((a, b) => {
        const scoreA = parseInt(a.querySelector('.previous-score').textContent, 10);
        const scoreB = parseInt(b.querySelector('.previous-score').textContent, 10);
        return scoreB - scoreA; // Sort in descending order
      });
      
      // Clear the container
      container.innerHTML = '';
      
      // Append the sorted items back to the container
      items.forEach(item => container.appendChild(item));
      
      return items; // Return the sorted items for further use
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
  
        // Extract artist and album from the title
        const [artist, album] = title.split(' - ');
  
        // Update the King of the Hill container
        kothImage.src = image;
        kothTitle.innerHTML = `Artist & Album:<br> ${artist} - ${album}`;
        kothScore.innerHTML = `Score (Out of 50):<br> ${score}`;
        
        // Remove the highest score item from the past albums list
        highestScoreItem.remove();
      } else {
        // Fallback content in case no items are found
        kothImage.src = "default-image.jpg";
        kothTitle.textContent = "Artist - Album";
        kothScore.textContent = "Score (Out of 50): 0";
      }
    }
  
    // Call the functions to sort albums and update King of the Hill
    const items = sortAlbums();
    updateKingOfTheHill(items);
  
    // Optional: MutationObserver to watch for changes in the container
    const observer = new MutationObserver(() => {
      const updatedItems = Array.from(document.querySelectorAll('.past-album-item'));
      updateKingOfTheHill(updatedItems);
    });
    observer.observe(document.querySelector('.past-album-items'), { childList: true });
  });
  
  
  // Get the current year
const currentYear = new Date().getFullYear();
// Find the span with the ID 'copyright-year' and set its text to the current year
document.getElementById('copyright-year').textContent = currentYear;
