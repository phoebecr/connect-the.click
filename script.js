const dotContainer = document.querySelector("#dotContainer");

const dots = [
   { id: 25, x: 27, y: 40 },
  { id: 1, x: 26, y: 30 },
 { id: 2, x: 27, y: 22 },
      { id: 3, x: 29.5, y: 14 },
      { id: 4, x: 33, y: 9.5 },
      { id: 5, x: 37, y: 8 },
      { id: 6, x: 39, y: 12 },
      { id: 7, x: 42, y: 14 },
      { id: 8, x: 41.5, y: 18 },
      { id: 9, x: 42.5, y: 22 },
      { id: 10, x: 42.5, y: 30 },
      { id: 11, x: 42, y: 42 },
      { id: 12, x: 41.5, y: 54 },
      { id: 13, x: 40, y: 61 },
      { id: 14, x: 37, y: 59 },
      { id: 15, x: 37, y: 51 },
      { id: 16, x: 38, y: 38 },
      { id: 17, x: 38, y: 30 },
      { id: 18, x: 37, y: 43 },
      { id: 19, x: 36, y: 54 },
      { id: 20, x: 34, y: 58 },
      { id: 21, x: 32, y: 51 },
      { id: 22, x: 30, y: 52 },
      { id: 23, x: 29, y: 45 },
      { id: 24, x: 29, y: 37 }, 
  // Add more dots as needed
];

let clickedDots = 0;
let expectedClick = 1;

const imageUrls = [
  "https://cdn.glitch.global/581f724c-25dc-4bab-aa5a-c3d40c1f5955/72smooth.png?v=1707484834010"
  // Add more image URLs as needed
];

const completionText = document.createElement("div");
completionText.innerText = "Du klarade det! Klicka vartsomhelst på skärmen.";
completionText.style.display = "none";
completionText.style.position = "fixed";
completionText.style.zIndex = "0";
completionText.style.fontSize = "44px";
completionText.style.color = "blue";
completionText.style.fontFamily = "altesse-std-24pt, sans-serif";
completionText.style.textShadow = "2px 2px 15px blue"; // Adjust the values as needed

completionText.style.top = "90%"; // Adjust the value as needed


document.body.appendChild(completionText);

const backgroundMusic = document.getElementById("backgroundMusic");

// Set the position of the dots container to relative
dotContainer.style.position = "fixed";
dotContainer.style.zIndex = "5";

dots.forEach((dot) => {
  let dotElement = document.createElement("div");
  let x = dot.x;
  let y = dot.y;
  dotElement.classList.add("dot");
  dotElement.style.left = `${x}vw`;
  dotElement.style.top = `${y}vh`;
  dotElement.id = Number(dot.id);
  dotElement.innerText = dot.id;
  dotContainer.appendChild(dotElement);

  dotElement.addEventListener("click", () => {
    console.log(dotElement, clickedDots, expectedClick);
    if (!dotElement.classList.contains("clicked") && Number(dotElement.id) === expectedClick) {
      dotElement.classList.add("clicked");
      clickedDots++;

      if (clickedDots === dots.length) {
        document.body.classList.add("completed");
        enableImagePlacement();
        completionText.style.display = "block"; // Show the completion text
      } else {
        expectedClick++;
      }

      if (clickedDots === dots.length) {
        // Start playing the background music immediately
        backgroundMusic.play();
      }
    }
  });
});



function enableImagePlacement() {
    let isFirstClick = true;

    // Get the audio elements
    const clickSound = document.getElementById("clickSound");

    document.addEventListener("click", function (event) {
        // Check if any dots have been clicked
        if (clickedDots > 0) {
            // Check if it's the first click
            if (isFirstClick) {
                isFirstClick = false; // Set the flag to false after the first click
                return; // Ignore the first click
            }

            // Play the click sound
            clickSound.play();

            setTimeout(() => {
                const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
                const image = document.createElement("img");
                image.src = randomImageUrl;
                image.style.position = "fixed";
                image.style.zIndex = "0"; // Set a lower z-index to position it behind the dots
                const posX = event.clientX - image.width / 2;
                const posY = event.clientY - image.height / 2;
                image.style.left = posX + "px";
                image.style.top = posY + "px";
                document.body.appendChild(image);
            }, 0); // 0 milliseconds delay

            // Check if all dots have been clicked
            if (clickedDots === dots.length) {
                // Start playing the background music immediately
                backgroundMusic.play();
            }
        }
    });
}
