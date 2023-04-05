function showPage(pageId) {
    // Hide all pages
    document.getElementById('page1').style.display = 'none';
    document.getElementById('page2').style.display = 'none';
    document.getElementById('page3').style.display = 'none';
    
    // Show the selected page
    document.getElementById(pageId).style.display = 'block';
    
    // Set the active link

    var navbarLinks = document.getElementsByClassName('navbar')[0].getElementsByTagName('a');
    for (var i = 0; i < navbarLinks.length; i++) {
        if (navbarLinks[i].getAttribute('href') == '#' + pageId) {
            navbarLinks[i].classList.add('active');
        } else {
            navbarLinks[i].classList.remove('active');
        }
    }
}

showPage("page1");