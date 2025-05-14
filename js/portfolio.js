document.addEventListener('DOMContentLoaded', function() {
    const viewMoreBtn = document.getElementById('view-more-btn');
    const hiddenItems = document.querySelectorAll('.hidden-item');
    let isExpanded = false;

    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', function() {
            if (!isExpanded) {
                // Show hidden items with a staggered animation
                hiddenItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.display = 'block';
                        // Trigger AOS animation
                        if (typeof AOS !== 'undefined') {
                            AOS.refresh();
                        }
                    }, index * 100);
                });
                viewMoreBtn.textContent = 'Show Less';
                isExpanded = true;
            } else {
                // Hide items
                hiddenItems.forEach(item => {
                    item.style.display = 'none';
                });
                viewMoreBtn.textContent = 'View More Projects';
                isExpanded = false;
                // Scroll to portfolio section if it's out of view
                const portfolioSection = document.getElementById('portfolio');
                portfolioSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}); 