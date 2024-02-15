const showRules = () => {
    const blur = document.getElementById('blur');
    const body = document.body;
    
    if (blur.style.width === '' || blur.style.width === '0px' || blur.style.width === '0') {
        blur.style.width = '100vw';
        blur.style.height = '100vh';
        blur.style.padding = '10%';

        body.style.overflow = 'hidden';

        blur.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {    
        blur.style.width = '0px';
        blur.style.height = '0px';
        blur.style.padding = '';

        body.style.overflow = 'auto';
    }
}

fetch('/reviews')
  .then(response => response.json())
  .then(data => {
    const reviewSection = document.getElementById('review-section');
    reviewSection.innerHTML = '';
    data.forEach(review => {
      reviewSection.innerHTML += `
        <div class="review">
          <p><strong>${review.name}</strong> (${review.date}) - ${review.rating} stars</p>
          <p>${review.comment}</p>
        </div>
      `;
    });
  })
  .catch(error => {
    console.error('Error fetching reviews:', error);
    document.getElementById('review-section').innerHTML = 'Error loading reviews.';
  });