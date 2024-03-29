// this is a partially revealing module pattern - just a variation on what we've already done

const myVM = (() => {
    // get the user buttons and fire off an async DB query with Fetch
    let songButtons = document.querySelectorAll('.u-link'),
        lightbox = document.querySelector('.lightbox');


        function songInfo(songs) { // person is the databaase result
            let targetDiv = document.querySelector('.lb-content'),
                targetImg = lightbox.querySelector('img');

                let songContent = `
                <h2>${songs.Song}</h2>
                <h3>${songs.Artist}</h3>
                <h5>Album: ${songs.Album}</h5>
                <h5>Genre: ${songs.Genre}</h5>
                <p>${songs.About}</p>
                `

            console.log(songContent);

            targetDiv.innerHTML = songContent;
            targetImg.src = songs.imgsrc;

            lightbox.classList.add('show-lb');


        }

        function getSongData(event) {
            event.preventDefault(); //kill default tag in behaviour (dont navigate anywhere)
           // debugger;
            let imgSrc = this.previousElementSibling.getAttribute('src');
            let url = `/${this.getAttribute('href')}`; // /1

            fetch(url) // go get data
                .then(res => res.json()) // parse the json into a plain object
                .then(data => {
                    console.log("my database result is:", data)

                    data[0].imgsrc = imgSrc;

                    songInfo(data[0]);
                })
                .catch((err) => {
                    console.log(err)
                })}

        songButtons.forEach(button => button.addEventListener('click', getSongData));

        lightbox.querySelector('.close').addEventListener('click', function() {
            lightbox.classList.remove('show-lb');

        });

})();