const showRules = () => {
    const blur = document.getElementById('blur');
    const body = document.body;
    
    if (blur.style.width === '' || blur.style.width === '0px' || blur.style.width === '0') {
        blur.style.width = '100vw';
        blur.style.height = '100vh';

        body.style.overflow = 'hidden';

        blur.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        blur.style.width = '0px';
        blur.style.height = '0px';

        body.style.overflow = 'auto';
    }
    
    console.log('button pressed');
}
